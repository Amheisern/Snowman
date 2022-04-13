import React, { useState } from 'react'
import { Snowman } from './components/Snowman'

// dont need below code since i'm fetching a world from an API
const ALPHABET = [...Array(26)].map((_, i) => String.fromCharCode(i + 65)) // A-Z

//How to store the state in a variable
export function App() {
  const [guessedLetters, setGuessedLetters] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const [correctLetters, setCorrectLetters] = useState('')
  const [numberOfCorrectLetters, setNumberOfCorrectLetters] = useState(0)
  const [wordDisplayed, setWordDisplayed] = useState('-------')
  const [playable, setPlayable] = useState('New Game')

  async function gameOn() {
    const response = await fetch(
      'https://sdg-words.herokuapp.com/api/words/random'
    )
    if (response.ok) {
      const word = await response.json()
      setSecretWord(word.toUpperCase())
    }
  }
  function newGame() {
    setGuessedLetters('')
    setCorrectLetters('')
    setNumberOfCorrectLetters(0)
    setWordDisplayed('-------')
    gameOn()
  }
  // function displaySnowImage() {
  //   switch (numberOfCorrectLetters) {
  //     case 1:
  //       return step_1
  //     case 2:
  //       return step_2
  //     case 3:
  //       return step_3
  //     case 4:
  //       return step_4
  //     case 5:
  //       return step_5
  //     case 6:
  //       return step_6
  //     case 7:
  //       return step_7
  //     default:
  //       return step_0
  //   }
  // }
  function clickOnLetter(letter: string) {
    if (correctLetters.length === wordDisplayed.length - 1) {
      setPlayable('Try Again')
    }
    //guard statement to make sure buttons can't be clicked before game starts
    if (secretWord === '') {
      return
    } else {
      // Makes a new state USING the old state plus the new letter
      setGuessedLetters(guessedLetters + letter)
      // If the letter is in the secret word
      if (secretWord.includes(letter)) {
        //Make a list of all correctly guessed letters
        setCorrectLetters(correctLetters + letter)
        //Counts number of correctly guessed letters
        setNumberOfCorrectLetters(numberOfCorrectLetters + 1)
        // for each letter correctly guessed letter in secret word, replace the dash with the letter

        let newWordDisplayed = ''
        for (let index = 0; index < secretWord.length; index++) {
          secretWord[index] === letter
            ? (newWordDisplayed = newWordDisplayed.concat(letter))
            : (newWordDisplayed = newWordDisplayed.concat(wordDisplayed[index]))
        }
        setWordDisplayed(newWordDisplayed)
        // secretWord.split('').map((letter, index) => {
        //   if (secretWord[index] === letter) {
        //     newWordDisplayed = newWordDisplayed.concat(letter)
        //    return newWordDisplayed
        //   } else {
        //     newWordDisplayed = newWordDisplayed.concat(wordDisplayed[index])
        //    return newWordDisplayed
        //   }
        //        console.log(numberOfCorrectLetters)
        console.log(`secret word ${secretWord}`)
        console.log('*********')
        console.log(`word displayed ${wordDisplayed}`)
        console.log('*********')
        console.log(`guessed Letters ${guessedLetters}`)
        console.log('*********')
        console.log(`set Correct Letters ${correctLetters}`)
      }
    }
  }

  return (
    <div>
      <section>
        <h1>Do you want to Build a SNOWMAN?</h1>
        <button className="newGame" onClick={() => newGame()}>
          {playable}
        </button>
        <Snowman numberOfCorrectLetters={numberOfCorrectLetters} />
        <span>{wordDisplayed}</span>
        <h2>Your guessed letter are: {guessedLetters}</h2>
      </section>
      <p className="abc">
        {ALPHABET.map(function (letter) {
          return (
            <button
              className="abc"
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
      </p>
    </div>
  )
}
