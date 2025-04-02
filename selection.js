function selectionSort(arr) {
    // Loop through the entire array
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
  
      // Find the smallest element in the remaining unsorted part
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      // Swap the found minimum element with the current element
      if (i !== minIndex) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
  
    return arr;
  }
  
  module.exports = selectionSort;
  