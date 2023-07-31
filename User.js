class User {

    #password;

    constructor(username, password, firstname, surname, email) {
        this.username = username;
        this.#password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
    }

    setpassword(password, oldpassword) {

        if (oldpassword == this.#password) {
            this.#password = password;

            return true
        }
        else {
            return false
        }

    }

    checkpassword(password){
        

        return password == this.password

    }


}

module.exports = User







