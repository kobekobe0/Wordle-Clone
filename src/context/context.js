import React, { createContext, useState, useEffect } from 'react'
import {
    colRef,
    getEasy,
    getHard,
    addEasyScore,
    addHardScore,
} from '../firebase'

export const LeadersContext = createContext()

export const LeadersProvider = ({ children }) => {
    const [easyLeaders, setEasyLeaders] = useState([])
    const [hardLeaders, setHardLeaders] = useState([])
    const [playerName, setPlayerName] = useState('')

    useEffect(() => {
        let easy = []
        let hard = []
        easy = getEasy()
        hard = getHard()

        setEasyLeaders(easy)
        setHardLeaders(hard)
    }, [getEasy, getHard])

    const addEasyScoreHandler = (name, score) => {
        addEasyScore(name, score)
    }
    const addHardScoreHandler = (name, score) => {
        addHardScore(name, score)
    }

    return (
        <LeadersContext.Provider
            value={{
                addEasyScoreHandler,
                addHardScoreHandler,
                setPlayerName,
                easyLeaders,
                hardLeaders,
            }}
        >
            {children}
        </LeadersContext.Provider>
    )
}
