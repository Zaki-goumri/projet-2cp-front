// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyC_Ah5R4xpbBBTzpmY9Iq-UXdjo24foUJI",
    authDomain: "projet-2cp-2e93d.firebaseapp.com",
    projectId: "projet-2cp-2e93d",
    storageBucket: "projet-2cp-2e93d.firebasestorage.app",
    messagingSenderId: "54333901956",
    appId: "1:54333901956:web:deba6d8fd777cc082b46d1",
    measurementId: "G-XTC3FJ0WKD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
 
  self.registration.showNotification(notificationTitle, notificationOptions);
});
