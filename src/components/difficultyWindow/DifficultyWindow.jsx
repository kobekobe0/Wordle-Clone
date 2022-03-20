import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './difficultyWindow.css'
import { LeadersContext } from '../../context/context'
import {
    getEasy,
    getHard,
    addEasyScorem,
    colRefEasy,
    colRefHard,
    db,
} from '../../firebase'
import { Modal } from '../modal/Modal'
import {
    collection,
    getFirestore,
    getDocs,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    limit,
} from 'firebase/firestore'

function DifficultyWindow() {
    const { easyLeaders, hardLeaders, setPlayerName } =
        useContext(LeadersContext)
    const [easy, setEasy] = React.useState([])
    const [hard, setHard] = React.useState([])
    const [disabler, setDisabler] = React.useState(false)
    const [name, setName] = React.useState('')
    const [urlName, setUrlName] = React.useState('')
    const colRefEasy = collection(db, 'easy')
    const colRefHard = collection(db, 'hard')

    useEffect(() => {
        const v = query(colRefEasy, orderBy('score', 'desc'), limit(5))
        const unsub = onSnapshot(v, (snapshot) => {
            setEasy(snapshot.docs.map((doc) => ({ ...doc.data() })))
        })
        return unsub
    }, [])

    useEffect(() => {
        const q = query(colRefHard, orderBy('score', 'desc'), limit(5))
        const unsub = onSnapshot(q, (snapshot) => {
            setHard(snapshot.docs.map((doc) => ({ ...doc.data() })))
        })
        return unsub
    }, [])
    //addEasyScore('test', 2)

    useEffect(() => {
        console.log(easy)
        console.log(hard)
    }, [easy, hard])

    const checkName = () => {
        if (name !== '') {
            setUrlName(name)
            setDisabler(true)
        }
    }

    return (
        <div className="homepage">
            <div className="name">
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    maxLength={8}
                />
            </div>
            {disabler ? null : (
                <button className="enterButton" onClick={checkName}>
                    Enter
                </button>
            )}
            {disabler && (
                <div className="difficulty">
                    <Link
                        className="difficulty_element"
                        to={`/easy/${urlName}`}
                    >
                        Easy 🍀
                    </Link>
                    <Link
                        className="difficulty_element"
                        to={`/hard/${urlName}`}
                    >
                        Hard 🔥
                    </Link>
                </div>
            )}
            <br />

            <div className="leaderboards">
                <h2>Leadeboard</h2>
                <h3 style={{ fontWeight: 'lighter' }}>Hard Mode</h3>
                <div className="hardLeaders">
                    {hard !== null &&
                        hard.map((value, i) => (
                            <div key={value[i]} className="leaders">
                                <h4>
                                    {[i + 1]}. {value.name}
                                </h4>
                                <h4>{value.score}</h4>
                            </div>
                        ))}
                </div>
                <h3 style={{ fontWeight: 'lighter' }}>Easy Mode</h3>
                <div className="easyLeaders">
                    {easy !== null &&
                        easy.map((value, i) => (
                            <div key={value[i]} className="leaders">
                                <h4>
                                    {' '}
                                    {[i + 1]}. {value.name}
                                </h4>
                                <h4>{value.score}</h4>
                            </div>
                        ))}
                </div>

                <div className="easyLeaders"></div>
            </div>
        </div>
    )
}

export default DifficultyWindow
