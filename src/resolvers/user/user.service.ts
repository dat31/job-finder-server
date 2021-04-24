import { Inject, Service } from "typedi";
import { Job, User, WorkExperience, WorkSkill } from "../../entities";
import { Repository } from "typeorm";
import { BaseService } from "../../base";
import { Redis } from "ioredis";
import { redis } from "../../configs/redisConfig";
import {
    ChangePasswordReq,
    CurrentUserJobs,
    ErrorField,
    LoginReq,
    ProfileResponse,
    RegisterInput,
    UserResponse
} from "./user.type";
import { isValidLength } from "../../utils/stringUtils";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import argon2 from "argon2";
import { validateRegister } from "./user.helper";
import { v4 } from "uuid";
import sendEmail from "../../api/sendEmail";

@Service<User>()
class UserService extends BaseService<User> {
    static DI_KEY: String = "USER_SERVICE"
    private PW_MIN_LENGTH = 6
    private DB_DUPLICATE_ERR_CODE = '23505'

    private redis: Redis
    private workExpRepository: Repository<WorkExperience>
    private workSkillRepository: Repository<WorkSkill>
    private userRepository: Repository<User>
    private jobRepository: Repository<Job>

    constructor(
        @Inject( UserService.DI_KEY.toString() )
        private readonly repositories: [
            Repository<User>,
            Repository<WorkExperience>,
            Repository<WorkSkill>,
            Repository<Job>
        ] ) {
        super( repositories[0] )
        const [ userRepository, workExpRepository, workSkillRepository, jobRepository ] = repositories
        this.userRepository = userRepository
        this.workExpRepository = workExpRepository
        this.workSkillRepository = workSkillRepository
        this.jobRepository = jobRepository
        this.redis = redis
    }

    async getCurrentUser( userId: User["id"] | undefined ): Promise<User | undefined> {
        if( !userId ) return undefined
        return this.userRepository.findOne( userId )
    }

    async getProfile( userId: User["id"] | undefined ): Promise<ProfileResponse | undefined> {
        if( !userId ) return undefined
        return {
            workExperiences: await this.workExpRepository.find( { userId } ),
            workSkills: await this.workSkillRepository.find( { userId } )
        }
    }

    async changePassword(
        { token, newPassword }: ChangePasswordReq,
        onSuccess: ( userId: User["id"] ) => void,
    ): Promise<UserResponse> {
        if( isValidLength( newPassword, this.PW_MIN_LENGTH ) ) {
            return this.getError(
                'newPassword',
                'New password length must be greater than ' + this.PW_MIN_LENGTH
            )
        }
        try {
            const userId = await this.redis.get( FORGET_PASSWORD_PREFIX + token )
            if( !userId ) {
                return this.getError( 'token', 'Token expired' )
            }
            const userIdInt = parseInt( userId )
            const user = await this.userRepository.findOne( userIdInt )
            if( !user ) {
                return this.getError( 'token', 'User does not exists' )
            }
            await this.userRepository.update( userIdInt, { password: await argon2.hash( newPassword ) } )
            await this.redis.del( FORGET_PASSWORD_PREFIX + token )
            onSuccess( userIdInt )
            return { user }
        } catch( e ) {
            console.log( '-----CHANGE PW ERROR------', e )
            return this.getError( 'token',
                'An error occurred, try again later'
            )
        }
    }

    async register( registerReq: RegisterInput, onSuccess: ( userId: number ) => void ): Promise<UserResponse> {
        let user
        const { username, password, email } = registerReq
        const errors = validateRegister( registerReq )
        if( errors ) {
            return { errors }
        }
        try {
            const result = await this.userRepository
                .create( { username, password: await argon2.hash( password ), email } )
                .save()
            user = result
            onSuccess( result.id )
        } catch( e ) {
            if( e.code === this.DB_DUPLICATE_ERR_CODE ) {
                return this.getError( 'username', "username or email already existed" )
            }
            return this.getError( 'form', "An error occurred! Try again later" )
        }
        return { user }
    }

    async login(
        { usernameOrEmail, password }: LoginReq,
        onSuccess: ( userId: User["id"] ) => void
    ): Promise<UserResponse> {
        const column = usernameOrEmail.includes( '@' ) ? 'email' : 'username'
        const user = await this.userRepository.findOne( {
            where: { [column]: usernameOrEmail }
        } )
        if( !user ) {
            return this.getError( 'usernameOrEmail', 'account does not exist!' )
        }
        const valid = await argon2.verify( user.password, password )
        if( !valid ) {
            return this.getError( 'password', 'incorrect password' )
        }
        onSuccess( user.id )
        return { user }
    }

    async forgotPassword( email: User["email"] ): Promise<boolean> {
        const user = await this.userRepository.findOne( { where: { email } } )
        if( !user ) {
            return false
        }
        const token = v4()
        await this.redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 24 * 3 )
        const html = `<a href="${ process.env.CORS_ORIGIN }/change-password/${ token }">reset password</a>`
        const hehe = await sendEmail( email, html )
        console.log( 'HEE', hehe )
        return true
    }

    async notInterestedJob( userId: User["id"] | undefined, jobId: Job["id"] ) {
        return this.updateJobIdColumn( userId, jobId, "notInterestedJobIds" )
    }

    async saveJob( userId: User["id"] | undefined, jobId: Job["id"] ) {
        return this.updateJobIdColumn( userId, jobId, "savedJobIds" )
    }

    async getAllCurrentUserJobs( userId: User["id"] | undefined ): Promise<CurrentUserJobs> {
        const user = await this.userRepository.findOne( userId )
        if( !user ) {
            return { savedJobs: [], appliedJobs: [] }
        }
        const { savedJobIds } = user
        if( !savedJobIds ) {
            return { savedJobs: [], appliedJobs: [] }
        }
        const savedJobs = await this.jobRepository.findByIds( savedJobIds )
        return { savedJobs, appliedJobs: [] }
    }

    private getError(
        field: ErrorField["field"],
        message: ErrorField["message"]
    ): Pick<UserResponse, "errors"> {
        return {
            errors: [ { field, message } ]
        }
    }

    private async updateJobIdColumn(
        userId: number | undefined,
        jobId: number,
        jobColumn: keyof Pick<User, "notInterestedJobIds" | "savedJobIds">
    ): Promise<boolean> {
        if( !userId ) {
            return false
        }
        const user = await this.userRepository.findOne( userId )
        if( !user ) {
            return false
        }
        await this.userRepository.update( userId, {
            [jobColumn]: [ ...user.savedJobIds, jobId ]
        } )
        return true
    }


}

export default UserService
