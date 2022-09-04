import { css } from "@emotion/react"


const useGameStyles = (cols: number) => {

  const field = css`
    display: grid;
    grid-template-columns: repeat(${cols}, 30px);
  `

  const cell = css`
    width: 30px;
    height: 30px;
    border: 1px solid gray;

    &:hover {
      cursor: pointer;
    }
  `

  return {
    field,
    cell
  }
}

export { useGameStyles }