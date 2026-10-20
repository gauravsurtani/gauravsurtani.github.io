// Home: the report grid (hero, about and experience in column 1; the sticky timeline card spans them in column 2
// at 1024px and up), then projects, skills and contact at full width. Phones: one column in DOM order.
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import Experience from '@/components/home/Experience'
import Hero from '@/components/home/Hero'
import Projects from '@/components/home/Projects'
import Skills from '@/components/home/Skills'
import Trace from '@/components/home/Trace'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.report}>
        <Hero />
        <Trace />
        <About />
        <Experience />
      </div>
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
