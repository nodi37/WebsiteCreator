import componentService from "@/services/component.service";
import createPropsObj from "@/helpers/componentPropsCreator";

import store from "@/store";
import imageController from "./image.controller";

const componentController = {
    methods: {
        getComponentModel: function (name) {
            return this.componentsModels.find((doc) => doc.name === name);
        },

        updateComponentOnServer: async function (modifiedComponent, isGlobal) {
            const props = await this.createPropsObj(modifiedComponent, isGlobal);
            const newComponent = {
                ...modifiedComponent,
                order: modifiedComponent.order,
                props: props,
            }
            const req = await this.updateComponentRequest(newComponent)
            return req;
        },

        saveComponentOnServer: async function (component, isGlobal) {
            const newProps = await this.createPropsObj(component, isGlobal);
            const newComponent = {
                name: component.name,
                order: component.order,
                props: newProps,
            }
            const newComponentData = await this.saveNewComponentRequest(newComponent);
            return newComponentData;
        },

        deleteComponentWithDataFromServer: async function (component) {
            const cmpModel = this.getComponentModel(component.name);

            for (const imgProp of cmpModel.props.images) {
                const imgId = component.props[imgProp.name];
                if (!!imgId) this.deleteImage(imgId)
            }

            return await this.deleteComponentRequest(component);
        },
    },
    computed: {
        componentsModels() {
            return store.state.componentsModels;
        },
    },
    mixins: [componentService, imageController, createPropsObj]
}

export default componentController;