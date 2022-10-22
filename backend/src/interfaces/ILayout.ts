import { Types } from "mongoose"

export default interface ILayout {
    name: string,
    components: Array<Types.ObjectId>,
    isGlobal: Boolean,
    isRequired: Boolean
}
