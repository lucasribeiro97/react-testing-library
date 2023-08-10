import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const notFoundHeading = screen.getByRole('heading', { name: /Page requested not found/i });

  expect(notFoundHeading).toBeInTheDocument();
});

test('Teste se a página mostra a imagem com o texto alternativo https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  renderWithRouter(<NotFound />);

  const notFoundImage = screen.getByAltText(
    "Clefairy pushing buttons randomly with text I have no idea what i'm doing",
  );
  expect(notFoundImage).toBeInTheDocument();
  expect(notFoundImage).toHaveAttribute(
    'src',
    '/404.gif',
  );
});
