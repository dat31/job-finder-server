import HelloResolver from './hello'
import UserResolver from './user'
import PostResolver from './post'
import JobResolver from "./job";

import { NonEmptyArray } from "type-graphql";
import CompanyResolver from "./company";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    HelloResolver,
    UserResolver,
    PostResolver,
    JobResolver,
    CompanyResolver,
]

export default resolvers
