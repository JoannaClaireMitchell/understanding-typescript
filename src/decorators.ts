function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

/**
 * For a decorator added to a class, you can return a new constructor function
 * that will override the old one.
 * In this case, the logic that is inside the new constructor function will be
 * called when the class with the decorator is instantiated rather than when it
 * is defined.
 *
 * Typescript will use return values from Decorators added to methods and
 * Decorators that are added to accessors. All other return values will be ignored.
 */
function WithTemplate(template: string, hookId: string) {
  return function <T extends {new (...args: any[]): {name: string}}>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("rendering template");
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}
/**
 * Decorator functions are executed in the reverse order from which they are
 * written, meaning they are executed from the bottom up, even though the factory
 * functions are executed in the same order as they are written.
 */
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Human {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

/**
 * Instantiating the class which uses the decorator that changes the DOM.
 */
const pers = new Human();
console.log(pers);

// ---

/**
 * Decorators are all run when the class is defined rather than when a class is
 * instantiated.
 */

/**
 * For an instance property, the target will be the prototype of the object,
 * but if it is a static property then target would refer to the constructor function instead.
 */
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

/**
 * Example of decorator on an accessor function
 * @param target
 * @param name
 * @param descriptor
 */
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

/**
 * Example of a method decorator. On an instance method, target is the prototype,
 * or for a static method then target is the constructor function.
 * @param target
 */
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

/**
 * Example of a property decorator. On an instance method, target is the prototype,
 * or for a static method then target is the constructor function.
 */
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Property Decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

//  Naive Validation using Decorators
// A package that implements this in a better way is called class-validator

interface ValidatorConfig {
  [property: string]: {
    [validateableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required": {
          isValid = isValid && !!obj[prop];
          break;
        }
        case "positive": {
          isValid = isValid && obj[prop] > 0;
          break;
        }
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
