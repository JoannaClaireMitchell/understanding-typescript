function addNumbers(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result " + num);
}

printResult(addNumbers(5, 12));

let combineValues;
combineValues = add;
console.log(combineValues(8, 8));

/**
 * Functions as types.
 * Can give the return value as void even if returning from the callback, to
 * show that nothing is expected to happen with the value returned from the function.
 */
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(4, 15, (num) => console.log(num));
