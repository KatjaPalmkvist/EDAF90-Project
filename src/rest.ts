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
                    isLoggedIn(): Promise<boolean>,
                    getBookings(sport: Sport): Promise<Object>, 
                    getUserBookings(uid: string): Promise<Object>, 
                    setBooking(uid:string, booking: Booking): Promise<boolean>,
                    removeBooking(uid: string, booking: Booking): Promise<boolean>, 
                    userListener(changeUserStatus: (authChange: boolean) => void): void
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

    isLoggedIn: async () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                unsubscribe();
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, reject)
        })  
    },

    userListener: async (changeUserStatus: (authChange: boolean) => void) => {
        firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    localStorage.setItem("isLoggedIn", "true");
                    changeUserStatus(true);
                    
                } else {
                    localStorage.removeItem("isLoggedIn");
                    changeUserStatus(false);
                }
            }) 
    },


    getBookings: async (sport) => {
        let bookings =  firebase.database().ref("bookings").child(sport).get()
            .then((snapshot: any) => {
                if(snapshot.exists()) {
                    let snap: {date: string, time: string}[] = Object.values(snapshot.val());
                    var result: {[date: string]: string[]} = {}; 
                    snap.forEach(obj => {
                        if (result[obj.date]) {
                            result[obj.date].push(obj.time);
                        } else {
                            result[obj.date] = [obj.time];
                        }
                    }); 
                    return result;
                } else {
                    console.log("No data at bookings");
                    return {};
                } 
            });
        return await bookings;
    }, 

    getUserBookings: async (uid) => {
        let bookings = firebase.database().ref("user_bookings").child(uid).get()
            .then((snapshot: any) => {
                if(snapshot.exists()) {
                    let snap: {booking_ref: string, sport: string, date: string, time: string}[] = Object.values(snapshot.val());
                    let result: {[date: string]: {[sport: string]: string[]}} = {}; 
                    snap.forEach(obj => {
                        if (result[obj.date]) {
                            if (result[obj.date][obj.sport]) {
                                result[obj.date][obj.sport].push(obj.time);
                            } else {
                                result[obj.date][obj.sport] = [obj.time];
                            }
                        } else {
                            result[obj.date] = {[obj.sport]: [obj.time]};                            
                        }
                    });
                    Object.keys(result).map(date => Object.keys(result[date]).forEach(sport => result[date][sport] = result[date][sport].sort()));
                    return result;
                } else { 
                    console.log("No data at user bookings");
                    return {};
                }
            });
        return await bookings;
    }, 

    setBooking: async (uid, booking) => {
        const timeReg = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        const dateReg = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        if (!booking.time.match(timeReg)) {
            console.log("Wrong Time Format");
            return false;
        }
        if (!booking.date.match(dateReg)) {
            console.log("Wrong Date Format");
            return false;
        }
        let exists = firebase.database().ref("bookings/" + booking.sport).get().then(dayBookings => {
            if (dayBookings.exists()) {
                let bookings: {time: string, date: string}[] = Object.values(dayBookings.val());
                if (bookings.find(o => o.time === booking.time && o.date === booking.date)) {
                    return true;
                } 
            }
            return false;
        });

        let result = exists.then(exist => {
            if (!exist) {
                let full_booking = firebase.database().ref("bookings/"+booking.sport).push({date: booking.date, time: booking.time})
                        .then(res => {
                            if(res.key){
                                let user_booking = firebase.database().ref("user_bookings/" + uid)
                                    .push({...booking, booking_ref: res.key})
                                    .then(res => {
                                        if (res.key) {
                                            return true;
                                        } 
                                        console.log("Booking not added, something went wrong");
                                        return false;
                                    })
                                return user_booking;
                            }
                            console.log("Something went wrong during the booking. Please try again!");
                            return false;
                            
                        })
                        .catch(err => {
                            console.log(err.message);
                            return false;
                        })
                        return full_booking;
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
                firebase.database().ref("user_bookings/" + uid).child(bookingRef.user_booking).remove();
                firebase.database().ref("bookings/" + booking.sport).child(bookingRef.booking).remove();
                return true;

            }
            console.log("Data could not be removed")
            return false;
        })

        return await result;
    }




}

