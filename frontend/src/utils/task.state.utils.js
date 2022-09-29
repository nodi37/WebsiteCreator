const tasksStateUtils = {
    methods: {
        setTasksState: async function (name, current, count, text, inProgress) {
            this[name].text = text;
            this[name].count = count;
            this[name].current = current;

            if (inProgress) return;
            this.taskInProgress = false;
        },
    }
}

export default tasksStateUtils;