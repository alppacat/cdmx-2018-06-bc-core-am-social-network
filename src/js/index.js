(function() {
  // Get elements
  const txtEmail = document.getElementById('txt-email');
  const txtPassword = document.getElementById('txt-password');
  const btnLogin = document.getElementById('btn-login');
  const btnLoginGoogle = document.getElementById('btn-google');
  const btnLoginfacebook = document.getElementById('btn-facebook');
  let provider = new firebase.auth.GoogleAuthProvider();
  // Add login event with Google
  btnLoginGoogle.addEventListener('click', event => {
    // Sign in
    const promise = firebase.auth().signInWithRedirect(provider);
    promise.catch(event => alert(event.message));
  });
  
  btnLoginfacebook.addEventListener('click', event => {
    facebookLogin();
  });

  // Add login event
  btnLogin.addEventListener('click', event => {
    // Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(event => alert(event.message));
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) { 
      console.log(firebaseUser);
      window.location.assign('../src/views/home.html');
    }
  });
  const facebookLogin = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;    
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        console.log(errorCode);
        // ...
      });
  };
}());