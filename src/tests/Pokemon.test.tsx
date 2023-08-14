import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType).toHaveTextContent('Electric');

  const weight = screen.getByText(/average weight: 6\.0 kg/i);
  expect(weight).toBeInTheDocument();

  const detailsLink = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute('href', '/pokemon/25');

  const image = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa se existe um ícone de estrela nos Pokémon favoritados', async () => {
  const { user } = renderWithRouter(<App />);

  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  await user.click(moreDetails);

  const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
  await user.click(favoritePokemon);

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  await user.click(homeLink);

  const favoriteImg = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(favoriteImg).toBeInTheDocument();
});
