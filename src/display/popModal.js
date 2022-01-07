import { commentCounter } from './counter';
import getAllComments from './getAllComments';
import postAllComments from './postAllComments';

const popWindow = (pokemon) => {
  const modalPop = document.createElement('article');
  modalPop.classList.add('modalPopUp');

  const modalContentView = document.createElement('div');
  modalContentView.classList.add('modal-pop-menu');

  const imageFrame = document.createElement('div');
  imageFrame.classList.add('image-frame');

  const modalClose = document.createElement('i');
  modalClose.classList.add('fas', 'fa-times', 'modalClose');
  modalClose.addEventListener('click', () => modalPop.remove());

  const internalFrame = document.createElement('div');
  internalFrame.classList.add('modal-image-sect');

  const images = document.createElement('img');
  images.setAttribute('src', pokemon.sprites.other['official-artwork'].front_default);
  images.setAttribute('alt', `${pokemon.name} official artwork`);
  images.classList.add('modal-frame');

  const pokesName = document.createElement('h3');
  pokesName.classList.add('pokes-name');
  pokesName.innerHTML = pokemon.name;

  const pokesType = document.createElement('h4');
  pokesType.innerHTML = 'Type';

  const listOfType = document.createElement('ul');
  listOfType.classList.add('type-list-cards');

  const listType1 = document.createElement('li');
  listType1.innerHTML = pokemon.types[0].type.name;

  let listType2 = document.createElement('li');
  if (pokemon.types.length === 2) {
    listType2.innerHTML = pokemon.types[1].type.name;
  } else {
    listOfType.classList.add('justify');
    listType2 = false;
  }

  const locationTitleName = document.createElement('h4');
  locationTitleName.innerHTML = 'Location';

  const locationContentType = document.createElement('p');
  fetch(pokemon.location_area_encounters)
    .then((response) => response.json())
    .then((locations) => {
      if (locations.length > 1) {
        location.innerHTML = locations[0].location_area.name || 'Evolution';
      } else {
        locationContentType.innerHTML = 'Evolution';
      }
    });

  const commentsTitle = document.createElement('h4');
  commentsTitle.innerHTML = 'Comments';

  const comments = document.createElement('ul');
  comments.classList.add('comments');

  const showAllComments = () => {
    comments.innerHTML = '';
    getAllComments(pokemon.name).then((pokesComments) => {
      for (let i = 0; i < pokesComments.length; i += 1) {
        const comment = document.createElement('li');
        const pokesComment = pokesComments[i];
        comment.innerHTML = `
        <div class="viewComments">
          <h5 class="dateCreated"> ${pokesComment.creation_date} </h5> 
          <ul class="commentContents"> 
          <li class="viewName"> ${pokesComment.username} : </li>
          <li class="commentDetails">${pokesComment.comment}</li> 
          </ul>
        </div>
          `;
        comments.appendChild(comment);
      }
      commentCounter(pokesComments, commentsTitle, comments);
    });
  };

  showAllComments();

  const addCommentTitle = document.createElement('h4');
  addCommentTitle.innerHTML = 'Add a comment';

  const addComment = document.createElement('form');
  addComment.classList.add('add-some-comments');

  const inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'name');
  inputName.setAttribute('placeholder', 'Your name');
  inputName.setAttribute('id', 'name');

  const textArea = document.createElement('textarea');
  textArea.setAttribute('name', 'comment');
  textArea.setAttribute('id', 'comment');
  textArea.setAttribute('placeholder', 'Your Comment');

  const messages = document.createElement('small');
  messages.classList.add('error');
  messages.innerHTML = '';

  const submitionBtn = document.createElement('button');
  submitionBtn.setAttribute('type', 'button');
  submitionBtn.setAttribute('id', 'submit-btn');
  submitionBtn.innerHTML = 'Comment';
  submitionBtn.classList.add('newComment');
  submitionBtn.addEventListener('click', () => {
    if (inputName.value.length < 1 || inputName.value.length > 8) {
      inputName.classList.add('danger');
      textArea.classList.remove('danger');
      messages.innerHTML = '*Your name should at least have a list between 8 and 10 characters*';
    } else if (textArea.value.length < 5 || textArea.value.length > 100) {
      inputName.classList.remove('danger');
      textArea.classList.add('danger');
      messages.innerHTML = 'Your comment should have a list between 10 and 100 cha';
    } else {
      postAllComments(inputName.value, textArea.value, pokemon.name)
        .then(() => (getAllComments(pokemon.name)).then(() => showAllComments()));
        inputName.classList.remove('danger');
      textArea.classList.remove('danger');
      addComment.reset();
    }
  });

  internalFrame.appendChild(images);

  imageFrame.appendChild(modalClose);
  imageFrame.appendChild(internalFrame);

  listOfType.appendChild(listType1);
  if (listType2) {
    listOfType.appendChild(listType2);
  }

  addComment.appendChild(inputName);
  addComment.appendChild(textArea);
  addComment.appendChild(messages);
  addComment.appendChild(submitionBtn);

  modalContentView.appendChild(imageFrame);
  modalContentView.appendChild(pokesName);
  modalContentView.appendChild(pokesType);
  modalContentView.appendChild(listOfType);
  modalContentView.appendChild(locationTitleName);
  modalContentView.appendChild(locationContentType);
  modalContentView.appendChild(commentsTitle);
  modalContentView.appendChild(comments);
  modalContentView.appendChild(addCommentTitle);
  modalContentView.appendChild(addComment);

  modalPop.appendChild(modalContentView);

  document.body.appendChild(modalPop);
};

export default popWindow;