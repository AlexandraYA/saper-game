import { css } from "@emotion/react"


const useGameStyles = (cols: number) => {

  const fieldF = cols * 30 + 4 + cols - 1

  const field = css`
    display: grid;
    grid-template-columns: repeat(${cols}, 30px);
    grid-template-rows: 30px;
    box-sizing: border-box;
    width: ${fieldF}px;
    gap: 1px;
    border: 2px solid #b3a588;
  `

  const fieldHeader = css`
    display: flex;
    justify-content: space-between;
    width: ${fieldF}px;
    padding: 5px;
    border: 4px solid #b3a588;
    border-bottom: 1px solid #b3a588;
    background-color: #f3e2be;
    outline-offset: -2px;
    outline: 3px solid #f5eddb;
    font-size: 20px;
    line-height: 24px;

    & img {
      width: 28px;
      height: 28px;
      vertical-align: bottom;
    }

    & > div:first-child > span {
      margin-left: 5px;
    }

    & > div:last-child > span {
      margin-right: 5px;
    }
  `

  const cell = css`
    text-align: center;
    line-height: 30px;
    width: 30px;
    height: 30px;
    outline: 1px solid #b3a588;
    background-color: #edd197;

    &.close {
      border-right: 5px solid #b3a588;
      border-top: 5px solid #f3e2be;
      border-left: 5px solid #f3e2be;
      border-bottom: 5px solid #b3a588;
    }

    &:hover {
      cursor: pointer;
    }
  `

  return {
    field,
    fieldHeader,
    cell
  }
}

export { useGameStyles }