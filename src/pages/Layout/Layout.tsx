/** @jsxImportSource @emotion/react */
import React, { ReactElement } from "react"
import { useLayoutStyles } from "./Layout.style"
import { Link } from 'react-router-dom'
import { ILayout } from "../../store/types"


const Layout: React.FC<ILayout> = ({ children }) => {

  const style = useLayoutStyles()

  return (
    <div css={style.layout}>
      <div css={style.container}>
        <header css={style.header}>
          <h2>
            <Link to="/">Игра Сапер</Link>
          </h2>
          <nav>
            <ul css={style.menu}>
              <li><Link to="/junior">Новичок</Link></li>
              <li><Link to="/amateur">Любитель</Link></li>
              <li><Link to="/profi">Профессионал</Link></li>
              <li><Link to="/about">Как играть</Link></li>
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