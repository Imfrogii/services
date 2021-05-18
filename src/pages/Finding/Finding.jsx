import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header"
import { routes } from "../../constants/routes";
import styles from './finding.module.css'

export default function Finding() {
    const fileInput = useRef();
    const history = useHistory();
    const [enabledFiles, setEnabledFiles] = useState([]);


    return (
        <>
            <Header />
            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.loader}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                    </div>
                    <Link to={routes.home}>
                        <button type='button' className={styles.button}>На главную</button>
                    </Link>
                </div>
            </div>
        </>
    )
};
