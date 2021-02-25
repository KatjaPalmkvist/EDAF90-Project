var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");


export const base: {rest:{}} = {rest:{}};



base.rest = {
    register: (credentials: {username: String, password: String}) => {
        firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password)
            .then((userCredentials) => {
                //User is now logged in
                console.log("Login successful")
                let user = userCredentials.user;
                return user;
            })
            .catch(error => {
                throw error.message;
            })
    },

    login: (credentials: {username: String, password: String}) => {
        firebase.auth().signInUserWithEmailAndPassworD(credentials.username, credentials.password)
            .then(userCredentials => {
                console.log("User registered and signed in")
                let user = userCredentials.user;
                return user;
            })
            .catch(error => {
                throw error.message;
            })
    },

    logout: () => {
        firebase.auth().signOut().then(() => {
            console.log("Logout successful");
            return true;
          }).catch((error) => {
            throw error.message;
          });
    },

    getBookings()


}

