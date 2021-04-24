import { Service } from "typedi";
import { Args, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { WorkExperience } from "../../entities";
import WorkExperienceService from "./workexp.service";
import { Context } from "../../types";
import { CreateWorkExpArgs, DeleteWorkExpArgs, UpdateWorkExpArgs } from "./workexp.type";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Service<WorkExperience>()
@Resolver( WorkExperience )
export default class WorkExperienceResolver {
    constructor( private readonly service: WorkExperienceService ) {
    }

    @Authorized()
    @Mutation( () => WorkExperience )
    createWorkExperience(
        @Ctx() ctx: Context,
        @Args() { workExperience }: CreateWorkExpArgs
    ) {
        const { userId } = ctx.req.session
        return this.service.create( { ...workExperience, userId } )
    }

    @Authorized()
    @Mutation( () => WorkExperience )
    async updateWorkExperience(
        @Ctx() ctx: Context,
        @Args() { workExperience }: UpdateWorkExpArgs
    ): Promise<QueryDeepPartialEntity<WorkExperience>> {
        const result = await this.service.update( workExperience.id, workExperience )
        return result.userId ? result : ( { ...result, userId: ctx.req.session.userId } )
    }

    @Authorized()
    @Mutation( () => Int )
    deleteWorkExperience(
        @Ctx() ctx: Context,
        @Args() { id }: DeleteWorkExpArgs
    ): Promise<number> {
        return this.service.delete( id )
    }

}
