import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from "type-graphql";
import { Post, User, Updoot } from "../entities";
import { Context } from "../types";
import authMiddleware from "../middlewares/authMiddleware";

@InputType()
class PostInput {
    @Field()
    title: string

    @Field()
    text: string
}

@ObjectType()
class PaginatedPosts {
    @Field( () => [ Post ] )
    posts: Post[]
    @Field()
    hasMore: boolean
}

@ObjectType()
class VoteResult {
    @Field( () => Int, { nullable: true } )
    value: number | null

    @Field( () => Int )
    postId: Post["id"]
}

@Resolver( Post )
export default class PostResolver {

    @FieldResolver( () => String )
    text( @Root() root: Post ) {
        return root.text.slice( 0, 40 )
    }

    @FieldResolver( () => User )
    creator( @Root()root: Post ) {
        return User.findOne( root.creatorId )
    }

    @FieldResolver( () => Int, { nullable: true } )
    async voteStatus(
        @Root()root: Post,
        @Ctx() ctx: Context
    ): Promise<null | Updoot['value']> {
        const { userId } = ctx.req.session
        if ( !userId ) {
            return null
        }
        const updoot = await ctx.voteStatusLoader.load( { postId: root.id, userId } )
        if ( !updoot ) {
            return null
        }
        return updoot.value
    }

    @Mutation( () => VoteResult, { nullable: true } )
    async vote(
        @Arg( 'postId', () => Int )postId: number,
        @Arg( 'value', () => Int )value: number,
        @Ctx() ctx: Context
    ): Promise<VoteResult | null> {
        const { userId } = ctx.req.session
        const updoot = await Updoot.findOne( {
            where: {
                postId,
                userId
            }
        } )
        if ( updoot && updoot.value !== value ) {
            await Updoot.update( { userId, postId }, { value } )
        } else {
            await Updoot.insert( { userId, postId, value } )
        }
        const post = await Post.findOne( { id: postId } )
        if ( !post ) {
            return null
        }
        await Post.update( { id: postId }, { points: post.points + value, } )
        return { postId, value }
    }

    @Query( () => PaginatedPosts )
    async posts(
        @Arg( "top", () => Int, { nullable: true } ) top: number | undefined = 10,
        @Arg( "skip", () => Int, { nullable: true } ) skip: number | undefined = 0,
        @Ctx() ctx: Context,
    ): Promise<PaginatedPosts> {
        const [ result, total ] = await Post.findAndCount( {
            take: top || 0,
            skip
        } )
        return {
            posts: result,
            hasMore: skip + top < total
        }
    }

    @Query( () => Post, { nullable: true } )
    post(
        @Arg( 'id', () => Int ) id: number
    ): Promise<Post | undefined> {
        return Post.findOne( id )
    }

    @UseMiddleware( authMiddleware )
    @Mutation( () => Post )
    async createPost(
        @Arg( "input" ) input: PostInput,
        @Ctx() ctx: Context
    ): Promise<Post> {
        const post = { ...input, creatorId: ctx.req.session.userId }
        return Post.create( post ).save()
    }

    @Mutation( () => Post, { nullable: true } )
    @UseMiddleware( authMiddleware )
    async updatePost(
        @Arg( "id", () => Int ) id: number,
        @Arg( "title", () => String ) title: string,
        @Arg( 'text', () => String )text: string,
        @Ctx() ctx: Context
    ): Promise<Post | null> {
        const post = await Post.findOne(
            id,
            { relations: [ "creator", "updoots" ] }
        )
        if ( !post ) {
            return null
        }
        if ( post?.creatorId !== ctx.req.session.userId ) {
            return null
        }
        if ( !title || !text ) {
            return null
        }
        if ( title === post.title && text === post.text ) {
            return null
        }
        await Post.update( { id }, { title, text } )
        return { ...post, title, text } as Post
    }

    @Mutation( () => Int, { nullable: true } )
    @UseMiddleware( authMiddleware )
    async deletePost(
        @Arg( "id", () => Int ) id: number,
        @Ctx() ctx: Context
    ): Promise<number | null> {
        const post = await Post.findOne( id )
        const { userId } = ctx.req.session
        if ( !post ) {
            return null
        }
        if ( post.creatorId !== userId ) {
            return null
        }
        await Post.delete( { id, creatorId: ctx.req.session.userId } )
        return id
    }
}
