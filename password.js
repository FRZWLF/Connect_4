//import User from './User.js'
const User = require('./User.js')
const user1 =new User("MaxM", "abc", "Max", "Mustermann",  "123@gmail.com");

user1.setpassword("dbe","abc")

console.log(user1)

var passwordcorrect = user1.checkpassword("dbe")

console.log(passwordcorrect)