import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const descriptionHeading = screen.getByText(/What does this app do?/i);
  const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
  const secondParagraph = screen.getByText(/One can filter Pokémon by type/i);

  expect(descriptionHeading).toBeInTheDocument();
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);

  const aboutHeading = screen.getByRole('heading', { name: /About Pokédex/i });

  expect(aboutHeading).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<About />);

  const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
  const secondParagraph = screen.getByText(/One can filter Pokémon by type/i);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const pokedexImage = screen.getByAltText('Pokédex');
  const expectedImageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(pokedexImage).toBeInTheDocument();
  expect(pokedexImage).toHaveAttribute('src', expectedImageUrl);
});
