import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Context } from "../types";
import { User } from "../entities/User";
import argon2 from 'argon2'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import validateRegister from "../utils/validateRegister";
import sendEmail from "../utils/sendEmail";
import { v4 } from "uuid";

@InputType()
export class RegisterInput {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    email: string
}

@ObjectType()
class ErrorField {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field( () => [ ErrorField ], { nullable: true } )
    errors?: ErrorField[]

    @Field( () => User, { nullable: true } )
    user?: User
}

const DUPLICATE_CODE = '23505'

@Resolver( User )
export default class UserResolver {

    @FieldResolver( () => String )
    email( @Root()user: User, @Ctx()ctx: Context ) {
        if ( ctx.req.session.userId === user.id ) {
            return user.email
        }
        return ""
    }

    @Mutation( () => UserResponse )
    async changePassword(
        @Ctx() { redis, req }: Context,
        @Arg( 'token' ) token: string,
        @Arg( 'newPassword' ) newPassword: string,
    ): Promise<UserResponse> {
        try {
            if ( newPassword.length < 6 ) {
                return {
                    errors: [
                        {
                            field: 'newPassword',
                            message: 'new password length must be greater than 6'
                        }
                    ]
                }
            }
            const userId = await redis.get( FORGET_PASSWORD_PREFIX + token )
            if ( !userId ) {
                return {
                    errors: [
                        {
                            field: 'token',
                            message: 'token expired'
                        }
                    ]
                }
            }
            const userIdInt = parseInt( userId )
            const user = await User.findOne( userIdInt )
            if ( !user ) {
                return {
                    errors: [ {
                        field: 'token',
                        message: 'user no longer exists'
                    } ]
                }
            }
            await User.update(
                { id: userIdInt },
                { password: await argon2.hash( newPassword ) }
            )
            req.session.userId = user.id
            await redis.del( FORGET_PASSWORD_PREFIX + token )
            return { user }
        } catch ( e ) {
            console.log( '-----CHANGE PW ERROR------', e )
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'an error occurred, try again later'
                    }
                ]
            }
        }
    }

    @Query( () => User, { nullable: true } )
    me( @Ctx() ctx: Context ) {
        const { userId } = ctx.req.session
        return userId ? User.findOne( userId ) : null
    }

    @Mutation( () => UserResponse )
    async register(
        @Arg( 'options' )options: RegisterInput,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        let user
        const { username, password, email } = options
        const errors = validateRegister( options )
        if ( errors ) {
            return { errors }
        }
        const hashedPassword = await argon2.hash( password )
        try {
            const result = await User.create( {
                username,
                password: hashedPassword,
                email
            } ).save()
            user = result
            ctx.req.session.userId = result.id
        } catch ( e ) {
            if ( e.code === DUPLICATE_CODE ) {
                return {
                    errors: [ {
                        field: 'username',
                        message: "username or email already existed"
                    } ]
                }
            }
            return {
                errors: [ {
                    field: 'asd',
                    message: "asd"
                } ]
            }
        }
        return { user }
    }

    @Mutation( () => UserResponse )
    async login(
        @Arg( 'usernameOrEmail' )usernameOrEmail: string,
        @Arg( 'password' )password: string,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        const column = usernameOrEmail.includes( '@' ) ? 'email' : 'username'
        const user = await User.findOne( {
            where: { [column]: usernameOrEmail }
        } )
        if ( !user ) {
            return {
                errors: [ {
                    field: 'usernameOrEmail',
                    message: 'account does not exist!'
                } ],
            }
        }
        const valid = await argon2.verify( user.password, password )
        if ( !valid ) {
            return {
                errors: [ {
                    field: 'password',
                    message: 'incorrect password'
                } ],
            }
        }
        ctx.req.session.userId = user.id
        return {
            user
        }
    }

    @Mutation( () => Boolean )
    logout(
        @Ctx() ctx: Context
    ) {
        return new Promise( resolve => (
            ctx.req.session.destroy(
                ( error: any ) => {
                    console.log( 'LOGOUT RES', error )
                    if ( !error ) {
                        ctx.res.clearCookie( COOKIE_NAME )
                        resolve( true )
                    }
                    resolve( false )
                }
            )
        ) )
    }

    @Mutation( () => Boolean )
    async forgotPassword(
        @Arg( "email" ) email: string,
        @Ctx() ctx: Context
    ) {
        const { redis } = ctx
        const user = await User.findOne( { where: { email } } )
        if ( !user ) {
            return true
        }
        const token = v4()
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 24 * 3 )
        const html = `<a href="http://localhost:3000/change-password/${ token }">reset password</a>`
        const hehe = await sendEmail( email, html )
        console.log( 'HEE', hehe )
        return true
    }
}
