import { commentCounter } from './counter';
import getAllComments from './getComments';
import postAllComments from './postAllComments';

const popWindow = (pokemon) => {
    const modalPop = document.createElement('article');
    modalPop.classList.add('modalPopUp');

    const modalContentList = document.createElement('div');
    modalContentList.classList.add('modal-pop-menu');

    const frameSocket = document.createElement('div');
    frameSocket.classList.add('image-frame');

    const modalClose = document.createElement('i');
    modalClose.classList.add('fas', 'fa-times', 'modalClose');
    modalClose.addEventListener('click', () => modalPop.remove());

    const modalSection = document.createElement('div');
    modalSection.classList.add('modal-frame');

    const imagingItem = document.createElement('img');
    imagingItem.setAttribute('src', pokemon.sprites.other['official-artwork'].front_default);
    imagingItem.setAttribute('alt', `${pokemon.name} official artwork`);
    imagingItem.classList.add('modal-image-sect');

    const pokesName = document.createElement('h2');
    pokesName.classList.add('pokes-name');
    pokesName.innerHTML = pokemon.name;

    const pokesType = document.createElement('h3');
    pokesType.innerHTML = 'Type';

    const typeListCard = document.createElement('ul');
    typeListCard.classList.add('type-list-cards');

    const firstListCard = document.createElement('li');
    firstListCard.innerHTML = pokemon.types[0].type.name;

    let secondListCard = document.createElement('li');
    if (pokemon.types.length === 2) {
        secondListCard.innerHTML = pokemon.types[1].type.name;
    } else {
        typeListCard.classList.add('centerCardItems');
        secondListCard = false;
    }

    const locationTitle = document.createElement('h4');
    locationTitle.innerHTML = 'Location';

    const location = document.createElement('p');
    fetch(pokemon.location_area_encounters)
    .then((response) => response.json())
    .then((locations) => {
        if (locations.length > 1) {
            location.innerHTML = locations[0].location_area.name || 'Evolution';
        } else {
            location.innerHTML = 'Evolution';
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
                ${pokesComment.creation_date}
                ${pokesComment.username} :
                ${pokesComment.comment}
                `;
                comments.appendChild(comment);
            }
            commentCounter(pokesComments, commentsTitle, comments);
        });
    };

    showAllComments();

    const addCommentTitle = document.createElement('h4');
    addCommentTitle.innerHTML = 'Add your comment...';

    const addComment = document.createElement('form');
    addComment.classList.add('add-some-comments');

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'name');
    inputName.setAttribute('placeholder', 'Your name...');
    inputName.setAttribute('id', 'name');

    const textAreaContent = document.createElement('textarea');
    textAreaContent.setAttribute('name', 'comment');
    textAreaContent.setAttribute('id', 'comment');
    textAreaContent.setAttribute('placeholder', 'Write your comments...');

    const message = document.createElement('small');
    message.classList.add('error');
    message.innerHTML = '';

    const submitionBtn = document.createElement('button');
    submitionBtn.setAttribute('type', 'button');
    submitionBtn.setAttribute('id', 'submit-Btn');
    submitionBtn.innerHTML = 'Comment';
    submitionBtn.addEventListener('click', () => {
      if (inputName.value.length < 1 || inputName.value.length > 8) {
          inputName.classList.add('danger');
          textAreaContent.classList.remove('danger');
          message.innerHTML = '*Your name should be part of a list between 1 and 8 characters*';
      } else if (textAreaContent.value.length < 5 || textAreaContent.value.length > 100) {
          inputName.classList.remove('danger');
          textAreaContent.classList.add('danger');
          message.innerHTML = 'Comment should have a list between 5 and 100 characters';
      } else {
          postAllComments(inputName.value, textAreaContent.value, pokemon.name)
          .then(() => (getAllComments(pokemon.name)).then(() => showAllComments()));
          inputName.classList.remove('danger');
          textAreaContent.classList.remove('danger');
          addComment.reset();
      }
    });

    modalSection.appendChild(imagingItem);

    frameSocket.appendChild(modalClose);
    frameSocket.appendChild(modalSection);

    typeListCard.appendChild(firstListCard)
    if (secondListCard) {
        typeListCard.appendChild(secondListCard);
    }

    addComment.appendChild(inputName);
    addComment.appendChild(textAreaContent);
    addComment.appendChild(message);
    addComment.appendChild(submitionBtn);


    modalContentList.appendChild(frameSocket);
    modalContentList.appendChild(pokesName);
    modalContentList.appendChild(pokesType);
    modalContentList.appendChild(typeListCard);
    modalContentList.appendChild(locationTitle);
    modalContentList.appendChild(location);
    modalContentList.appendChild(commentsTitle);
    modalContentList.appendChild(comments);
    modalContentList.appendChild(addCommentTitle);
    modalContentList.appendChild(addComment);

    modalPop.appendChild(modalContentList);

    document.body.appendChild(modalPop);
};

export default popWindow;
