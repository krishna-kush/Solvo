// Binary search to find the correct insertion position
export const binarySearchIndex = (arr, targetIndex) => { // arr should have a index property for it to work
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid].index === targetIndex) {
            return mid; // Return mid if the index already exists
        } else if (arr[mid].index < targetIndex) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return low; // Return the insertion position
}