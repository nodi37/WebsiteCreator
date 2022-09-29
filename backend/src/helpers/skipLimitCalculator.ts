const calculateSkipLimit = (skip: number, limit: number, maxResponseCount: number) => {
    const calculatedLimit = (!limit || limit > maxResponseCount) ? maxResponseCount : limit;
    return {skip: skip, limit: calculatedLimit}
};


export { calculateSkipLimit };