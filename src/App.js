import logo from './logo.svg'
import './App.css'
import GameWindow from './components/gameWindow/GameWindow'
import DifficultyWindow from './components/difficultyWindow/DifficultyWindow'
import ErrorPage from './components/ErrorPage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { LeadersProvider } from './context/context'

function App() {
    return (
        <Router>
            <LeadersProvider>
                <div className="App">
                    <Link
                        className="title"
                        to="/"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '2.5em',
                            fontWeight: 'bold',
                        }}
                    >
                        Wordle
                        <span
                            className="titleWordle"
                            style={{ color: 'lightblue' }}
                        >
                            Rush
                        </span>{' '}
                    </Link>
                    <a
                        style={{
                            fontSize: '12px',
                            fontWeight: 'lighter',
                            textDecoration: 'none',
                            color: 'white',
                        }}
                        href="https://kobesantos.herokuapp.com/"
                        target="_blank"
                    >
                        by Kobe
                    </a>
                    <hr />
                    <br />

                    <Routes>
                        <Route path="/" element={<DifficultyWindow />} />
                        <Route
                            path="/easy/:name"
                            element={<GameWindow level={true} />}
                        />
                        <Route
                            path="/hard/:name"
                            element={<GameWindow level={false} />}
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </LeadersProvider>
        </Router>
    )
}

export default App
