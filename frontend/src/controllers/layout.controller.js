import layoutService from "@/services/layout.service";

const layoutController = {
    methods: {
        getManyLayouts: async function (name) {
            //this needs to be prepared to use skip/limit/etc if needed!
            return await this.getManyLayoutsRequest(name);
        },

        addNewLayoutToServer: async function (name) {
            return await this.addNewLayoutRequest(name);
        },

        loadLayoutByName: async function (layoutName) {
            return await this.loadLayoutByNameRequest(layoutName);
        },

        loadLayoutComponentsByLayoutName: async function (layoutName) {
            return await this.loadLayoutComponentsByLayoutNameRequest(layoutName);
        },

        addComponentToLayoutOnServer: async function (layoutDoc, componentId) {
            layoutDoc.components.push(componentId);
            const newLayoutDoc = await this.updateLayoutRequest(layoutDoc);
            return newLayoutDoc;
        },

        updateLayout: async function (layoutDoc) {
            return await this.updateLayoutRequest(layoutDoc);
        }
    },
    mixins: [layoutService]
}

export default layoutController;