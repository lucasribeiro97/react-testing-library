import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);

  const pokemonHeading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
  expect(pokemonHeading).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
  const { user } = renderWithRouter(<App />);

  const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
  expect(nextPokemonButton).toBeInTheDocument();

  const fireButton = screen.getByRole('button', { name: /fire/i });
  await user.click(fireButton);
  const charmander = screen.getByText(/charmander/i);
  await user.click(nextPokemonButton);
  const rapidash = screen.getByText(/rapidash/i);
  expect(rapidash).toBeInTheDocument();
  await user.click(nextPokemonButton);
  expect(charmander).toBeInTheDocument();
});

test('Testa se é mostrado apenas um Pokémon por vez', async () => {
  const { user } = renderWithRouter(<App />);

  const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
  expect(nextPokemonButton).toBeInTheDocument();

  const pikachu = screen.queryByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  await user.click(nextPokemonButton);
  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
});

test('Testa se a Pokédex tem os botões de filtro', async () => {
  const { user } = renderWithRouter(<App />);

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  typeButtons.forEach((button) => expect(button).toBeInTheDocument());

  const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
  expect(nextPokemonButton).toBeInTheDocument();

  const bugButton = screen.getByRole('button', { name: /bug/i });
  const fireButton = screen.getByRole('button', { name: /fire/i });

  await user.click(bugButton);
  const bugText = screen.getAllByText(/bug/i);
  expect(bugText).toHaveLength(2);
  expect(nextPokemonButton).toBeDisabled();

  await user.click(fireButton);
  const fireText = screen.getAllByText(/fire/i);
  expect(fireText).toHaveLength(2);
  const allButton = screen.getByRole('button', { name: /all/i });
  expect(allButton).toBeEnabled();
});

test('Testa se a Pokédex contém um botão para resetar o filtro', async () => {
  const { user } = renderWithRouter(<App />);

  expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();

  const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
  await user.click(nextPokemonButton);
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();

  const allButton = screen.getByRole('button', { name: /all/i });
  expect(allButton).toHaveTextContent(/all/i);
  expect(allButton).not.toHaveProperty('data-testid', 'pokemon-type-button');

  await user.click(allButton);
  expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
});

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
