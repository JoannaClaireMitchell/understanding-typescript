import "reflect-metadata";
import _ from "lodash";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

import Product from "./models/product.model";

/**
 * Working with third party libraries
 */

// 1. include d.ts files by installing the appropriate @types/[modulename] package.
console.log(_.shuffle([1, 2, 3]));

// 2. use declare when no types exist
declare var GLOBAL: string;

console.log(GLOBAL);

// 3. working with classes -
const p1 = new Product("A book", 12.99);
console.log(p1.getInformation());

const products = [
  {title: "A CArpet", proce: 29.99},
  {title: "A book", price: 10.99},
];

// a. manually transforming a list to a list of class instances.
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

// b. importing and using a class transformer to convert the list.
const loadedProducts = plainToClass(Product, products);

// 4. using a library for validation, which makes use of typescript decorators.
const newProd = new Product("", -5.99);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log({errors});
  } else {
    console.log(newProd.getInformation());
  }
});
