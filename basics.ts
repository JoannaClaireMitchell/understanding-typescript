function add(num1: number, num2: number, showResult: boolean, phrase: string){
  const result = num1 + num2
  if(showResult){
    console.log(phrase + result)
  }else{
    return result
  }
}

add(5, 3.7, true, 'Result is: ')
