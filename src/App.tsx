import React, { useState } from 'react'
import words from './words.json'
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
  const [secretWord, setSecretWord] = useState(words[0])

  function clickOnLetter(letter: string) {
    // Makes a new state USING the old state plus the new letter
    setGuessedLetters(guessedLetters + letter)
  }
  console.log(guessedLetters)

  return (
    <div>
      <div>Your guessed letter are: {guessedLetters}</div>
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
