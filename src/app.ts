class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  // Typescript special - tells the function that 'this' is expected to take the shape of the Department class.
  describe(this: Department) {
    console.log("Department: " + this.name);
  }
}

const accounting = new Department("Accounting");
accounting.describe();

// Illustrates the issue with reassigning methods, and losing 'this' which
// typescript can catch using the above declaration.
// const accountingCopy = {describe: accounting.describe};
// accountingCopy.describe();
