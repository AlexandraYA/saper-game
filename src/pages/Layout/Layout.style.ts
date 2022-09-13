import { css } from "@emotion/react"


const useLayoutStyles = () => {

  const layout = css`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  `

  const container = css`
    width: 980px;
  `

  const header = css`
    display: flex;
    justify-content: space-between;
    height: 80px;
    padding: 0 25px;

    h1 > a {
      text-decoration: none;
    }
  `
  
  const menu = css`
    display: flex;
    height: 100%;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    & > li {
      padding: 0;
      margin: 0 0 0 15px;

      & > a {
        text-decoration: none;
      }
    }
  `

  const content = css`
    padding: 0 25px;
  `

  const footer = css`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    margin: 0;
  `

  return {
    layout,
    container,
    header,
    menu,
    content,
    footer
  }
}

export { useLayoutStyles }