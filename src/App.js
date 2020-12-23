import React from 'react'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  const createFigureHandler = name => {
    console.log('create: ', name)
  }

  return (
    <main className={style.main}>
      <Sidebar createFigureHandler={createFigureHandler} />
      <Content />
    </main>
  );
}

export default App