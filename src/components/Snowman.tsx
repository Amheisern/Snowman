import React from 'react'

import step_0 from '/src/images/step_0.png'
import step_1 from '/src/images/step_1.png'
import step_2 from '/src/images/step_2.png'
import step_3 from '/src/images/step_3.png'
import step_4 from '/src/images/step_4.png'
import step_5 from '/src/images/step_5.png'
import step_6 from '/src/images/step_6.png'
import step_7 from '/src/images/step_7.png'

export function Snowman(props: { numberOfCorrectLetters: number }) {
  return <img src={displaySnowImage()} />

  function displaySnowImage() {
    switch (props.numberOfCorrectLetters) {
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
}
