import popWindow from './popModal';
import fetchAllLikes from './responseLikes';
import postAllLikes from './postAllLike';

const displayBokomons = async (pokemon) => {
  pokemon.forEach((poke) => {
    fetch(poke.url)
      .then((response) => response.json())
      .then(async (pokeData) => {
        const cardViewSection = document.getElementById('card-view');
        const pokesTypes = pokeData.types;
        const pokemonsImage = pokeData.sprites.other;

        const externalList = document.createElement('li');
        externalList.classList.add('cardSection');

        const pokesImage = document.createElement('img');
        pokesImage.setAttribute('src', `${pokemonsImage['official-artwork'].front_default}`);
        pokesImage.setAttribute('alt', 'Pokemon');

        const header1 = document.createElement('h1');
        header1.innerHTML = `${pokeData.name}`;

        const likeSect = document.createElement('div');
        likeSect.className = 'likes-div';

        const likeImage = document.createElement('i');
        likeImage.classList.add('fas', 'fa-heart', 'heart');
        likeImage.setAttribute('id', `${pokeData.name}`);

        const spanEle = document.createElement('span');
        spanEle.setAttribute('id', 'like');

        const ul = document.createElement('ul');
        ul.classList.add('unordered')
        pokesTypes.forEach((pokemon) => {
          ul.innerHTML += `<li class="pokesType">${pokemon.type.name}</li>`;
        });

        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('type', 'button');
        commentBtn.classList.add(pokeData.name, 'btn');
        commentBtn.innerHTML = 'Comment';
        commentBtn.addEventListener('click', () => {
          popWindow(pokeData);
        });

        externalList.appendChild(pokesImage);
        externalList.appendChild(header1);
        likeSect.appendChild(likeImage);
        likeSect.appendChild(spanEle);
        externalList.appendChild(likeSect);
        externalList.appendChild(ul);
        externalList.appendChild(commentBtn);

        cardViewSection.appendChild(externalList);

        await fetchAllLikes(pokeData, spanEle);

        likeImage.addEventListener('click', async () => {
          await postAllLikes(likeImage.id);
          await fetchAllLikes(pokeData, spanEle);
        });
      });
  });
};

export default displayBokomons;