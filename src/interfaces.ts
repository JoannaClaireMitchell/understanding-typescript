/**
 * The difference between interface and type here is that interface can only be
 * used to describe an object, so it makes it more clear that this can only be an
 * object.
 *
 * The other difference is that they can be used to enforce the structure across
 * different class definitions. In this sense they can be considered similar as
 * abstract classes, however the interface does not actually implement anything.
 *
 * readonly can be set on a property but none of the other modifiers can be used.
 *
 * Extending interfaces is a way to merge two or more together, to make some
 * interfaces inherit from others. These could also be listed when defining a
 * class with 'implements' where more than one interface can be listed.
 */

// type AddFn = (a: number, b: number) => number;

// This is another way to define a function type, using interface.
interface AddFn {
  (a: number, b: number): number;
}

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Age {
  age?: number;
}
interface Greetable extends Named, Age {
  greet(phrase: string): void;
}

class Person implements Greetable {
  constructor(public name?: string, public age?: number) {}

  greet(phrase: string): void {
    if (this.name) {
      console.log(`${phrase} ${this.name}`);
    } else {
      console.log("Hi");
    }
  }
}

let user1: Greetable;
user1 = new Person("Callie", 30);
user1.greet("Hi there I am");
