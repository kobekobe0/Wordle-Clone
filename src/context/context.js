import React, { createContext, useState, useEffect } from 'react'
import { addEasyScore, addHardScore } from '../firebase'

export const LeadersContext = createContext()

export const LeadersProvider = ({ children }) => {
    const [easyLeaders, setEasyLeaders] = useState([])
    const [hardLeaders, setHardLeaders] = useState([])
    const [playerName, setPlayerName] = useState('')

    useEffect(() => {}, [])

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
