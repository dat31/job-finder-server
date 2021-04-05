"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const entities_1 = require("../entities");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
let PostInput = class PostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PostInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PostInput.prototype, "text", void 0);
PostInput = __decorate([
    type_graphql_1.InputType()
], PostInput);
let PaginatedPosts = class PaginatedPosts {
};
__decorate([
    type_graphql_1.Field(() => [entities_1.Post]),
    __metadata("design:type", Array)
], PaginatedPosts.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedPosts.prototype, "hasMore", void 0);
PaginatedPosts = __decorate([
    type_graphql_1.ObjectType()
], PaginatedPosts);
let VoteResult = class VoteResult {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], VoteResult.prototype, "value", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Object)
], VoteResult.prototype, "postId", void 0);
VoteResult = __decorate([
    type_graphql_1.ObjectType()
], VoteResult);
let PostResolver = class PostResolver {
    text(root) {
        return root.text.slice(0, 40);
    }
    creator(root) {
        return entities_1.User.findOne(root.creatorId);
    }
    voteStatus(root, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = ctx.req.session;
            if (!userId) {
                return null;
            }
            const updoot = yield ctx.voteStatusLoader.load({ postId: root.id, userId });
            if (!updoot) {
                return null;
            }
            return updoot.value;
        });
    }
    vote(postId, value, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = ctx.req.session;
            const updoot = yield entities_1.Updoot.findOne({
                where: {
                    postId,
                    userId
                }
            });
            if (updoot && updoot.value !== value) {
                yield entities_1.Updoot.update({ userId, postId }, { value });
            }
            else {
                yield entities_1.Updoot.insert({ userId, postId, value });
            }
            const post = yield entities_1.Post.findOne({ id: postId });
            if (!post) {
                return null;
            }
            yield entities_1.Post.update({ id: postId }, { points: post.points + value, });
            return { postId, value };
        });
    }
    posts(top = 10, skip = 0, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result, total] = yield entities_1.Post.findAndCount({
                take: top || 0,
                skip
            });
            return {
                posts: result,
                hasMore: skip + top < total
            };
        });
    }
    post(id) {
        return entities_1.Post.findOne(id);
    }
    createPost(input, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = Object.assign(Object.assign({}, input), { creatorId: ctx.req.session.userId });
            return entities_1.Post.create(post).save();
        });
    }
    updatePost(id, title, text, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield entities_1.Post.findOne(id, { relations: ["creator", "updoots"] });
            if (!post) {
                return null;
            }
            if ((post === null || post === void 0 ? void 0 : post.creatorId) !== ctx.req.session.userId) {
                return null;
            }
            if (!title || !text) {
                return null;
            }
            if (title === post.title && text === post.text) {
                return null;
            }
            yield entities_1.Post.update({ id }, { title, text });
            return Object.assign(Object.assign({}, post), { title, text });
        });
    }
    deletePost(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield entities_1.Post.findOne(id);
            const { userId } = ctx.req.session;
            if (!post) {
                return null;
            }
            if (post.creatorId !== userId) {
                return null;
            }
            yield entities_1.Post.delete({ id, creatorId: ctx.req.session.userId });
            return id;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "text", null);
__decorate([
    type_graphql_1.FieldResolver(() => entities_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "creator", null);
__decorate([
    type_graphql_1.FieldResolver(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.Post, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "voteStatus", null);
__decorate([
    type_graphql_1.Mutation(() => VoteResult, { nullable: true }),
    __param(0, type_graphql_1.Arg('postId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('value', () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "vote", null);
__decorate([
    type_graphql_1.Query(() => PaginatedPosts),
    __param(0, type_graphql_1.Arg("top", () => type_graphql_1.Int, { nullable: true })),
    __param(1, type_graphql_1.Arg("skip", () => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Query(() => entities_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.UseMiddleware(authMiddleware_1.default),
    type_graphql_1.Mutation(() => entities_1.Post),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => entities_1.Post, { nullable: true }),
    type_graphql_1.UseMiddleware(authMiddleware_1.default),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("title", () => String)),
    __param(2, type_graphql_1.Arg('text', () => String)),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    type_graphql_1.UseMiddleware(authMiddleware_1.default),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(entities_1.Post)
], PostResolver);
exports.default = PostResolver;
//# sourceMappingURL=post.js.map