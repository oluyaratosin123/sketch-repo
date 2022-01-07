import fetchApiData from './API/responseApiData';
import displayBokomons from './Display/displayBokomons';
import { counter } from './Display/counter';

const pokeTitle = document.getElementById('bokomonTitle');
window.addEventListener('load', async () => {
  const res = await fetchApiData();
  pokeTitle.innerHTML = `Pokemon(${counter(res.results)})`;
  await displayBokomons(res.results);
});
