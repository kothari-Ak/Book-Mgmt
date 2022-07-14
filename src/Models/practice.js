// const { count } = require("../../../project3-book-management/src/Models/userModel")
//const { count } = require("../../../project3-book-management/src/Models/userModel")


// let input = "codezinger univesity"
// function myFunction(input){
//     count=0
//     for(let i =0; i<input.length;i++){
//         count++   
//         // console.log(count)
// }
// return count
// }

// console.log(myFunction("codezinger university"))

function myFunction(input){
let arr=[]

for(i=0;i<input.length;i++){
  for(j=i+1;j<input.length;j++){
    if(input[j]!=input[j+1]){
        arr.push(input[i])

    }}
}return arr
}

console.log(myFunction(['hello', 'world', 'hello']))
