
class WaitingList {
    constructor() {
        this.WaitingList = []
    }
    addUsertoWatingList(username) {
        this.WaitingList.push(username)
    }

    removeUserFromWaitingList(username) {
        if (this.WaitingList.includes(username)) {
            const index = this.WaitingList.indexOf(username)
            if (index !== -1) {
                return this.WaitingList.splice(index, 1)[0];
            }

        }
    }

    getUsers() {
        return this.WaitingList

    }

}

module.exports = WaitingList




