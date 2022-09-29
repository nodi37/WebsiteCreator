import IDynamicObject from './IDynamicObject';

interface IFilterStatic {
    keywordStringType: string[];
    keywordNumberType: string[];
}

type IFilterDefinitions = IFilterStatic & IDynamicObject;

export default IFilterDefinitions;