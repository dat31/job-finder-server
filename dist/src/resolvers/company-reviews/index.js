"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const entities_1 = require("../../entities");
const type_graphql_1 = require("type-graphql");
let CompanyReviews = class CompanyReviews {
};
CompanyReviews = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(entities_1.CompanyReview)
], CompanyReviews);
exports.default = entities_1.CompanyReview;
//# sourceMappingURL=index.js.map