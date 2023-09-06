import styles from './page.module.css'
import LeftDrawer from './components/LeftDrawer'
import UserDisplay from './components/UserDisplay'

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <LeftDrawer platform="desktop" />
        <UserDisplay />
      </div>
    </>
  )
}
