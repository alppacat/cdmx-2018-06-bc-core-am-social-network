// PRINT POST SECTION

const postEntry = document.getElementById('post-entry');
const sharePost = document.getElementById('new-post');
const postList = document.getElementById('new-posts');
let refPost;
const init = () => {
  refPost = firebase.database().ref().child('posts');
  getPostOfFirebase();
};

const createNewPostElement = (postString, creatorString, showLikes, datePost) => {
  // Crea los elementos que aparecen en el DOM
  const listItem = document.createElement('div');
  const author = document.createElement('p');
  const date = document.createElement('p');
  const paragraph = document.createElement('p');
  const editArea = document.createElement('textarea');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const likesButton = document.createElement('button');
  const numberLikes = document.createElement('p');
  const time = datePost; // Get the time in miliseconds from post data
  const timeToDate = new Date(time).toUTCString(); // Convert the time to string in format UTC

  // Asigna clase a la area de texto para editar
  listItem.className = 'postCard';
  editArea.className = 'hide'; // Hide
  author.className = 'postName'; // Quitar camel case
  paragraph.className = 'editMode';
  date.className = 'dateString';

  // Asignación de texto y clase a botones
  editButton.innerHTML = '<span class="glyphicon glyphicon-pencil"></span> Editar';
  editButton.className = 'edit';
  deleteButton.innerHTML = '<span class="glyphicon glyphicon-trash"></span> Borrar';
  deleteButton.className = 'delete';
  likesButton.innerHTML = '<span class="glyphicon glyphicon-heart"></span> Me gusta';
  likesButton.className = 'likes';
  numberLikes.className = 'number-likes';
  numberLikes.innerHTML = showLikes;
  author.innerHTML = `<span class="glyphicon glyphicon-user"></span> ${creatorString}`;
  paragraph.innerHTML = postString;
  date.innerHTML = `${timeToDate} <hr>`;

  // Añadiendo elementos al DOM
  listItem.appendChild(author);
  listItem.appendChild(date);
  listItem.appendChild(paragraph);
  listItem.appendChild(editArea);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(likesButton);
  listItem.appendChild(numberLikes);
  return listItem;
};

const addPost = (key, postCollection) => {
  const listItem = createNewPostElement(postCollection.text, postCollection.creatorName, postCollection.likes, postCollection.postDate);
  listItem.setAttribute('data-keypost', key);
  postList.insertBefore(listItem, postList.childNodes[0]);
  bindPostEvents(listItem);
};

const bindPostEvents = (postListItem) => {
  const editButton = postListItem.querySelector('button.edit');
  const deleteButton = postListItem.querySelector('button.delete');
  const likesButton = postListItem.querySelector('button.likes');
  likesButton.addEventListener('click', likeCounter);
  deleteButton.addEventListener('click', deletePost);
  editButton.addEventListener('click', editPost);
};

const editPost = () => {
  const listItem = event.target.parentNode;
  let originTxt = listItem.querySelector('textarea');
  const keyListItem = event.target.parentNode.dataset.keypost;
  const areaEdit = listItem.querySelector('p[class= editMode]');
  const editButton = event.target;
  const containsClass = listItem.classList.contains('editMode');

  const refPostToEdit = refPost.child(keyListItem);
  
  refPostToEdit.once('value', (snapshot)=>{
    const dataPost = snapshot.val();
    if (containsClass) {
      refPostToEdit.update({
        text: originTxt.value
      });  
      editButton.innerHTML = '<span class="glyphicon glyphicon-pencil"></span> Editar';
      originTxt.classList.add('hide');

      areaEdit.value = '';
      areaEdit.innerHTML = originTxt.value;
    
      listItem.classList.remove('editMode');
    } else {
      editButton.innerHTML = '<span class="glyphicon glyphicon-floppy-disk"></span> Guardar';
      originTxt.value = dataPost.text;
      
      originTxt.classList.remove('hide');
      listItem.classList.add('editMode');
    }
  });
};


const deletePost = () => {
  const accept = confirm('¿Quieres borrar este post?');
  if (accept === true) {
    const keyListItem = event.target.parentNode.dataset.keypost;
    const refPostToDelete = refPost.child(keyListItem);
    refPostToDelete.remove();
  };
};

const likeCounter = () => {
  let totalLikes;
  const listItem = event.target.parentNode;
  let newLikes = listItem.querySelector('p[class=number-likes]');
  const keyListItem = event.target.parentNode.dataset.keypost;

  const refPostToLike = refPost.child(keyListItem);
  
  refPostToLike.once('value', (snapshot) => {
    const dataPost = snapshot.val();
    totalLikes = dataPost.likes;
    refPostToLike.update({
      likes: totalLikes + 1
    });
    newLikes.value = dataPost.likes;
  });
};

const getPostOfFirebase = () => {
  refPost.on('value', (snapshot) => {
    postList.innerHTML = '';
    const dataPost = snapshot.val();
    for (let key in dataPost) {
      addPost(key, dataPost[key]);  
    }
  });
};


window.onload = init;