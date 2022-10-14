import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/remote-config';
import 'firebase/firestore';
import { firebaseConfig, vapidKey } from '../firebaseConfig';

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const createToken = async (walletdAddress) => {

  const messaging = firebase.messaging();

  const status = await Notification.requestPermission();
  if (status && status === 'granted') {
    //getting token from FCM
    const fcm_token = await messaging.getToken({
      vapidKey
    });
    if (fcm_token) {
      //setting FCM token in indexed db using local
      if (walletdAddress) {
        db.collection('wallets')
          .doc(walletdAddress)
          .set(
            {
              fcmToken: fcm_token,
              setDate: new Date(),
              transactions: []
            },
            { merge: true }
          )
          .then((docRef) => {
            if (docRef) {
              // console.log({ docRef });
            }
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
      //return the FCM token after saving it
      return fcm_token;
    }
  }
};
