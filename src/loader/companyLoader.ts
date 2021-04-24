import { Company } from "../entities";
import createCommonLoader from "./createCommonLoader";


const companyLoader = createCommonLoader<number, Company>( Company )

export default companyLoader
