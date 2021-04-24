import { Service } from "typedi";
import { Args, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { WorkSkill } from "../../entities";
import { Context } from "../../types";
import WorkSkillService from "./workskill.service";
import { CreateWorkSkillArgs, DeleteWorkSkillArgs, UpdateWorkSkillArgs } from "./workskill.type";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Service<WorkSkill>()
@Resolver( WorkSkill )
export default class WorkSkillResolver {
    constructor( private readonly service: WorkSkillService ) {
    }

    @Authorized()
    @Mutation( () => WorkSkill )
    createWorkSkill(
        @Ctx() ctx: Context,
        @Args() { workSkill }: CreateWorkSkillArgs
    ): Promise<WorkSkill> {
        const { userId } = ctx.req.session
        return this.service.create( { ...workSkill, userId } )
    }

    @Authorized()
    @Mutation( () => WorkSkill )
    updateWorkSkill( @Args() { workSkill }: UpdateWorkSkillArgs ): Promise<QueryDeepPartialEntity<WorkSkill>> {
        return this.service.update( workSkill.id, workSkill )
    }

    @Authorized()
    @Mutation( () => Int )
    deleteWorkSkill( @Args() { id }: DeleteWorkSkillArgs ): Promise<number> {
        return this.service.delete( id )
    }
}
