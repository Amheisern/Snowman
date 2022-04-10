import React, { useState } from 'react'

//importing the images to build a snowman
import step_0 from '/src/images/step_0.png'
import step_1 from '/src/images/step_1.png'
import step_2 from '/src/images/step_2.png'
import step_3 from '/src/images/step_3.png'
import step_4 from '/src/images/step_4.png'
import step_5 from '/src/images/step_5.png'
import step_6 from '/src/images/step_6.png'
import step_7 from '/src/images/step_7.png'
// dont need below code since i'm fetching a world from an API
// import words from './words.json'
const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
//How to store the state in a variable
export function App() {
  const [guessedLetters, setGuessedLetters] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const [correctLetters, setCorrectLetters] = useState('')
  const [numberOfCorrectLetters, setNumberOfCorrectLetters] = useState(0)

  async function newGame() {
    setGuessedLetters('')
    setCorrectLetters('')

    const response = await fetch(
      'https://sdg-words.herokuapp.com/api/words/random'
    )
    if (response.ok) {
      const word = await response.json()
      setSecretWord(word.toUpperCase())
    }
  }
  function displaySnowImage() {
    switch (numberOfCorrectLetters) {
      case 1:
        return step_1
      case 2:
        return step_2
      case 3:
        return step_3
      case 4:
        return step_4
      case 5:
        return step_5
      case 6:
        return step_6
      case 7:
        return step_7
      default:
        return step_0
    }
  }
  function clickOnLetter(letter: string) {
    // Makes a new state USING the old state plus the new letter
    if (secretWord === '') {
      return
    } else {
      setGuessedLetters(guessedLetters + letter)
      if (secretWord.includes(letter)) {
        setCorrectLetters(correctLetters + letter)
        setNumberOfCorrectLetters(numberOfCorrectLetters + 1)
        console.log(numberOfCorrectLetters)
        console.log(setCorrectLetters)
      }
    }
  }
  console.log(guessedLetters)

  return (
    <div>
      <button onClick={() => newGame()}>New Game</button>
      <img src={displaySnowImage()} />
      <h1>Your guessed letter are: {guessedLetters}</h1>
      <h2>{secretWord}</h2>
      <h2>{correctLetters}</h2>
      {ALPHABET.map(function (letter) {
        return (
          <button
            key={letter}
            onClick={function () {
              clickOnLetter(letter)
            }}
            disabled={guessedLetters.includes(letter)}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}
