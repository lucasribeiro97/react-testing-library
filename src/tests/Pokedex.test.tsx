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
