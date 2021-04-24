import {
    Arg,
    Args,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Context } from "../../types";
import { User } from "../../entities";
import { COOKIE_NAME } from "../../constants";
import { Service } from "typedi";
import {
    ChangePasswordReq,
    CurrentUserJobs,
    LoginReq,
    ProfileResponse,
    RegisterInput,
    UserResponse
} from "./user.type";
import UserService from "./user.service";

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
        @Ctx() { req }: Context,
        @Args() changePasswordReq: ChangePasswordReq
    ): Promise<UserResponse> {
        return this.userService.changePassword( changePasswordReq, userId => {
            req.session.userId = userId
        } )
    }

    @Query( () => User, { nullable: true } )
    currentUser( @Ctx() ctx: Context ) {
        return this.userService.getCurrentUser( ctx.req.session.userId )
    }

    @Query( () => ProfileResponse, { nullable: true } )
    async profile( @Ctx() ctx: Context ): Promise<ProfileResponse | undefined> {
        return this.userService.getProfile( ctx.req.session.userId )
    }

    @Mutation( () => UserResponse )
    async register(
        @Arg( 'options' ) options: RegisterInput,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        return this.userService.register( options, userId => {
            ctx.req.session.userId = userId
        } )
    }

    @Mutation( () => UserResponse )
    async login(
        @Args() loginReq: LoginReq,
        @Ctx() ctx: Context
    ): Promise<UserResponse> {
        return this.userService.login( loginReq, userId => ctx.req.session.userId = userId )
    }

    @Authorized()
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
    async forgotPassword( @Arg( "email" ) email: string ): Promise<boolean> {
        return this.userService.forgotPassword( email )
    }

    @Authorized()
    @Mutation( () => Boolean )
    async saveJob(
        @Arg( "jobId" ) jobId: number,
        @Ctx() ctx: Context
    ): Promise<boolean> {
        return this.userService.saveJob( ctx.req.session.userId, jobId )
    }

    @Authorized()
    @Mutation( () => Boolean )
    async notInterestedJob(
        @Arg( "jobId" ) jobId: number,
        @Ctx() ctx: Context
    ): Promise<boolean> {
        return this.userService.notInterestedJob( ctx.req.session.userId, jobId )
    }

    @Query( () => CurrentUserJobs )
    async myJobs( @Ctx() ctx: Context ) {
        return this.userService.getAllCurrentUserJobs( ctx.req.session.userId )
    }
}
