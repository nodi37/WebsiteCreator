import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const chunkingSystem = {
    data: function () {
        return {
            chunkingSystemState: {
                current: 0,
                count: 0
            }
        }
    },
    methods: {
        sendChunks: async function (chunks, endpoint, reqBody) {
            return new Promise(async (resolve, reject) => {
                try {
                    let taskId = '';
                    let i = 0;
                    this.chunkingSystemState.current = 0;
                    this.chunkingSystemState.count = chunks.length;

                    for (const chunk of chunks) {
                        this.chunkingSystemState.current = i;
                        const response = await axios.post(api + endpoint, {
                            isChunked: true,
                            taskId: taskId,
                            chunk: chunk,
                            size: chunks.length,
                            ...reqBody
                        });

                        if (i === 0) taskId = response.data.taskId;

                        if (!!response.data.documentId) {
                            this.chunkingSystemState.current = this.chunkingSystemState.count;
                            resolve(response);
                        };
                        
                        i++;
                    };

                } catch (error) {
                    console.log(error);
                    reject(error);
                }

            });
        },
        chunkString: function (dataString) {
            const chunkLength = 345000 * 2; //Ca 256kb * 2
            const chunksCount = Math.ceil(dataString.length / chunkLength);
            const chunks = [];

            for (let i = 0; i < chunksCount; i++) {
                const chunkStart = i * chunkLength;
                const chunkEnd = chunkStart + chunkLength;
                const chunk = dataString.slice(chunkStart, chunkEnd)
                chunks.push({ data: chunk, order: i });
            }

            return chunks;
        }
    }
}

export default chunkingSystem;
