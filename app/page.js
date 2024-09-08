import Link from "next/link"
import styles from "./page.module.css"
import ImageSlideshow from "@/components/images/image-slideshow"
export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.slideshow}>
          <ImageSlideshow />
        </div>
        <div className={styles.hero}>
          <h1>Welcome to NextLevel Food for the next level fodies</h1>
          <p>Taste & share the best meals with your family and friends</p>
        </div>
        <div className={styles.cta}>
          <Link href="/community">Join the community</Link>
          <Link href="/meals">Explore meals</Link>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <h2>How it works</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Why nextlevel food?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </section>
      </main>
    </>
  )
}
