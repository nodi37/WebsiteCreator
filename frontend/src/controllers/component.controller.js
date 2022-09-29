import componentService from "@/services/component.service";
import createPropsObj from "@/helpers/componentPropsCreator";

import store from "@/store";

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
        
        deleteComponentFromServer: async function (component) {
            return await this.deleteComponentRequest(component);
        },
    },
    computed: {
        componentsModels() {
            return store.state.componentsModels;
        },
    },
    mixins: [componentService, createPropsObj]
}

export default componentController;