import layoutService from "@/services/layout.service";

const layoutController = {
    methods: {
        loadLayoutByName: async function (layoutName) {
            return await this.loadLayoutByNameRequest(layoutName)
        },

        loadLayoutComponentsByLayoutName: async function (layoutName) {
            return await this.loadLayoutComponentsByLayoutNameRequest(layoutName)
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