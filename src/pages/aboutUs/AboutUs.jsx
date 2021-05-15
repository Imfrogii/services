import { Link } from "react-router-dom";
import Header from "../../components/header"
import { routes } from "../../constants/routes";
import styles from './aboutUs.module.css'

export default function AboutUs() {
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
                    <div className={styles.blocks}>
                        {blocks.map(item => (
                            <div className={styles.block}>
                                <img src={item.img} alt="" />
                                <h1 className={styles.name}>{item.name}</h1>
                                <span className={styles.about}>{item.about}</span>
                            </div>
                        ))}
                    </div>
                    <Link to={routes.about}>
                        <button type='button' className={styles.button}>Оставить заявку</button>
                    </Link>
                    <Link to={routes.home}>
                        <button type='button' className={styles.buttonBack}>Назад</button>
                    </Link>
                </div>
            </div>
        </>
    )
};
