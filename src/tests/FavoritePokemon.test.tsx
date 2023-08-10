import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

const favoritePokemonList = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
}];

test('verifica se a mensagem "No favorite Pokémon found" é exibida quando não há Pokémon favoritado', () => {
  renderWithRouter(<FavoritePokemon />);

  const noFavoriteMessage = screen.getByText(/No favorite Pokémon found/i);
  expect(noFavoriteMessage).toBeInTheDocument();
});

test('verifica se apenas os Pokémon favoritados são exibidos', () => {
  renderWithRouter(<FavoritePokemon pokemonList={ favoritePokemonList } />);

  favoritePokemonList.forEach((pokemon) => {
    const pokemonName = screen.getByText(pokemon.name, { exact: false });
    expect(pokemonName).toBeInTheDocument();
  });

  const notFavoritePokemon = screen.queryByTestId('not-favorite-pokemon');
  expect(notFavoritePokemon).not.toBeInTheDocument();
});
