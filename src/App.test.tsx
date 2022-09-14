import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { settings } from './store/data'
import App from './App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Игра Сапер/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render page according url', async () => {
    render(<App />);

    expect(screen.getByText(String(settings.junior.mines))).toBeInTheDocument();
    expect(screen.getAllByTestId(/game-cell/i)).toHaveLength(settings.junior.cols*settings.junior.rows);
    
    await userEvent.click(screen.getByText(/Новичок/i))
    expect(screen.getByText(String(settings.junior.mines))).toBeInTheDocument();
    expect(screen.getAllByTestId(/game-cell/i)).toHaveLength(settings.junior.cols*settings.junior.rows);

    await userEvent.click(screen.getByText(/Любитель/i))
    expect(screen.getByText(String(settings.amateur.mines))).toBeInTheDocument();
    expect(screen.getAllByTestId(/game-cell/i)).toHaveLength(settings.amateur.cols*settings.amateur.rows);

    await userEvent.click(screen.getByText(/Профессионал/i))
    expect(screen.getByText(String(settings.profi.mines))).toBeInTheDocument();
    expect(screen.getAllByTestId(/game-cell/i)).toHaveLength(settings.profi.cols*settings.profi.rows);

    await userEvent.click(screen.getByText(/Как играть/i))
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Правила игры');
});
