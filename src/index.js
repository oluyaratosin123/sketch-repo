import fetchApiData from './API/responseAPI';
import displayPokemon from './Display/displayBokomons';
import counter from './Display/counter';

const pokemonTitle = document.getElementById('bokomonTitle');
window.addEventListener('load', async () => {
  const res = await fetchApiData();
  pokemonTitle.innerHTML = `Bokomon(${counter(res.results)})`;
  await displayPokemon(res.results);
});