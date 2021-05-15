import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header"
import { routes } from "../../constants/routes";
import styles from './finding.module.css'

export default function Finding() {
    const fileInput = useRef();
    const history = useHistory();
    const [enabledFiles, setEnabledFiles] = useState([]);
    const sendData = (e) => {
        e.preventDefault();
        // sendEmail(e);
        history.push(routes.contact);
    }
    const handleImageChange = (e) => {
        console.log(e.target.files);
        setEnabledFiles(prev => [...prev, ...Object.values(e.target.files).map(file => URL.createObjectURL(file))]);
    }
    const blocks = [{
        name: "Цены",
        about: 'Мастер сам расчитает стоимость услуги индивидуально для вас до начала работ и вы договоритесь с ним о цене, которая вас устроит.',
        img: 'dollar.png'
    },
    {
        name: "Условия",
        about: 'Мы бесплатно подыщем подходящего вам частного мастера, он свяжется с вами и выполнит работу. Вы производите оплату напрямую мастеру.',
        img: 'uslovia.png'
    },
    {
        name: "Мастера",
        about: 'В нашей базе исключительно частные мастера, которые прошли проверку: имеют опыт работы, положительные отзывы и культурны в общении',
        img: 'masters.png'
    }]
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
