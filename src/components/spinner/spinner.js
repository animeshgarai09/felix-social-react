import styles from './spinner.module.scss'
import { ReactComponent as SpinnerSVG } from "@assets/svg/spinner.svg"
import { ReactComponent as Logo } from "@assets/svg/felix.svg"

const Spinner = () => {
    return (
        <div className={styles.container}>
            <SpinnerSVG className={`${styles.spinner} ${styles.animationSpin}`} />
            <Logo className={styles.logo} />
        </div>
    )
}

export default Spinner