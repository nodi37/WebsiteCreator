import IDynamicObject from './IDynamicObject';

export default interface IComponent {
    name: string,
    order: number,
    props: IDynamicObject
}