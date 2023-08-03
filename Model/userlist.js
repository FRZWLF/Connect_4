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
        let userObjkt = new User(userJson.username, userJson.password, userJson.firstname, userJson.surname, userJson.email)

        return userObjkt
    }

    getSortedList() {
        var sortUser = []
        var sortRank = []
        for (let userRank = 0; userRank < Object.keys(this.userlist).length; userRank++) {
            let key = Object.keys(this.userlist)[userRank]

            sortUser.push(this.userlist[key].username)
            sortRank.push((this.userlist[key].wins))
        }

        console.log(sortUser)
        console.log(sortRank)

        for (let user1 = 0; user1 < sortUser.length; user1++) {
            for (let user2 = 0; user2 < sortUser.length; user2++) {
                if (sortRank[user1] < sortRank[user2]) {
                    let winTemp = sortRank[user1]
                    let userTemp = sortUser[user1]
                    sortRank[user1] = sortRank[user2]
                    sortUser[user1] = sortUser[user2]
                    sortRank[user2] = winTemp
                    sortUser[user2] = userTemp
                }
            }
        }

        console.log(sortUser)
        console.log(sortRank)

        var leaderBoard = []
        var count = 1
        for (let leaderboard = 0; leaderboard<sortUser.length; leaderboard++) {
            leaderBoard[leaderboard] = count + ")  " + sortUser[sortUser.length-leaderboard-1] + "     " + sortRank[sortUser.length-leaderboard-1]
            count++
        }
        return leaderBoard   
    }



    containsUser(username) {

        return Object.hasOwn(this.userlist, username)
    }

    //Add changeUser()

}

module.exports = UserList