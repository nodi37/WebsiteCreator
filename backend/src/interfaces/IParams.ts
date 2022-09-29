import { ParsedQs } from 'qs'

interface IParams extends ParsedQs {
    sortOrder?: string;
    sortBy?: string;
    keyword?: string;
}


export default IParams;