let appFirebase = {};
(function() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyA3Ge1u0csSTZWKqDdA2phxdNt8GdHOzXs',
    authDomain: 'refactoring-social-network.firebaseapp.com',
    databaseURL: 'https://refactoring-social-network.firebaseio.com',
    projectId: 'refactoring-social-network',
    storageBucket: 'refactoring-social-network.appspot.com',
    messagingSenderId: '1008705429522'
  };
  firebase.initializeApp(config);
  appFirebase = firebase;
}());