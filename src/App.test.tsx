import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { settings, mineIndicator, emptyIndicator } from './store/data'
import App from './App';
import saperStore from './store/store'


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Игра Сапер/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders page according url', async () => {
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


const getCellCoords = (cellIndicator: number): {x: number, y: number} => {
  let cellCoords = {x: 0, y: 0};

  for (let x = 0; x < settings.junior.rows; x++ ) {
    for (let y = 0; y < settings.junior.cols; y++ ) {
      if (saperStore.field[x][y].indicator === cellIndicator) {
        cellCoords = {x, y};
        break;
      }
    }
  }

  return cellCoords
}

const checkIfCellExist = (cell: {x: number, y: number}) => {
  return cell.x > 0 && cell.x < saperStore.field.length 
          && cell.y > 0 && cell.y < saperStore.field[0].length
}

const checkNearestCells = (cell: {x: number, y: number}) => {
  let cellFound = {x: 0, y: 0};
  let ifExist: boolean = false;
  let coords = [
    {
      x: cell.x - 1,
      y: cell.y
    },
    {
      x: cell.x,
      y: cell.y - 1
    },
    {
      x: cell.x + 1,
      y: cell.y
    },
    {
      x: cell.x,
      y: cell.y + 1
    }
  ]

  for (let i = 0; i < coords.length; i++) {
    if (checkIfCellExist(coords[i]) 
          && saperStore.field[coords[i].x][coords[i].y].indicator === 1) {

            ifExist = true
            cellFound = coords[i]
    }
  }

  return {ifExist, cellFound}
}

const getEmptyCellCoords = () => {
  let cellEmpty = {x: 0, y: 0};
  let cellNumber = {x: 0, y: 0};

  for (let x = 0; x < settings.junior.rows; x++ ) {
    for (let y = 0; y < settings.junior.cols; y++ ) {
      if (saperStore.field[x][y].indicator === emptyIndicator) {
        cellEmpty = {x, y};

        const {ifExist, cellFound} = checkNearestCells(cellEmpty)
        
        if (ifExist) {
          cellNumber = cellFound
          break;
        }
      }
    }
  }

  return {
    empty: cellEmpty,
    number: cellNumber
  }
}

describe('tests user interaction with field', () => {
  test('tests click on mine cell', async () => {
    render(<App />);
  
    await userEvent.click(screen.getByText(/Новичок/i));
    expect(saperStore.field).toHaveLength(settings.junior.cols);
    expect(saperStore.field[0]).toHaveLength(settings.junior.rows);
  
    const mineCellCoords = getCellCoords(mineIndicator);
    const mineInd = settings.junior.cols * mineCellCoords.x + mineCellCoords.y;
    await userEvent.click(screen.getAllByTestId(/game-cell/i)[mineInd]);    
        
    expect(screen.getAllByAltText('mine')).toHaveLength(settings.junior.mines);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  

  test('tests click on cell near mine', async () => {
    render(<App />);
  
    await userEvent.click(screen.getByText(/Новичок/i));

    const nearMineCellCoords = getCellCoords(1);
    const nearMineInd = settings.junior.cols * nearMineCellCoords.x + nearMineCellCoords.y;
    const cell = screen.getAllByTestId(/game-cell/i)[nearMineInd];

    await userEvent.click(cell);
    expect(cell).toHaveTextContent("1");
  });


  test('tests click on empty cell', async () => {
    render(<App />);
  
    await userEvent.click(screen.getByText(/Новичок/i));

    const coords = getEmptyCellCoords();
    const emptyCellInd = settings.junior.cols * coords.empty.x + coords.empty.y;
    const numberCellInd = settings.junior.cols * coords.number.x + coords.number.y;

    await userEvent.click(screen.getAllByTestId(/game-cell/i)[emptyCellInd]);
    expect(screen.getAllByTestId(/game-cell/i)[numberCellInd]).toHaveTextContent("1");
  });
})


