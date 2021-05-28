import { Link } from "react-router-dom";
import Header from "../../components/header"
import { routes } from "../../constants/routes";
import styles from './home.module.css'

export default function Home(params) {
    const services = ['Сантехника', 'Электрика', 'Уборка', 'Услуги грузчиков', 'Слесарные работы', 'Ремонт техники', 'Готовка', 'Ремонт', 'Покраска', 'Выездной автосервис'];
    console.log('HOME PAGE');
    return (
        <>
            <Header />
            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <h1 className={styles.mainInfo}>
                        <div className={styles.relative}>Подбор проверенных
                             <span className={styles.labeled} data-tooltip={"Мы отбираем частных мастеров, с которыми сотрудничаем. При добавлении мастеров в нашу базу мы изучаем их опыт, примеры работ, профиль и другие критерии, чтобы оставить только качественных мастеров."}>?</span> 
                            </div>
                             мастеров в сфере ремонтных бытовых услуг
                    </h1>
                    <span className={styles.about}>
                        Оставьте заявку всего за 1 минуту и <span className={styles.labeledText} data-tooltip={
                            `Последний заказ: Вывоз сгоревшего дома
                        Стоимость на рынке: более 2000 BYN
                        Итоговая стоимость у частного мастера: 1300 BYN
                        Экономия: 700 BYN`}>сэкономьте до 40%</span> стоимости заказа за счет работы с частным специалистом. Выполнение заказа с нуля и под ключ, все возьмет на себя мастер.
                    </span>

                    <Link to={routes.about}>
                        <button type='button' className={styles.button}>Оставить заявку</button>
                    </Link>
                    <div className={styles.about_services}>
                        <h3>Виды услуг</h3>
                        <ul className={styles.services}>
                            {services.map((item, index) => (
                                <li key={index} className={styles.service}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};
