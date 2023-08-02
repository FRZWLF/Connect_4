const fs = require('fs');
const User = require('./User')
class UserList {
    constructor() {
        // Store the provided filename as a property of the instance
        this.file = fs.readFileSync("./Model/userlist.json", "utf8");
        this.userlist = JSON.parse(this.file)
    }
    // adds a User into the existing list and saves changes into userlist.json
    addUser(user) {
        try {
            this.userlist[user.username] = user
            const liststring = JSON.stringify(this.userlist)
            fs.writeFileSync("./Model/userlist.json", liststring)
        }

        catch (err) {

            console.log("There was a problem adding you as a user. Try a different username and fill out all the spaces.")
        }
    }
    getUser(username) {
        // Retrieve the user object from the 'users' object using the provided 'username' as the key

        let userJson = this.userlist[username]
        let userObjkt = new User ( userJson.username, userJson.password, userJson.firstname, userJson.surname, userJson.email)

        return userObjkt
    }

    containsUser(username){
    
        return Object.hasOwn(this.userlist, username)
    }

    //Add changeUser()
}
module.exports = UserList