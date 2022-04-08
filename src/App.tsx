import React, { useState } from 'react'
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

  async function newGame() {
    setGuessedLetters('')

    const response = await fetch(
      'https://sdg-words.herokuapp.com/api/words/random'
    )
    if (response.ok) {
      const word = await response.json()
      setSecretWord(word.toUpperCase())
    }
  }

  function clickOnLetter(letter: string) {
    // Makes a new state USING the old state plus the new letter
    setGuessedLetters(guessedLetters + letter)
    if (secretWord.includes(letter)) {
      setCorrectLetters(correctLetters + letter)
      console.log(setCorrectLetters)
      console.log('correct')
    }
  }
  console.log(guessedLetters)

  return (
    <div>
      <button onClick={() => newGame()}>New Game</button>
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
