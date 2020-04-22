import * as firebase from 'firebase';
//const firebase = require('firebase');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain:process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.FIREBASE_DATABASEURL,
    projectId:process.env.FIREBASE_PROJECTID,
    storageBucket:process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGINGSENDERID,
    appId:process.env.FIREBASE_APPID,
    measurementId:process.env.FIREBASE_MEASUREMENTID
};

// var firebaseConfig = {
//     apiKey: "AIzaSyD9y1z_oJp51AkRBYtOQRc79230NiY9g5A",
//     authDomain: "booksnow-ba5cb.firebaseapp.com",
//     databaseURL: "https://booksnow-ba5cb.firebaseio.com",
//     projectId: "booksnow-ba5cb",
//     storageBucket: "booksnow-ba5cb.appspot.com",
//     messagingSenderId: "729115736652",
//     appId: "1:729115736652:web:5251984924f179d0f612e9",
//     measurementId: "G-SVPZ6173DT"
// };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default};

// const book = {
//     title: 'Nepal Ko Saral Itihas',
//     price: 850,
//     description: 'A Easy History of Nepal by Dr. Bambahadur Adhikari.',
//     ratings: 8.5
// };

// const book2 = {
//     title: 'Chin ra Japan Ko Itihas',
//     price: 395,
//     description: 'History of China and Japan by Shreeram Upadhyaya. This book will be helpful to history students or general readers.',
//     ratings: 7.5
// };

// const book3 = {
//     title: 'The Past as Present',
//     price: 952,
//     description: 'Many popularly held views about the past need to be critically inquired into before they can be taken as historical.',
//     ratings: 6.5
// };


// const user = {
//     username: 'Mikal',
//     email: 'Mikal45@gmail.com',
//     role: 'USER',
//     password: 'abcdefgh'
// };
    
//     database.ref('users').push(user).then(() => {
//         console.log('User database updated.');
//     }).catch((e) => {
//         console.log(e);
//     });
//To add books-history of users.
// const userbooksHistory = {
//         purchasedBook: {book_id: 'a5sd4sdass5d12asd1', price: 1500},
//         toPurchaseBook: {book_id2: 'a5sd4s5d12asd1', price: 250}
// };

// database.ref(`users/-M4Kra99_9bqQS8SSIxd/books/purchased`).child(`${userbooksHistory.purchasedBook.book_id}`).
// set({price: userbooksHistory.purchasedBook.price}).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });

// database.ref(`users/-M4Kra99_9bqQS8SSIxd/books/topurchase`).child(`${userbooksHistory.toPurchaseBook.book_id2}`).
// set({price: userbooksHistory.toPurchaseBook.price}).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });


//To add comments as arrays in the child comments property of book. 
// const newComment = {
//     user_id: 'ASDE545ss5KNSKNDd5sd4d5ssds2d',
//     comment: 'A book.'
// };

// database.ref(`books/-M4Kra8iM6_EAF1WmL1a/comments/`).child(`${newComment.user_id}`).
// set({comment: newComment.comment}).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });


// database.ref('books').push(book).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });

// database.ref('books').push(book2).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });

// database.ref('books').push(book3).then(() => {
//     console.log('Book database updated.');
// }).catch((e) => {
//     console.log(e);
// });


// database.ref(`users/-M5614teBBL2ObWWHoSR/purchases`).push({book_id: 'BBL2WWHoSR',
//                                                             book_price: '550'}).then(() => {
//     console.log('User database updated.');
// }).catch((e) => {
//     console.log(e);
// });

// database.ref(`users/-M5614teBBL2ObWWHoSR/purchases`).push({book_id: 'BKL2WWHoSR',
//                                                             book_price: '350'}).then(() => {
//     console.log('User database updated.');
// }).catch((e) => {
//     console.log(e);
// });

// database.ref(`users/-M4Kra99_9bqQS8SSIxd`).once('value').then((snapshot) => {
//     console.log(snapshot.key,snapshot.val());
// });

// database.ref('users').once('value').then((snapshot) => {
//     const data = {username: "Userq", password: "1234567890"};
//     for(const singleUser in snapshot.val()){
//         const user = {...snapshot.val()[singleUser]};
//         if(user.username === data.username){
//             if(user.password === data.password){
//                 return console.log(user);
//             }
//         }
//     }
// });