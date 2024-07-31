import styles from './card.module.css'
import { BsSendPlusFill } from "react-icons/bs";


const card = () => (
    <div className={styles.container}>
        <BsSendPlusFill size={24}/>
        <div className={styles.texts}>
            <span className={styles.title}>Total SMS</span>
            <span className={styles.number}>100,000</span>
            <span className={styles.details}>
                <span className={styles.positive}>4%</span> more than previous yr
            </span>
        </div>
    </div>
);


export default card;