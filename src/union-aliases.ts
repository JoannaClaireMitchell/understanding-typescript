type Input = number | string

type ResultLiterals = 'as-number' | 'as-string'

function combine(input1: Input, input2: Input, resultConversion: ResultLiterals){
  let result
  if(typeof input1 === 'number' && typeof input2 === 'number'){
    result = input1 + input2
  } else {
    result = input1.toString() + input2.toString()
  }

  if(resultConversion == "as-number"){
    return +result
  } else {
    return result.toString()
  }
}
