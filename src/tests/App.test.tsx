import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', async () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const aboutLink = screen.getByRole('link', { name: /About/i });
  const favPokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favPokemonLink).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
  const { user } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();

  await user.click(homeLink);
  expect(window.location.pathname).toBe('/');
});

test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
  const { user } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();

  await user.click(aboutLink);
  expect(window.location.pathname).toBe('/about');
});

test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
  const { user } = renderWithRouter(<App />);

  const favPokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
  expect(favPokemonLink).toBeInTheDocument();

  await user.click(favPokemonLink);
  expect(window.location.pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  renderWithRouter(<App />, { route: '/unknown' });

  const notFoundTitle = screen.getByRole(
    'heading',
    { name: 'Page requested not found' },
  );
  expect(notFoundTitle).toBeInTheDocument();
});
