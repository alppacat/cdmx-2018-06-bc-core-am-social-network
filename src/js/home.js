// Get a reference to the database service
let database = firebase.database();

firebase.auth().onAuthStateChanged(firebaseUser => {
  // if (firebaseUser) {
  console.log(firebaseUser);
  let user = firebase.auth().currentUser;
  if (user !== null) {
    // let emailId = user.email;
    user.updateProfile({
      displayName: user.displayName
    });
    document.getElementById('welcome').innerHTML = `Bienvenid@ ${user.displayName} <span class="caret"></span>`;
    document.getElementById('user-name').innerHTML = `${user.displayName}`;
    const userPhoto = user.photoURL;
    if (userPhoto) {
      document.getElementById('profile-image').innerHTML = `<img src="${user.photoURL}" id="avatar">`;
      console.log(document.getElementById('profile-image'));
      // document.getElementById('avatar').innerHTML = `<img src="${user.photoURL}" class="avatar">`;
    } else {
      document.getElementById('profile-image').innerHTML = `<img src="${'../images/placeholder-user.png'}" id="avatar">`;
    }
    document.getElementById('user-email').innerHTML = `${user.email}`;
    console.log(user.photoURL);
  } else {
    console.log('not logged in');
  }
  let id = user.uid;
  userConect = database.ref('users/' + id);
  addUser(user.displayName, user.email, user.photoURL);
});

addUser = (name, email, photo) => {
  let conect = userConect.push({
    name: name,
    email: email,
    photo: photo
  });
};

const postText = document.getElementById('post-entry');
const btnShare = document.getElementById('new-post');

btnShare.addEventListener('click', event => {
  const currentUser = firebase.auth().currentUser;
  const textInPost = postText.value;
  if (textInPost.trim() === '') {
    alert('No ingresaste texto');
    console.log('vacio');
  } else {
    console.log('texto');
    postText.value = '';
    // Create a unique key for messages collection
    const newPostKey = firebase.database().ref().child('posts').push().key;
    console.log(newPostKey);
    const date = (new Date).getTime();
    console.log(date);
        
    firebase.database().ref(`posts/${newPostKey}`).set({
      creator: currentUser.uid,
      creatorName: currentUser.displayName,
      text: textInPost,
      likes: 0,
      postDate: date
    });
  };
});
// LOG-OUT FUNCTION

// Get elements
const btnLogout = document.getElementById('button-logout');

// Add logout event
btnLogout.addEventListener('click', event => {
  console.log('entro');
  firebase.auth().signOut();
  window.location.assign('../index.html');
});

