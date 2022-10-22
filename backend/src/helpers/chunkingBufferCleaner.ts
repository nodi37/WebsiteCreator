import { clearChunkingBuffer } from "../middlewares/chunkingSystem";

import {
    chunkingBufferCleanerActive,
    chunkingBufferCleanerIntervalMinutes,
    chunkingBufferTimeoutMinutes,
} from "../config/appConfig";


function startChunkingBufferCleaner() {
    if (!chunkingBufferCleanerActive) return;
    setInterval(() => clearChunkingBuffer(chunkingBufferTimeoutMinutes), chunkingBufferCleanerIntervalMinutes * 60000);
    console.log('[Chunking buffer] Chunking buffer cleaner started with ' + chunkingBufferCleanerIntervalMinutes + ' minutes interval.');
}

export default startChunkingBufferCleaner;