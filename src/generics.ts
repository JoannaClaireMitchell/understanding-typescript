// const names: Array<string> = [];

// names[0].split("");

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done");
//   }, 2000);
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: "Max"}, {age: 30});
console.log(mergedObj.age);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no Value.";
  if (element.length > 0) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there"));

/**
 * Element implicitly has an 'any' type because expression of type 'string'
 * can't be used to index type '{}'. No index signature with a parameter of type
 * 'string' was found on type '{}'
 */
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value: ${obj[key]}`;
}

extractAndConvert({name: "max"}, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number | string>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: "Max"});
// objStorage.addItem({name: "Manu"});
// // ...
// objStorage.removeItem({name: "Max"});
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

/**
 * Partials turn a type into one where all of the properties are optional.
 */
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

/**
 * Readonly utility will turn the type into one where all of the properties are readonly.
 */
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push('Manu')
// names.pop()
