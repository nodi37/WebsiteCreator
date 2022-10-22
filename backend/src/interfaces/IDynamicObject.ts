//This needs to be checked its temporary thing
export default interface IDynamicObject {
    [key: string]: string | number | boolean | RegExp | Array<string> | Object | any;
}