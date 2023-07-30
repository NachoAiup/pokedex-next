export async function getPokemonList() {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
  ).then((res) => res.json());
  return data.results;
}

export async function getPokemonDescription(id: number) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((res) => res.json());

  return pokemon.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ");
}

export function getPokemonSpriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

let pokemonList: FavPokemon[] = [];

export async function setPokemonFav(id: number) {
  let pokemonFav = pokemonList.filter((x) => x.id === id).length;
  if (pokemonFav) {
    pokemonList = pokemonList.map((pokemon) => {
      if (pokemon.id === id) {
        return { id, fav: !pokemon.fav };
      } else {
        return pokemon;
      }
    });
  } else pokemonList.push({ id, fav: true });
  return;
}

export async function isPokemonFav(id: number) {
  let pokemonFav = pokemonList.filter((x) => x.id === id);
  return pokemonFav[0]?.fav || false;
}
