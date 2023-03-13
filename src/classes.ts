abstract class Department {
  /**
   * Private modifier
   *
   * 'private' is called a modifier in typescript
   */
  // private name: string;

  /**
   * Protected modifier
   *
   * 'protected' means that the property is inaccesible from outside the class,
   * but still accessible from other classes that extend the class, unlike 'private'.
   */
  protected employees: string[] = [];

  // A shortcut for adding modifiers is to declare them in the constructor params.
  // This tells typescript to create properties for these values with the exact same names.

  /**
   * Readonly modifier
   *
   * adding 'readonly' means that the value cannot be modified after it is created.
   */
  constructor(protected readonly id: string, public name: string) {
    // this.name = name;
  }

  static createEmployee(name: string) {
    return {name: name};
  }

  /**
   * Abstract modifier
   *
   * Use 'abstract' to mark a method as something that should be implemented by
   * all instances of the class where they should add their own implementation.
   * Then the 'abstract' keyword should also be used in front of the class
   * Declaration. This also means the class can no longer be instantiated, it
   * exists only to be inherited from.
   */
  // Typescript special - tells the function that 'this' is expected to take the shape of the Department class.
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // The following would create an error because we cannot modify a readonly property.
    // this.id = "d2";
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  /**
   * Singletons & private constructors
   *
   * Making the constructor private means that only one instance of it can be
   * created - the singleton pattern.
   */
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addEmployee(employee: string) {
    // The following would create an error because we cannot modify a readonly property.
    // this.id = "d2";
    if (employee === "Jo") {
      return;
    }
    this.employees.push(employee);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  describe(this: AccountingDepartment) {
    console.log(`Accounting Department - ID: (${this.id})`);
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Jo");

const it = new ITDepartment("d1", ["Joanna"]);
it.describe();

it.addEmployee("Jo");
it.addEmployee("Ali");

// The following would throw an error in typescript since the employees value is
// set to 'private'
// accounting.employees[2] = "anna";

it.printEmployeeInformation();
console.log(it);

// Illustrates the issue with reassigning methods, and losing 'this' which
// typescript can catch using the above declaration.
// const accountingCopy = {describe: accounting.describe};
// accountingCopy.describe();

// Normal way to instantiate the object, now not possible due to 'private'
// constructor in the AccountingDepartment class.
// const accounting = new AccountingDepartment();
const accounting1 = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
// Should show the same object, since it can only be instantiated onces.
console.log(accounting1, accounting2);

accounting1.mostRecentReport = "Year end report";
console.log(accounting1.mostRecentReport);
accounting1.addReport("Something went wrong...");
accounting1.printReports();
accounting1.describe();

accounting1.addEmployee("Jo");
accounting1.addEmployee("Ali");

accounting1.printEmployeeInformation();
