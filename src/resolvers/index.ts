import HelloResolver from './hello'
import UserResolver from './user'
import JobResolver from "./job";
import WorkExperienceResolver from "./workexperience";
import CompanyResolver from "./company";
import WorkSkillResolver from "./workskill";

import { NonEmptyArray } from "type-graphql";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    HelloResolver,
    UserResolver,
    JobResolver,
    CompanyResolver,
    WorkExperienceResolver,
    WorkSkillResolver
]

export default resolvers
