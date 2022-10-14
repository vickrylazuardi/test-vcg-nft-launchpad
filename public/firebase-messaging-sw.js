importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-firestore.js');

const firebaseConfig = {
  apiKey: 'AIzaSyD8kbqvXZvlj0lbRohSIPJz0l6XPYCViQU',
  authDomain: 'vcg-ransverse.firebaseapp.com',
  projectId: 'vcg-ransverse',
  storageBucket: 'vcg-ransverse.appspot.com',
  messagingSenderId: '724426957400',
  appId: '1:724426957400:web:ef29d60f5ddb8e5360602d',
  measurementId: 'G-0ND8SBYGGC'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Both of them ain't working

//background notifications will be received here
messaging.setBackgroundMessageHandler(function (payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const {
    data: { body, title }
  } = payload;
  const notificationTitle = title;
  const notificationOptions = {
    body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage(function (payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const {
    data: { body, title }
  } = payload;
  const notificationTitle = title;
  const notificationOptions = {
    body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
