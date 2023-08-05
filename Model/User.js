class User {

    password;

    constructor(username, password, firstname, surname, email) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.verified = false
        this.wallet = 0;
        this.skinEquipped = 0
        this.primaryskin =["../public/img/1.gif"] 
        this.secondaryskin=["../public/img/2.gif"]
        this.wins = 0
        
    }

    addSkin(skinpath_p1,skinpath_p2){
        this.primaryskin.push(skinpath_p1)
        this.secondaryskin.push(skinpath_p2)
    }

    setpassword(password, oldpassword) {

        if (oldpassword == this.password) {
            this.password = password;

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







