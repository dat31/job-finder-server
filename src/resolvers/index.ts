import HelloResolver from './hello'
import UserResolver from './user'
import PostResolver from './post'
import JobResolver from "./job";

import { NonEmptyArray } from "type-graphql";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    HelloResolver,
    UserResolver,
    PostResolver,
    JobResolver
]

export default resolvers
