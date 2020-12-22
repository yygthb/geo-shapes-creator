import React from 'react'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  return (
    <main className={style.main}>
      <Sidebar />
      <Content />
    </main>
  );
}

export default App