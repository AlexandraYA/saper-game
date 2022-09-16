import { css } from "@emotion/react"
import FailIcon from '../../assets/img/disappointed.png'
import WinIcon from '../../assets/img/happy.png'


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
    margin-bottom: 50px;
  `

  const fieldHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${fieldF}px;
    height: 50px;
    padding: 5px;
    border: 4px solid #b3a588;
    border-bottom: 1px solid #b3a588;
    background-color: #f3e2be;
    outline-offset: -2px;
    outline: 3px solid #f5eddb;
    font-size: 20px;
    line-height: 24px;

    & img {
      width: 30px;
      height: 30px;
      vertical-align: bottom;
    }

    & > div:first-of-type > span {
      margin-left: 5px;
    }

    & > div:last-child > span {
      margin-right: 5px;
    }
  `

  const cell = css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 30px;
    height: 30px;
    outline: 1px solid #b3a588;
    background-color: #edd197;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
    }
  `

  const cellClose = css`
    border-right: 5px solid #b3a588;
    border-top: 5px solid #f3e2be;
    border-left: 5px solid #f3e2be;
    border-bottom: 5px solid #b3a588;
  `

  const btnRestart = css`
    width: 30px;
    height: 30px;
    border: none;
    box-shadow: 0 0 6px rgba(0,0,0,0.6);
    transition: all 0.3s ease;

    &.win {
      background: transparent url(${WinIcon}) 50% 50% / contain no-repeat;
    }

    &.fail {
      background: transparent url(${FailIcon}) 50% 50% / contain no-repeat;
    }

    &:hover {
      cursor: pointer;
    }

    &:active {
      cursor: pointer;
      box-shadow: none;
    }
  `

  const colorGreen = css`
    color: #4E047C;
  `

  const colorRed = css`
    color: #8B0054;
  `

  const colorPurple = css`
    color: #5A4A06;
  `

  const colorBrown = css`
    color: #21087F;
  `

  const colorPink = css`
    color: #463292;
  `

  const colorGray = css`
    color: #682B8F;
  `
  const colorOrange = css`
    color: #160C34;
  `
  const colorBlue = css`
    color: #7A0CBF;
  `

  return {
    field,
    fieldHeader,
    cell,
    cellClose,
    btnRestart,
    colorGreen,
    colorRed,
    colorPurple,
    colorBrown,
    colorGray,
    colorOrange,
    colorBlue,
    colorPink
  }
}

export { useGameStyles }