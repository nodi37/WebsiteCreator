import layoutController from "@/controllers/layout.controller";
import componentController from "@/controllers/component.controller";
import tasksStateUtils from "@/utils/task.state.utils";


const componentManagement = {
    data: function () {
        return {
            //Internal data
            layoutData: {},
            layoutComponents: [],

            //Management states
            isLoading: true,
            isError: false,
            isLoaded: false,

            //Tasks state
            taskInProgress: false,
            taskState: {
                current: 0,
                count: 0,
                text: ''
            }
        };
    },

    computed: {
        //Components sorted by order
        componentsByOrder() {
            return [...this.layoutComponents.sort((a, b) => a.order - b.order)];
        },
    },

    methods: {
        //Data loader:
        loadData: async function (layoutName) {
            try {
                this.layoutData = await this.loadLayoutByName(layoutName);
                this.layoutComponents = await this.loadLayoutComponentsByLayoutName(layoutName);
                this.isLoading = false;
                setTimeout(() => {
                    this.isLoaded = true;
                }, 500);
            } catch (error) {
                this.isLoading = false;
                this.isError = true;
                console.log(error);
            }
        },

        //Mixin complex tasks
        saveNewComponent: async function (doc) {
            try {
                await this.setTasksState('taskState', 0, 1, 'saving-component', true);

                const updatedDocs = await this.saveNewCompAndUpdateLayoutOnServer(doc);
                this.replaceOrDeleteLocalComponent(doc, updatedDocs.uComponent);
                this.layoutData = updatedDocs.uLayout;

                await this.setTasksState('taskState', 1, 1, 'task-finished', false);
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        },

        updateComponent: async function (doc) {
            try {
                await this.setTasksState('taskState', 0, 1, 'updating-component', true);

                const updatedDoc = await this.updateComponentOnServer(doc, this.layoutData.isGlobal);
                this.removeOldPropsData(doc.propsToRemove);
                this.replaceOrDeleteLocalComponent(doc, updatedDoc);

                await this.setTasksState('taskState', 1, 1, 'task-finished', false);
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        },

        deleteComponent: async function (doc) {
            try {
                await this.setTasksState('taskState', 0, 1, 'deleting-component', true);

                if (!!doc._id) {
                    //remove from server if exists and replace layout
                    const newDocs = await this.deleteComponentAndUpdateLayoutOnServer(doc);
                    this.layoutDoc = newDocs.uLayout;
                }

                //Delete component document from local layoutComps array
                this.replaceOrDeleteLocalComponent(doc, null);

                //Update other docs order to avoid gaps
                const toUpdate = this.layoutComponents.filter((comp) => comp.order > doc.order);

                for (const i in toUpdate) {
                    const updatedComponent = {
                        ...toUpdate[i],
                        order: toUpdate[i].order - 1
                    }

                    if (!updatedComponent._id) {
                        this.saveNewComponent(updatedComponent);
                    } else {
                        this.updateComponent(updatedComponent);
                    }
                }

                await this.setTasksState('taskState', 0, 1, 'task-finished', false);

            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        },

        removeOldPropsData: async function (propsToRemoveArr) {
            for (const prop of propsToRemoveArr) {
                switch (prop.type) {
                    case 'image':
                        await this.deleteImage(prop.id);
                        break;

                    default:
                        break;
                }
            }
        },

        moveUpComponent: async function (doc) {
            try {
                await this.setTasksState('taskState', 0, 1, 'moving-components', true);

                const newOrder = doc.order - 1;
                const replacedComp = this.layoutComponents.find((component) => component.order == newOrder);

                const newComps = [
                    { ...doc, order: newOrder },
                    { ...replacedComp, order: doc.order }
                ];

                for (const comp of newComps) {
                    if (!comp._id) {
                        this.saveNewComponent(comp);
                    } else {
                        this.updateComponent(comp);
                    }
                }

                await this.setTasksState('taskState', 1, 1, 'task-finished', false);
            } catch (error) {
                console.log(error);
                this.isError = true;
            }
        },

        //Easy to make moveDownComp


        //Complex server management tasks
        deleteComponentAndUpdateLayoutOnServer: async function (component) {

            const deleteTask = await this.deleteComponentWithDataFromServer(component);

            if (!deleteTask.success) return;

            const newIds = this.layoutData.components.filter(id => id != component._id);

            const newLayoutDoc = {
                ...this.layoutData,
                components: newIds,
            }

            const newLayout = await this.updateLayout(newLayoutDoc);

            return { deletedComp: component, uLayout: newLayout };
        },

        saveNewCompAndUpdateLayoutOnServer: async function (component) {

            //Create component
            const newComponent = await this.saveComponentOnServer(component, this.layoutData.isGlobal);

            //Update layout
            const newLayoutDocument = await this.addComponentToLayoutOnServer(this.layoutData, newComponent._id);

            return { uComponent: newComponent, uLayout: newLayoutDocument }
        },


        //Local functions
        replaceOrDeleteLocalComponent: function (oldDoc, newDoc) {
            const filterOne = this.layoutComponents.filter((doc) => doc != oldDoc);
            const newComps = !!oldDoc._id ? filterOne.filter((doc) => doc._id != oldDoc._id) : filterOne;
            if (!!newDoc) newComps.push(newDoc);
            this.layoutComponents = newComps;
            return oldDoc;
        },
    },

    mixins: [
        layoutController,
        componentController,
        tasksStateUtils
    ],
}


export default componentManagement;