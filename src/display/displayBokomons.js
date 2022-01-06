import fetchAllLikes from './responseLike';

const displayPokemon = async (pokemon) => {
  pokemon.forEach((pokes) => {
    fetch(pokes.url)
      .then((response) => response.json())
      .then(async (pokesData) => {
        const cards = document.getElementById('card-view');
        const bokumonVarieties = pokesData.types;
        const bokumonsImgs = pokesData.sprites.other;
        const reservedList = document.createElement('li');
        reservedList.classList.add('card-items');
        const pokesImg = document.createElement('img');
        pokesImg.setAttribute(
          'src',
          `${bokumonsImgs['official-artwork'].front_default}`,
        );
        pokesImg.setAttribute('alt', 'pokemon');

        const hearder1 = document.createElement('h2');
        hearder1.textContent = `${pokesData.name}`;

        const likeSection = document.createElement('span');
        likeSection.classList = 'likeSect';

        const likeImg = document.createElement('i');
        likeImg.classList.add('fas', 'fa-heart', 'heart');
        likeImg.setAttribute('id', `${pokesData.name}`);

        const spanEle = document.createElement('div');
        spanEle.setAttribute('id', 'like');

        const listContainer = document.createElement('ul');

        bokumonVarieties.forEach((pokemon) => {
          listContainer.innerHTML += `<li> ${pokemon.type.name} </li>`;
        });
        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('type', 'button');
        commentBtn.classList.add(pokesData.name, 'btn');
        commentBtn.innerHTML = 'comment';
        commentBtn.addEventListener('click', () => {
          // This is for the comment modal...
        });
        reservedList.appendChild(pokesImg);
        hearder1.appendChild(likeSection);
        reservedList.appendChild(hearder1);
        likeSection.appendChild(likeImg);
        reservedList.appendChild(spanEle);

        // Append all uls'
        reservedList.appendChild(commentBtn);
        cards.appendChild(reservedList);
        await fetchAllLikes(pokesData, spanEle);
      });
  });
};
export default displayPokemon;
