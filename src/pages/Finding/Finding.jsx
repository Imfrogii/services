import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
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
            <Helmet>
                <title>Ommy - Поиск мастера</title>
            </Helmet>
            <Header />
            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.loader}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                    </div>
                    <h3 className={styles.find_spec}>Мы уже ищем специалиста, мастер скоро позвонит вам. <br />Обычно это занимает 15 минут.</h3>
                    <Link to={routes.home}>
                        <button type='button' className={styles.button}>На главную</button>
                    </Link>
                </div>
            </div>
        </>
    )
};
