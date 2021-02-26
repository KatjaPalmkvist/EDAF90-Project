import firebase from "firebase/app";


require("firebase/auth");
require("firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyCCwlDhG2og5UMLeBqNubMjwrMsxHj8HDI",
    authDomain: "edaf-90.firebaseapp.com",
    databaseURL: "https://edaf-90-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "edaf-90",
    storageBucket: "edaf-90.appspot.com",
    messagingSenderId: "815688758631",
    appId: "1:815688758631:web:bed1f352320bd8e122abc2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


type Credentials = {
    username: string, 
    password: string
}

type Booking = {
    sport: string,
    time: string, 
    date: string
}


export const rest: {register(credentials: Credentials): any, 
                    login(credentials: Credentials): any, 
                    logout(): any,
                    isSignedIn(): any, 
                    getBookings(sport: string): Object, 
                    getUserBookings(userid: string): Object} = {
    register: async (credentials) => {
        let result = firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password)
            .then((userCredentials: any) => {
                //User is now logged in
                let user = userCredentials.user;
                alert(`User registered: ${user} and logged in`)
                return user;
            })
            .catch((error: any) => { 
                console.log(error.message);
                return undefined;
            })
        
        return await result;
    },

    login: async (credentials) => {
        let result = firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
            .then((userCredentials: {user:any}) => {
                console.log("User signed in")
                let user = userCredentials.user;
                return user;
            })
            .catch((error: any) => {
                console.log("User don't exist");
                return undefined;
            })
        
        return await result;
    },

    logout: async () => {
        let result = firebase.auth().signOut().then(() => {
            console.log("Logout successful");
            return true;
          }).catch((error: any) => {
            throw error.message;
          });

        
        return await result;
    }, 

    isSignedIn: () => {
        return firebase.auth().currentUser;
    }, 


    getBookings: async (sport) => {
        let bookings =  firebase.database().ref("bookings").child(sport).get()
            .then((snapshot: any) => {
                if(snapshot.exists())
                    return snapshot.val();
                else 
                    console.log("No data at bookings");
            });
        return await bookings;
    }, 

    getUserBookings: async (userid) => {
        let bookings = firebase.database().ref("user_bookings").child(userid).get()
            .then((snapshot: any) => {
                if(snapshot.exists())
                    return snapshot.val();
                else 
                    console.log("No data at user bookings")
            });
        return await bookings;
    }



}

