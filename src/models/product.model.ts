import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

// To use decorators, turn on experimentalDecorators in the tsconfig file.
export default class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
