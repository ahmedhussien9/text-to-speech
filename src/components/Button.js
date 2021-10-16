import React from "react"
import * as styles from "./Button.module.css"

export default function Button(props) {
  return (
    <button onClick={props.click} className={styles.customButton}>
      {props.title}
    </button>
  )
}
