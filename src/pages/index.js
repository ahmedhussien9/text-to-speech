import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"
import "font-awesome/css/font-awesome.min.css"
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"
import RangeSlider from "react-bootstrap-range-slider"

export default function Home() {
  const STEP = 0.1
  const MIN = 0
  const MAX_VOLUME = 1
  const MAX_PITCH = 2
  const MAX_RATE = 10

  const [message, setMessage] = useState("")
  const [voices, setVoices] = useState([])
  const [voiceCode, setVoiceCode] = useState("en-US")
  const [volume, setVolume] = useState(0.5)
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [isSpeaking, setSpeaking] = useState(false)
  const speak = () => {
    let speech = new SpeechSynthesisUtterance()
    // Handle pause speaking
    if (isSpeaking && !isPaused) {
      pauseSpeaking()
      setIsPaused(true)
      return
    }
    // Handle resume speaking again
    if (isSpeaking && isPaused) {
      resumeSpeaking()
      setIsPaused(false)
      return
    }
    console.log("Clicked 1 speak")
    // Speaking for first time
    turnOnSpeaking(speech)
  }

  const resumeSpeaking = () => {
    window.speechSynthesis.resume()
  }

  const pauseSpeaking = () => {
    window.speechSynthesis.pause()
  }

  const turnOnSpeaking = speech => {
    speech.lang = voiceCode
    speech.text = message
    speech.volume = volume
    speech.rate = rate
    speech.pitch = pitch
    speech.onstart = function () {
      setSpeaking(true)
    }
    speech.onend = function () {
      setSpeaking(false)
    }

    window.speechSynthesis.speak(speech)
  }

  const changePlayAndPauseIcon = () => {
    if (isPaused) {
      return <i className="fa fa-play" aria-hidden="true"></i>
    }

    if (isSpeaking) {
      return (
        <div>
          <i className="fa fa-pause" aria-hidden="true"></i>
          <div className={styles.pulseRing}></div>
        </div>
      )
    }

    return <i className="fa fa-play" aria-hidden="true"></i>
  }

  useEffect(() => {
    const voicesList = window.speechSynthesis.getVoices()
    setVoices(voicesList)
  }, [])

  const sendMessage = message => {
    setMessage(message)
  }

  const onChangeVoice = voice => {
    setVoiceCode(voice)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Text to Speech using{" "}
          <span className={styles.highlightText}>Web Speech API</span> in
          JavaScript <i className="fa fa-microphone"></i>
        </h1>
        <p className={styles.description}>
          The Web Speech API provides two distinct areas of functionality —
          speech recognition, and speech synthesis (also known as text to
          speech, or tts) — which open up interesting new possibilities for
          accessibility, and control mechanisms. This article provides a simple
          introduction to both areas, along with demos
        </p>
        <a
          className={styles.link}
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"
          target="_blank"
        >
          Read More
        </a>
        {/* Voice Animation bar*/}
        <div className={styles.barArea}>
          {isPaused ? (
            <div className={styles.stoppedArea}>
              <h6 className={styles.stoppedAreaTitle}>Stopped</h6>
            </div>
          ) : (
            ""
          )}
          {isSpeaking && !isPaused ? (
            <div className={styles.barContainer}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* End Voice Animation bar*/}
        {/* Start Voice controls */}
        {/**Voice control */}

        <div className={styles.voiceControlsContainer}>
          <div className={styles.voiceVolumeContainer}>
            <h6 className={styles.controlLabel}>Volume</h6>
            <RangeSlider
              min={MIN}
              max={MAX_VOLUME}
              value={volume}
              step={STEP}
              variant="primary"
              onChange={changeEvent => setVolume(changeEvent.target.value)}
            />
          </div>
          <div className={styles.voiceVolumeContainer}>
            <h6 className={styles.controlLabel}>Pitch</h6>
            <RangeSlider
              min={MIN}
              max={MAX_PITCH}
              value={pitch}
              step={STEP}
              variant="primary"
              onChange={changeEvent => setPitch(changeEvent.target.value)}
            />
          </div>
          <div className={styles.voiceVolumeContainer}>
            <h6 className={styles.controlLabel}>Rate</h6>
            <RangeSlider
              min={1}
              max={MAX_RATE}
              value={rate}
              step={STEP}
              variant="primary"
              onChange={changeEvent => setRate(changeEvent.target.value)}
            />
          </div>
        </div>

        {/** End Voice Controls*/}
        {/* Start Voice List & text */}
        <div className={styles.speechContainer}>
          {voices && voices.length ? (
            <div className={styles.languageContainer}>
              <h6 className={styles.controlLabel}>Select Language</h6>
              <select
                className={styles.select}
                onChange={event => onChangeVoice(event.target.value)}
              >
                {voices &&
                  voices.length > 0 &&
                  voices.map((voice, key) => {
                    return (
                      <option key={key} value={voice.lang}>
                        {voice.name}
                      </option>
                    )
                  })}
              </select>
            </div>
          ) : (
            ""
          )}

          <textarea
            className={styles.textArea}
            name="message"
            rows="8"
            placeholder="Please write something here and click on play button.."
            column="5"
            onChange={event => sendMessage(event.target.value)}
          ></textarea>

          <div className={styles.playButtonContainer}>
            <button onClick={speak} className={styles.speechButton}>
              {changePlayAndPauseIcon()}
            </button>
          </div>
        </div>
        {/* End Voice List & text */}
      </div>
    </Layout>
  )
}
