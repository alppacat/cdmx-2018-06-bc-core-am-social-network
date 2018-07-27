// window.onload = () => {
//   firebase.database().ref('posts')
//     .on('child_added', (newPost) => {
//       document.getElementById('new-posts').innerHTML += `
//       <div class="postCard">
//         <p class="postName">${newPost.val().creatorName}</p>
//         <hr>
//         <p>${newPost.val().text}</p>
//         <hr>
//         <button class="btn btn-info btn-sm">
//           <span class="glyphicon glyphicon-trash"></span>
//           Borrar
//         </button>
//       </div>
//     `;
//     });
// };
const postEntry = document.getElementById('post-entry');
const sharePost = document.getElementById('new-post');
const postList = document.getElementById('new-posts');
let refPost;

const init = () => {
  // sharePost.addEventListener('click', sendPostToFirebase);
  refPost = firebase.database().ref().child('posts');
  getPostOfFirebase();
};

const createNewPostElement = (postString, creatorString) => {
  // console.log('holi create');
  // Crea los elementos que aparecen en el DOM
  const listItem = document.createElement('div');
  const author = document.createElement('p');
  const paragraph = document.createElement('p');
  const editArea = document.createElement('textarea');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // Asigna clase a la area de texto para editar
  listItem.className = 'postCard';
  editArea.className = 'hide';
  author.className = 'postName'; // Quitar camel case

  // Asignación de texto y clase a botones
  editButton.innerHTML = '<span class="glyphicon glyphicon-pencil"></span> Editar';
  editButton.className = 'edit';
  deleteButton.innerHTML = '<span class="glyphicon glyphicon-trash"></span> Borrar';
  deleteButton.className = 'delete';
  author.innerHTML = `${creatorString} <hr>`;
  paragraph.innerHTML = postString;

  // Añadiendo elementos al DOM
  listItem.appendChild(author);
  listItem.appendChild(paragraph);
  listItem.appendChild(editArea);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // console.log(listItem);
  return listItem;
};

const addPost = (key, postCollection) => {
  // console.log('holi addPost');
  // console.log(postCollection.text, postCollection.creatorName);
  const listItem = createNewPostElement(postCollection.text, postCollection.creatorName);
  // console.log(listItem);
  listItem.setAttribute('data-keypost', key);
  postList.appendChild(listItem);
  bindPostEvents(listItem);
};

const bindPostEvents = (postListItem) => {
  // console.log(postListItem);
  const editButton = postListItem.querySelector('button.edit');
  const deleteButton = postListItem.querySelector('button.delete');

  deleteButton.addEventListener('click', deletePost);
};

const deletePost = () => {
  // console.log(event.target.parentNode);
  // console.log(event.target.parentNode.dataset.keypost);
  const keyListItem = event.target.parentNode.dataset.keypost;
  const refPostToDelete = refPost.child(keyListItem);
  // const refUID = refPost.child(keyListItem).child(creator);
  // console.log(refUID);
  refPostToDelete.remove();
};

const getPostOfFirebase = () => {
  // console.log('holi');
  refPost.on('value', (snapshot) => {
    postList.innerHTML = '';
    const dataPost = snapshot.val();
    console.log(dataPost);
    for (let key in dataPost) {
      // console.log(dataPost[key]);
      addPost(key, dataPost[key]);
    }
  });
};

window.onload = init;

