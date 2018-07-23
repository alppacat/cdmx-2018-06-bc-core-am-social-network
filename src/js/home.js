(function() {
  // Get elements
  const btnLogout = document.getElementById('btn-logout');
  // Get a reference to the database service
  var database = firebase.database();

  // Add logout event
  btnLogout.addEventListener('click', event => {
    firebase.auth().signOut();
    window.location.assign('../index.html');
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    // if (firebaseUser) {
    console.log(firebaseUser);
    let user = firebase.auth().currentUser;
    if (user !== null) {
      // let emailId = user.email;
      user.updateProfile({
        displayName: user.displayName
      });
      document.getElementById('user-paragraph').innerHTML = `Bienvenidx ${user.displayName}`;
    } else {
      console.log('not logged in');
    }
    userConect = database.ref('data');
    agregarUser(user.uid, user.displayName, user.email);
  });
  function agregarUser(uid, name, email) {
    var conectados = userConect.push({
      uid: uid,
      name: name,
      email: email
    });
  }

  const postText = document.getElementById('post-entry'); // Texto de entrada
  const btnShare = document.getElementById('new-post'); // Boton de compartir
  

  btnShare.addEventListener('click', event => { // Evento para mandar el texto dee entrada a la database
    const currentUser = firebase.auth().currentUser;
    let textInPost = postText.value;
    const newPostKey = firebase.database().ref().child('posts').push().key;
    firebase.database().ref(`posts/${newPostKey}`).set({
      creator: currentUser.uid,
      creatorName: currentUser.displayName,
      text: textInPost
    });
  });
}());