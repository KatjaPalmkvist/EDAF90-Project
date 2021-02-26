import firebase from "firebase/app";


require("firebase/auth");
require("firebase/database");
const firebaseConfig = {
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

export enum Sport {
    badminton = "badminton", 
    tennis = "tennis",
    padel = "padel"
}

type Credentials = {
    username: string, 
    password: string
}

type User = {
    email: string, 
    uid: string
}

type Booking = {
    date: string,
    time: string,
    sport: Sport
}



export const rest: {register(credentials: Credentials): Promise<Object>, 
                    login(credentials: Credentials): Promise<User>, 
                    logout(): Promise<boolean>,
                    getCurrentUser(): User, 
                    getBookings(sport: Sport): Promise<Object>, 
                    getUserBookings(uid: string): Promise<Object>, 
                    setBooking(uid:string, booking: Booking): Promise<boolean>} = {
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
                return {};
            })
        
        return await result;
    },

    login: async (credentials) => {
        let result = firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
            .then((userCredentials: {user:any}) => {
                console.log("User signed in")
                let user = userCredentials.user;
                const currentUser: User = user ? {email: user.email || "", uid: user.uid || ""} : {email:"", uid:""};
                return currentUser;
            })
            .catch((error: any) => {
                console.log("User don't exist");
                return {email:"", uid:""};
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


    getCurrentUser: () => {
        const user = firebase.auth().currentUser;
        const currentUser: User = user ? {email: user.email || "", uid: user.uid || ""} : {email:"", uid:""};
        return currentUser;
    }, 


    getBookings: async (sport) => {
        let bookings =  firebase.database().ref("bookings").child(sport).get()
            .then((snapshot: any) => {
                if(snapshot.exists())
                    return snapshot.val();
                else 
                    console.log("No data at bookings");
                    return {}
            });
        return await bookings;
    }, 

    getUserBookings: async (uid) => {
        let bookings = firebase.database().ref("user_bookings").child(uid).get()
            .then((snapshot: any) => {
                if(snapshot.exists())
                    return snapshot.val();
                else 
                    console.log("No data at user bookings")
                    return {};
            });
        return await bookings;
    }, 

    setBooking: async (uid, booking) => {
        let result = firebase.database().ref("bookings/"+booking.sport).child(booking.date).push({time: booking.time})
                        .then(res => {
                            if(res.key){
                                firebase.database().ref("user_bookings/" + uid)
                                    .push({...booking, booking_ref: res.key})
                                    .then(res => {
                                        if (res.key) {
                                            return true;
                                        } 
                                        console.log("Booking not added, something went wring")
                                        return false;
                                    })
                            }
                            console.log("Something went wrong during the booking. Please try again!")
                            return false
                            
                        })
                        .catch(err => {
                            console.log(err.message);
                            return false;
                        });
        
        return await result;
    }




}

