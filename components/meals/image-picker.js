"use client"

import styles from "./image-picker.module.css"
import { useRef, useState } from "react"
import Image from "next/image"

export default function ImagePicker({ label, name }) {
  const inputRef = useRef()
  const [image, setImage] = useState(null)

  function handlePickClick() {
    inputRef.current.click()
  }

  function handleImageChange(event) {
    const file = event.target.files[0]
    if (!file) {
      setImage(null)
      return
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setImage(fileReader.result)
    }
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.preview}>
        {!image && <p>No image picked yet.</p>}
        {image && <Image src={image} alt="Picked meal image" fill />}
      </div>
      <div className={styles.controls}>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept=".jpg,.png,.jpeg"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  )
}
