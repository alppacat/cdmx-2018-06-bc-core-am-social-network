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

const createNewPostElement = (postString) => {
  // console.log('holi create');
  // Crea los elementos que aparecen en el DOM
  const listItem = document.createElement('div');
  const paragraph = document.createElement('p');
  const editArea = document.createElement('textarea');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  editArea.className = 'hide';

  // Asignación de texto y clase a botones
  editButton.innerHTML = '<span class="glyphicon glyphicon-pencil"></span> Editar';
  editButton.className = 'edit';
  deleteButton.innerHTML = '<span class="glyphicon glyphicon-trash"></span> Borrar';
  deleteButton.className = 'delete';
  paragraph.innerHTML = postString;

  // Añadiendo elementos al DOM
  listItem.appendChild(paragraph);
  listItem.appendChild(editArea);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // console.log(listItem);
  return listItem;
};

const addPost = (key, postCollection) => {
  // console.log('holi addPost');
  // console.log(postCollection.text)
  const listItem = createNewPostElement(postCollection.text);
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
  // console.log(event.target.parentNode.dataset.keypost);
  const keyListItem = event.target.parentNode.dataset.keypost;
  const refPostToDelete = refPost.child(keyListItem);
  console.log(refPostToDelete);
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

