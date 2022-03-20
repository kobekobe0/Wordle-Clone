import React, { useEffect, useState, useContext } from 'react'
import Keyboard from './keyboard/Keyboard'
import './GameWindow.css'
import { words, commonWords } from '../../word'
import Modal from '../modal/Modal'
import { LeadersContext } from '../../context/context'
import { useParams } from 'react-router-dom'

function GameWindow({ level }) {
    const { addEasyScoreHandler, addHardScoreHandler } =
        useContext(LeadersContext)
    const params = useParams()
    console.log(params.name)
    const [colors, setColors] = useState([
        'green',
        'rgb(192, 179, 0)',
        'rgb(56, 56, 56)',
    ])
    const [firstGuess, setFirstGuess] = useState([])
    const [secondGuess, setSecondGuess] = useState([])
    const [thirdGuess, setThirdGuess] = useState([])
    const [fourthGuess, setFourthGuess] = useState([])
    const [fifthGuess, setFifthGuess] = useState([])
    const [sixthGuess, setSixthGuess] = useState([])

    const [firstRowColors, setFirstRowColors] = useState([])
    const [secondRowColors, setSecondRowColors] = useState([])
    const [thirdRowColors, setThirdRowColors] = useState([])
    const [fourthRowColors, setFourthRowColors] = useState([])
    const [fifthRowColors, setFifthRowColors] = useState([])
    const [sixthRowColors, setSixthRowColors] = useState([])

    const [rowPointer, setRowPointer] = useState('first')

    const [greenLetters, setGreenLetters] = useState([])
    const [yellowLetters, setYellowLetters] = useState([])
    const [grayLetters, setGrayLetters] = useState([])

    const [result, setResult] = useState(false)
    const [lose, setLose] = useState(false)
    const [short, setShort] = useState(false)
    const [notAWord, setNotAWord] = useState(false)
    const [notice, setNotice] = useState(false)
    const [answer, setAnswer] = useState('')
    const [score, setScore] = useState(0)
    const [difficulty, setDifficulty] = useState(level) // true = easy, false = hard

    useEffect(() => {
        setWord()
    }, [])

    const setWord = () => {
        if (difficulty) {
            const wordSelector = Math.floor(Math.random() * 527 + 1)
            const answer = commonWords[wordSelector]
            setAnswer(answer.toLowerCase())
            console.log(answer)
        } else {
            const wordSelector = Math.floor(Math.random() * 12653 + 1)
            const answer = words[wordSelector]
            setAnswer(answer)
            console.log(answer)
        }
    }

    const handleClick = (letter) => {
        switch (rowPointer) {
            case 'first':
                if (firstGuess.length !== 5) {
                    setFirstGuess([...firstGuess, letter])
                }
                break
            case 'second':
                if (secondGuess.length !== 5) {
                    setSecondGuess([...secondGuess, letter])
                }
                break
            case 'third':
                if (thirdGuess.length !== 5) {
                    setThirdGuess([...thirdGuess, letter])
                }
                break
            case 'fourth':
                if (fourthGuess.length !== 5) {
                    setFourthGuess([...fourthGuess, letter])
                }
                break
            case 'fifth':
                if (fifthGuess.length !== 5) {
                    setFifthGuess([...fifthGuess, letter])
                }
                break

            case 'sixth':
                if (sixthGuess.length !== 5) {
                    setSixthGuess([...sixthGuess, letter])
                }
                break
        }
    }

    const checkIndex = (guessArr) => {
        const answerArr = Array.from(answer) // match each index to each of guess arr
        let guessLowerCase = guessArr.map((letter) => letter.toLowerCase())
        let arr = []
        let green = []
        let yellow = []
        let gray = []
        let multipleTracker = []

        for (let i = 0; i < 5; i++) {
            if (guessLowerCase[i] === answerArr[i]) {
                arr.push(colors[0])
                multipleTracker.push(guessLowerCase[i])
                !greenLetters.includes(answerArr[i]) && green.push(answerArr[i]) // make background green
            } else if (answerArr.includes(guessLowerCase[i])) {
                !multipleTracker.includes(guessLowerCase[i]) // if letter is in the array only once, make background yellow
                    ? arr.push(colors[1]) &&
                      multipleTracker.push(guessLowerCase[i])
                    : arr.push(colors[2])

                !yellowLetters.includes(answerArr[i]) &&
                    yellow.push(guessLowerCase[i])
            } else {
                arr.push(colors[2])
                !grayLetters.includes(answerArr[i]) && // make background black
                    gray.push(guessLowerCase[i])
            }
        }
        switch (rowPointer) {
            case 'first':
                setFirstRowColors(arr)
                break
            case 'second':
                setSecondRowColors(arr)
                break
            case 'third':
                setThirdRowColors(arr)
                break
            case 'fourth':
                setFourthRowColors(arr)
                break
            case 'fifth':
                setFifthRowColors(arr)
                break
            case 'sixth':
                setSixthRowColors(arr)
                break
        }

        setYellowLetters([...yellowLetters, ...yellow])
        setGrayLetters([...grayLetters, ...gray])
        setGreenLetters([...greenLetters, ...green])
    }

    const setDisappearModal = (setFunction) => {
        setFunction(true)
        setTimeout(() => {
            setFunction(false)
        }, 1000)
    }

    const handleGuess = (guessWord, pointer) => {
        if (guessWord.length === 5) {
            const joined = guessWord.join('').toLowerCase()
            if (words.includes(joined)) {
                if (joined === answer) {
                    checkIndex(guessWord)
                    setScore(score + 1)
                    setResult(true) // show you win message
                } else {
                    checkIndex(guessWord)
                    setRowPointer(pointer)
                }
            } else {
                setDisappearModal(setNotAWord)
            }
        } else {
            setDisappearModal(setShort)
        }
    }

    const handleEnter = () => {
        switch (rowPointer) {
            case 'first':
                handleGuess(firstGuess, 'second')
                break
            case 'second':
                handleGuess(secondGuess, 'third')
                break
            case 'third':
                handleGuess(thirdGuess, 'fourth')
                break
            case 'fourth':
                handleGuess(fourthGuess, 'fifth')
                break
            case 'fifth':
                handleGuess(fifthGuess, 'sixth')
                break
            case 'sixth':
                if (sixthGuess.length === 5) {
                    const joined = sixthGuess.join('').toLowerCase()
                    if (words.includes(joined)) {
                        if (joined === answer) {
                            checkIndex(sixthGuess)
                            setResult(true)
                        } else {
                            checkIndex(sixthGuess)
                            //add score to firebase
                            if (window.location.pathname.includes('/easy')) {
                                // easy collection
                                addEasyScoreHandler(params.name, score)
                            } else {
                                // hard collection
                                addHardScoreHandler(params.name, score)
                            }
                            setLose(true)
                        }
                    } else {
                        setDisappearModal(setNotAWord)
                    }
                } else {
                    setDisappearModal(setShort)
                }
                break
        }
    }

    const handlePlayAgain = () => {
        setFirstRowColors([])
        setSecondRowColors([])
        setThirdRowColors([])
        setFourthRowColors([])
        setFifthRowColors([])
        setSixthRowColors([])
        setGreenLetters([])
        setYellowLetters([])
        setGrayLetters([])
        setFirstGuess([])
        setSecondGuess([])
        setThirdGuess([])
        setFourthGuess([])
        setFifthGuess([])
        setSixthGuess([])
        setResult(false)
        setLose(false)
        setRowPointer('first')
        setNotAWord(false)
        setShort(false)
        setWord()
    }

    return (
        <>
            <p className="scoreContainer">SCORE: {score}</p>
            <div className="guessContainer">
                <div
                    className="firstRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? firstRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{firstGuess !== [] ? firstGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? firstRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{firstGuess !== [] ? firstGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? firstRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{firstGuess !== [] ? firstGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? firstRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{firstGuess !== [] ? firstGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? firstRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{firstGuess !== [] ? firstGuess[4] : ' '}</p>
                    </div>
                </div>
                <div
                    className="secondRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="secondtRowElement"
                        style={{
                            backgroundColor:
                                secondRowColors !== []
                                    ? secondRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{secondGuess !== [] ? secondGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="secondRowElement"
                        style={{
                            backgroundColor:
                                secondRowColors !== []
                                    ? secondRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{secondGuess !== [] ? secondGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="secondRowElement"
                        style={{
                            backgroundColor:
                                secondRowColors !== []
                                    ? secondRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{secondGuess !== [] ? secondGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="secondRowElement"
                        style={{
                            backgroundColor:
                                secondRowColors !== []
                                    ? secondRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{secondGuess !== [] ? secondGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="secondRowElement"
                        style={{
                            backgroundColor:
                                secondRowColors !== []
                                    ? secondRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{secondGuess !== [] ? secondGuess[4] : ' '}</p>
                    </div>
                </div>

                <div
                    className="thirdRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="thirdRowElement"
                        style={{
                            backgroundColor:
                                thirdRowColors !== []
                                    ? thirdRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{thirdGuess !== [] ? thirdGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="thirdRowElement"
                        style={{
                            backgroundColor:
                                thirdRowColors !== []
                                    ? thirdRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{thirdGuess !== [] ? thirdGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="thirdRowElement"
                        style={{
                            backgroundColor:
                                thirdRowColors !== []
                                    ? thirdRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{thirdGuess !== [] ? thirdGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="thirdRowElement"
                        style={{
                            backgroundColor:
                                thirdRowColors !== []
                                    ? thirdRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{thirdGuess !== [] ? thirdGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="thirdRowElement"
                        style={{
                            backgroundColor:
                                thirdRowColors !== []
                                    ? thirdRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{thirdGuess !== [] ? thirdGuess[4] : ' '}</p>
                    </div>
                </div>
                <div
                    className="fourthRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="fourthRowElement"
                        style={{
                            backgroundColor:
                                fourthRowColors !== []
                                    ? fourthRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{fourthGuess !== [] ? fourthGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="fourthRowElement"
                        style={{
                            backgroundColor:
                                fourthRowColors !== []
                                    ? fourthRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{fourthGuess !== [] ? fourthGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="fourthRowElement"
                        style={{
                            backgroundColor:
                                fourthRowColors !== []
                                    ? fourthRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{fourthGuess !== [] ? fourthGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="fourthRowElement"
                        style={{
                            backgroundColor:
                                fourthRowColors !== []
                                    ? fourthRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{fourthGuess !== [] ? fourthGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="fourthRowElement"
                        style={{
                            backgroundColor:
                                fourthRowColors !== []
                                    ? fourthRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{fourthGuess !== [] ? fourthGuess[4] : ' '}</p>
                    </div>
                </div>
                <div
                    className="fifthRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="fifthRowElement"
                        style={{
                            backgroundColor:
                                firstRowColors !== []
                                    ? fifthRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{fifthGuess !== [] ? fifthGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="fifthRowElement"
                        style={{
                            backgroundColor:
                                fifthRowColors !== []
                                    ? fifthRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{fifthGuess !== [] ? fifthGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="fifthRowElement"
                        style={{
                            backgroundColor:
                                fifthRowColors !== []
                                    ? fifthRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{fifthGuess !== [] ? fifthGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="fifthRowElement"
                        style={{
                            backgroundColor:
                                fifthRowColors !== []
                                    ? fifthRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{fifthGuess !== [] ? fifthGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="fifthRowElement"
                        style={{
                            backgroundColor:
                                fifthRowColors !== []
                                    ? fifthRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{fifthGuess !== [] ? fifthGuess[4] : ' '}</p>
                    </div>
                </div>
                <div
                    className="sixthRow"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px',
                    }}
                >
                    <div
                        className="firstRowElement"
                        style={{
                            backgroundColor:
                                sixthRowColors !== []
                                    ? sixthRowColors[0]
                                    : 'white',
                        }}
                    >
                        <p>{sixthGuess !== [] ? sixthGuess[0] : ' '}</p>
                    </div>
                    <div
                        className="sixthRowElement"
                        style={{
                            backgroundColor:
                                sixthRowColors !== []
                                    ? sixthRowColors[1]
                                    : 'white',
                        }}
                    >
                        <p>{sixthGuess !== [] ? sixthGuess[1] : ' '}</p>
                    </div>
                    <div
                        className="sixthRowElement"
                        style={{
                            backgroundColor:
                                sixthRowColors !== []
                                    ? sixthRowColors[2]
                                    : 'white',
                        }}
                    >
                        <p>{sixthGuess !== [] ? sixthGuess[2] : ' '}</p>
                    </div>
                    <div
                        className="sixthRowElement"
                        style={{
                            backgroundColor:
                                sixthRowColors !== []
                                    ? sixthRowColors[3]
                                    : 'white',
                        }}
                    >
                        <p>{sixthGuess !== [] ? sixthGuess[3] : ' '}</p>
                    </div>
                    <div
                        className="sixthRowElement"
                        style={{
                            backgroundColor:
                                sixthRowColors !== []
                                    ? sixthRowColors[4]
                                    : 'white',
                        }}
                    >
                        <p>{sixthGuess !== [] ? sixthGuess[4] : ' '}</p>
                    </div>
                </div>
            </div>

            <Keyboard
                set={handleClick}
                first={firstGuess}
                setFirst={setFirstGuess}
                second={secondGuess}
                setSecond={setSecondGuess}
                third={thirdGuess}
                setThird={setThirdGuess}
                fourth={fourthGuess}
                setFourth={setFourthGuess}
                fifth={fifthGuess}
                setFifth={setFifthGuess}
                sixth={sixthGuess}
                setSixth={setSixthGuess}
                rowPointer={rowPointer}
                setRowPointer={setRowPointer}
                enter={handleEnter}
                green={greenLetters}
                yellow={yellowLetters}
                gray={grayLetters}
            />

            {result ? (
                <div className="modal_container">
                    <div className="modal_content">
                        <div className="modal_header">
                            <button onClick={() => setResult(false)}>x</button>
                        </div>
                        <div className="modal_body">
                            <h2>You win!</h2>
                        </div>
                        <div className="modal_footer">
                            <h3 onClick={handlePlayAgain}>Continue</h3>
                        </div>
                    </div>
                </div>
            ) : null}

            {lose ? (
                <Modal
                    message={`You lose! Answer: ${answer.toLocaleUpperCase()}`}
                    link={handlePlayAgain}
                />
            ) : null}
            {short ? <Modal message="Enter five-letter word" /> : null}
            {notAWord ? <Modal message="Enter a valid word" /> : null}
        </>
    )
}

export default GameWindow