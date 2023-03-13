
/**
 * 'unknown' type is another type that can be used when unsure of the type.
 * It is slightly more strict than 'any' and wont allow assignments to other
 * values where the type should be something more specific.
 */
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
if(typeof userInput === 'string'){
  userName = userInput
}

/**
 * 'never' is a type that never returns. Something that maybe crashes the app like an Error.
 */
function generateError(message: string, code: number): never{
  throw {message, errorCode: code}
}

generateError('An error occured!', 500)
