import { Company } from "../entities";
import createLoader from "./createLoader";


const companyLoader = createLoader<number, Company>( Company )

export default companyLoader
