type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

/**
 * Intersection Types
 *
 * With union types this is the types they both have in common and in object or
 * interface type it is the combination of all.
 */
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

/**
 * Type Guards
 *
 * Checking inside the function for 'typeof [type]', '[parameter] in object', or
 * 'instanceof [class]' for classes.
 */
type Combinable = string | number;
type Numberic = number | boolean;

type Universal = Combinable & Numberic;

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name ${emp.name}`);
  if ("privileges" in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
  if ("startDate" in emp) {
    console.log(`Start Date: ${emp.startDate}`);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: "Victoria", startDate: new Date()});

class Car {
  drive() {
    console.log("driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck....");
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/**
 * Discriminated Unions
 *
 * These are types that are common to all types used in the union which can be
 * checked against in the function, using a switch statement.
 */
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird": {
      speed = animal.flyingSpeed;
      break;
    }
    case "horse": {
      speed = animal.runningSpeed;
      break;
    }
  }
  console.log(`Moving with speed ${speed}`);
}

moveAnimal({type: "bird", flyingSpeed: 1000});

/**
 * Type Casting
 *
 * Can be done using angle brackets before the selection or using 'as [type]'
 * just after the selection
 */
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;

userInputElement.value = "Hi There";

/**
 * Index Properties
 *
 * useful when we wont know the properties of the object in advance but we will
 * know the structure of the object, for example that it will contain keys with
 * a string type and values with a string type.
 */

interface ErrorContainer {
  [property: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character",
};

/**
 * Function Overloads
 *
 * Describes different ways of calling a function which will result in different
 * things. In other words, provide all different combinations and their outcome.
 */

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Max", "Burger");
result.split(" ");

/**
 * Optional Chaining
 */
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: {title: "CEO", description: "My own company"},
};

console.log(fetchedUserData?.job?.title);

/**
 * Nullish Coalescing
 */
const userIn = "";
// const storedData = userIn || "DEFAULT";
const storedData = userInput ?? "DEFAULT";
console.log(storedData);
