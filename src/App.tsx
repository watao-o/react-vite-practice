import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cook from './features/cook/cook.tsx'
import Game from './features/threeEyes/game.tsx'
import './style.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <Cook />
        <Game />
      </div>
    </>
  )
}



export default App
