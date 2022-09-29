import IComponent from "./IComponent"

export default interface ILayout {
    name: string,
    components: Array<IComponent>,
    isGlobal: Boolean,
    isRequired: Boolean
}
