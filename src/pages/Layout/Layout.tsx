/** @jsxImportSource @emotion/react */
import React, { ReactElement } from "react"
import { useLayoutStyles } from "./Layout.style"

interface ILayout {
  children: ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {

  const style = useLayoutStyles()

  console.log(style.container)

  return (
    <div css={style.layout}>
      <div css={style.container}>
        <header css={style.header}>
          <h2>Игра Сапер</h2>
          <nav>
            <ul css={style.menu}>
              <li><a href="/">Новичок</a></li>
              <li><a href="/">Любитель</a></li>
              <li><a href="/">Профессионал</a></li>
              <li><a href="/">Как играть</a></li>
            </ul>
          </nav>
        </header>
        <div css={style.content}>
          {children}
        </div>
        <footer css={style.footer}>
          Сделано <a href="https://sashapro.ru">sashapro.ru</a>
        </footer>
      </div>
    </div>
  )
}

export { Layout }