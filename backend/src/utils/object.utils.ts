import IDynamicObject from "../interfaces/IDynamicObject";

const createObjectFromStrings = (keysArr: string[], valuesArr:Array<string|number|boolean|RegExp>): IDynamicObject => {
    const entries = new Map();
    keysArr.forEach((key, index) => entries.set(key, valuesArr[index]));
    return Object.fromEntries(entries);
}

export default createObjectFromStrings;