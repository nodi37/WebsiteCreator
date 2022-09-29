import { Request, Response, NextFunction } from "express";
import md5 from "md5"

const filesBuffer = new Map();

interface IChunk {
    data: string,
    order: number
}

const chunkingSystem = function (req: Request, res: Response, next: NextFunction) {

    try {
        const { isChunked, taskId, chunk, size }: { isChunked: boolean, taskId: string, chunk: IChunk, size: number } = req.body;

        if (!isChunked) {
            return next();
        } else if (!taskId) {
            const currentTime = new Date().getTime();
            const newTaskId = md5(currentTime + chunk.data + req.ip);
            const newTaskObj = {
                chunksCount: size,
                chunks: [] as Array<IChunk>,
                taskCreated: currentTime
            }
            newTaskObj.chunks.push(chunk);
            filesBuffer.set(newTaskId, newTaskObj);
            res.status(202).json({ taskId: newTaskId, success: true });
            return;
        } else {
            const taskObj = filesBuffer.get(taskId) as { chunksCount: number, chunks: IChunk[] };
            if (!taskObj) throw new Error('Task not exist!');
            taskObj.chunks.push(chunk);
            if (taskObj.chunksCount == taskObj.chunks.length) {
                taskObj.chunks.sort((a, b) => a.order - b.order);
                const document = taskObj.chunks.reduce((pv, cv): string => pv + cv.data, '');

                req.body.chunkedFile = document;
                filesBuffer.delete(taskId);
                return next();
            } else {
                res.status(202).json({ success: true });
                return;
            }

        }
    } catch (error) {
        console.log('Chunking middleware error!');
        console.log(error);
        res.status(500).json({ error: 'Server error when uploading data! Request can be to long!' });
    }

}

const clearChunkingBuffer = (timeoutInMinutes: number): void => {
    const now = new Date().getTime();

    for (const task of filesBuffer) {
        const taskName = task[0];
        const taskData = task[1];
        const processingTime = Math.round((now - taskData.taskCreated) / 60000);
        if (processingTime > timeoutInMinutes) {
            filesBuffer.delete(taskName);
            console.log(`[Chunking Buffer] Chunking task id: ${taskName} has been deleted! Timed out!`);
        }
    }
}


export {
    clearChunkingBuffer
};
export default chunkingSystem;



