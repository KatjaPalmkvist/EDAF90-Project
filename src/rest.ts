import { resolve } from "@angular/compiler-cli/src/ngtsc/file_system";
import firebase from "firebase/app";
import { ObjectUnsubscribedError } from "rxjs";


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
                    setBooking(uid:string, booking: Booking): Promise<boolean>,
                    removeBooking(uid: string, booking: Booking): Promise<boolean>
                } = {
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
        let exists = firebase.database().ref("bookings/" + booking.sport).child(booking.date).get().then(dayBookings => {
            if (dayBookings.exists()) {
                let bookings: {time: string}[] = Object.values(dayBookings.val())
                if (bookings.find(o => o.time === booking.time)) {
                    return true;
                } 
            }
            return false;
        });

        let result = exists.then(exist => {
            if (!exist) {
                firebase.database().ref("bookings/"+booking.sport).child(booking.date).push({time: booking.time})
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
                        })
                    }
                    return false;
                });
        
        return await result;
    }, 

    removeBooking: async (uid, booking) => {
        let bookingRefExists = firebase.database().ref("user_bookings/" + uid).get().then(res => {
            if (res.exists()) {
                let userBookings: {id: {booking_ref: string, time: string, sport: string, date: string}} = res.val()
                let bookings = Object.values(userBookings)
                
                let bookingExist = bookings.findIndex(o => (o.time === booking.time && o.date === booking.date && o.sport === booking.sport))
                if (bookingExist + 1) {
                    return {user_booking: Object.keys(userBookings)[bookingExist], booking: bookings[bookingExist].booking_ref};
                } 
            }
            return {user_booking: "", booking: ""};
        });

        let result = bookingRefExists.then(bookingRef => {
            if (bookingRef.user_booking && bookingRef.booking) {
                firebase.database().ref("user_bookings/" + uid).child(bookingRef.user_booking).remove().then(r => {
                    console.log(r)
                })
                firebase.database().ref("bookings/" + booking.sport + "/" + booking.date).child(bookingRef.booking).remove().then(r => {
                    console.log(r)
                })
                return true;

            }
            console.log("Data could not be removed")
            return false;
        })

        return await result;
    }




}

