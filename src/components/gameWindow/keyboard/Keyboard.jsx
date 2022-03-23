import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import './keyboard.css'

function Keyboard({
    set,
    first,
    setFirst,
    second,
    third,
    fourth,
    fifth,
    sixth,
    setSecond,
    setThird,
    setFourth,
    setFifth,
    setSixth,
    rowPointer,
    setRowPointer,
    enter,
    green,
    yellow,
    gray,
}) {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const [greenLetters, setGreenLetters] = useState([])
    const [yellowLetters, setYellowLetters] = useState([])
    const [grayLetters, setGrayLetters] = useState([])

    const useKey = (key, cb) => {
        const callbackRef = useRef(cb)

        useEffect(() => {
            callbackRef.current = cb
        })
        useEffect(() => {
            const handle = (event) => {
                event.code === key && callbackRef.current(event)
            }

            document.addEventListener('keypress', handle)
            return () => document.removeEventListener('keypress', handle)
        }, [key])
    }
    const useKeyDel = (key, cb) => {
        const callbackRef = useRef(cb)

        useEffect(() => {
            callbackRef.current = cb
        })
        useEffect(() => {
            const handle = (event) => {
                event.code === key && callbackRef.current(event)
            }

            document.addEventListener('keydown', handle)
            return () => document.removeEventListener('keydown', handle)
        }, [key])
    }

    const backSpace = (row, setRow) => {
        setRow(row.slice(0, row.length - 1))
    }
    const handleDelete = () => {
        switch (rowPointer) {
            case 'first':
                backSpace(first, setFirst)
                break
            case 'second':
                backSpace(second, setSecond)
                break
            case 'third':
                backSpace(third, setThird)
                break
            case 'fourth':
                backSpace(fourth, setFourth)
                break
            case 'fifth':
                backSpace(fifth, setFifth)
                break
            case 'sixth':
                backSpace(sixth, setSixth)
                break
            default:
                break
        }
    }

    const handleKeyColor = (key) => {
        let keyLower = key.toLowerCase()

        if (greenLetters.includes(keyLower)) {
            return 'green'
        }
        if (yellowLetters.includes(keyLower)) {
            return 'rgb(192, 179, 0)'
        }
        if (grayLetters.includes(keyLower)) {
            return 'rgb(56, 56, 56)'
        }
    }

    useKeyDel('Backspace', handleDelete)
    useKey('Enter', enter)
    useKey('KeyA', () => set('A'))
    useKey('KeyB', () => set('B'))
    useKey('KeyC', () => set('C'))
    useKey('KeyD', () => set('D'))
    useKey('KeyE', () => set('E'))
    useKey('KeyF', () => set('F'))
    useKey('KeyG', () => set('G'))
    useKey('KeyH', () => set('H'))
    useKey('KeyI', () => set('I'))
    useKey('KeyJ', () => set('J'))
    useKey('KeyK', () => set('K'))
    useKey('KeyL', () => set('L'))
    useKey('KeyM', () => set('M'))
    useKey('KeyN', () => set('N'))
    useKey('KeyO', () => set('O'))
    useKey('KeyP', () => set('P'))
    useKey('KeyQ', () => set('Q'))
    useKey('KeyR', () => set('R'))
    useKey('KeyS', () => set('S'))
    useKey('KeyT', () => set('T'))
    useKey('KeyU', () => set('U'))
    useKey('KeyV', () => set('V'))
    useKey('KeyW', () => set('W'))
    useKey('KeyX', () => set('X'))
    useKey('KeyY', () => set('Y'))
    useKey('KeyZ', () => set('Z'))

    useEffect(() => {
        setYellowLetters(yellow)
        setGrayLetters(gray)
        setGreenLetters(green)
    }, [green, yellow, gray])

    return (
        <>
            <div className="keyboard_container">
                <div className="firstRowKey">
                    {firstRow.map((key) => (
                        <button
                            onClick={() => set(key)}
                            key={key}
                            style={{
                                backgroundColor: handleKeyColor(key),
                            }}
                        >
                            <p>{key}</p>
                        </button>
                    ))}
                </div>

                <div className="secondRowKey">
                    {secondRow.map((key) => (
                        <button
                            onClick={() => set(key)}
                            key={key}
                            style={{
                                backgroundColor: handleKeyColor(key),
                            }}
                        >
                            <p>{key}</p>
                        </button>
                    ))}
                </div>

                <div className="thirdRowKey">
                    <button
                        onClick={enter}
                        style={{ backgroundColor: 'rgb(57, 201, 88)' }}
                    >
                        <p>⏎</p>
                    </button>
                    {thirdRow.map((key) => (
                        <button
                            onClick={() => set(key)}
                            key={key}
                            style={{
                                backgroundColor: handleKeyColor(key),
                            }}
                        >
                            <p>{key}</p>
                        </button>
                    ))}
                    <button
                        onClick={handleDelete}
                        style={{ backgroundColor: 'tomato' }}
                    >
                        <p>X</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Keyboard
