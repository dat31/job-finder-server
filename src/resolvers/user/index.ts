import {
    Arg, Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root, UseMiddleware
} from "type-graphql";
import { Context } from "../../types";
import { User } from "../../entities";
import argon2 from 'argon2'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../../constants";
import { v4 } from "uuid";
import { Service } from "typedi";
import { ErrorField, RegisterInput, UserResponse } from "./user.type";
import { isValidLength } from "../../utils/stringUtils";
import UserService from "./user.service";
import authMiddleware from "../../middlewares/authMiddleware";
import { validateRegister } from "./user.helper";
import sendEmail from "../../api/sendEmail";

const DB_DUPLICATE_ERR_CODE = '23505'
const PASSWORD_LIMIT_LENGTH = 6

@Service<User>()
@Resolver( User )
export default class UserResolver {

    constructor( private readonly userService: UserService ) {
    }

    @FieldResolver( () => String )
    email( @Root() user: User, @Ctx() ctx: Context ) {
        return ( ctx.req.session.userId === user.id ) ? user.email : null
    }

    @Mutation( () => UserResponse )
    async changePassword(
        @Ctx() { redis, req }: Context,
        @Arg( 'token' ) token: string,
        @Arg( 'newPassword' ) newPassword: string,
    ): Promise<UserResponse> {
        if( isValidLength( newPassword, PASSWORD_LIMIT_LENGTH ) ) {
            return this.getError(
                'newPassword',
                'New password length must be greater than 6'
            )
        }
        try {
            const userId = await redis.get( FORGET_PASSWORD_PREFIX + token )
            if( !userId ) {
                return this.getError( 'token', 'Token expired' )
            }
            const userIdInt = parseInt( userId )
            const user = await User.findOne( userIdInt )
            if( !user ) {
                return this.getError( 'token', 'User does not exists' )
            }
            await User.update(
                { id: userIdInt },
                { password: await argon2.hash( newPassword ) }
            )
            req.session.userId = user.id
            await redis.del( FORGET_PASSWORD_PREFIX + token )
            return { user }
        } catch( e ) {
            console.log( '-----CHANGE PW ERROR------', e )
            return this.getError( 'token',
                'An error occurred, try again later'
            )
        }
    }

    @Query( () => User, { nullable: true } )
    me( @Ctx() ctx: Context ) {
        const { userId } = ctx.req.session
        console.log( "OKAY", ctx.req.session )
        if( !userId ) return null
        return User.findOne( userId )
    }

    @Mutation( () => UserResponse )
    async register(
        @Arg( 'options' ) options: RegisterInput,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        let user
        const { username, password, email } = options
        const errors = validateRegister( options )
        if( errors ) {
            return { errors }
        }
        try {
            const result = await User
                .create( { username, password: await argon2.hash( password ), email } )
                .save()
            user = result
            ctx.req.session.userId = result.id
        } catch( e ) {
            if( e.code === DB_DUPLICATE_ERR_CODE ) {
                return this.getError(
                    'username',
                    "username or email already existed"
                )
            }
            return this.getError(
                'form',
                "An error occurred! Try again later"
            )
        }
        return { user }
    }

    @Mutation( () => UserResponse )
    async login(
        @Arg( 'usernameOrEmail' ) usernameOrEmail: string,
        @Arg( 'password' ) password: string,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        const column = usernameOrEmail.includes( '@' ) ? 'email' : 'username'
        const user = await User.findOne( {
            where: { [column]: usernameOrEmail }
        } )
        if( !user ) {
            return this.getError(
                'usernameOrEmail',
                'account does not exist!'
            )
        }
        const valid = await argon2.verify( user.password, password )
        if( !valid ) {
            return this.getError( 'password', 'incorrect password' )
        }
        ctx.req.session.userId = user.id
        ctx.req.session.test1 = "test1"
        ctx.req.session.test2 = "test2"
        return {
            user
        }
    }

    @Mutation( () => Boolean )
    logout( @Ctx() ctx: Context ) {
        return new Promise( ( resolve ) => (
            ctx.req.session.destroy(
                ( error: any ) => {
                    if( !error ) {
                        ctx.res.clearCookie( COOKIE_NAME )
                        resolve( true )
                    }
                    resolve( false )
                }
            )
        ) )
    }

    @Mutation( () => Boolean )
    async forgotPassword( @Arg( "email" ) email: string, @Ctx() ctx: Context ) {
        const { redis } = ctx
        const user = await User.findOne( { where: { email } } )
        if( !user ) {
            return
        }
        const token = v4()
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 24 * 3 )
        const html = `<a href="${ process.env.CORS_ORIGIN }/change-password/${ token }">reset password</a>`
        const hehe = await sendEmail( email, html )
        console.log( 'HEE', hehe )
        return true
    }

    @Mutation( () => Boolean )
    @UseMiddleware( authMiddleware )
    async saveJob(
        @Arg( "jobId" ) jobId: number,
        @Ctx() ctx: Context
    ): Promise<boolean> {
        return this.updateJobIdColumn(
            ctx.req.session.userId,
            jobId,
            "savedJobIds"
        )
    }

    @Mutation( () => Boolean )
    @UseMiddleware( authMiddleware )
    async notInterestedJob(
        @Arg( "jobId" ) jobId: number,
        @Ctx() ctx: Context
    ): Promise<boolean> {
        return this.updateJobIdColumn(
            ctx.req.session.userId,
            jobId,
            "notInterestedJobIds"
        )
    }

    private async updateJobIdColumn(
        userId: number,
        jobId: number,
        jobColumn: keyof Pick<User, "notInterestedJobIds" | "savedJobIds">
    ): Promise<boolean> {
        const user = await this.userService.getById( userId )
        if( !user ) {
            return false
        }
        await this.userService.update( userId, {
            [jobColumn]: [ ...user.savedJobIds, jobId ]
        } )
        return true
    }

    private getError(
        field: ErrorField["field"],
        message: ErrorField["message"]
    ): Pick<UserResponse, "errors"> {
        return {
            errors: [ { field, message } ]
        }
    }
}
