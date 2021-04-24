import { Service } from "typedi";
import { CompanyReview } from "../../entities";
import { Resolver } from "type-graphql";

@Service<CompanyReview>()
@Resolver( CompanyReview )
class CompanyReviews {

}

export default CompanyReview
