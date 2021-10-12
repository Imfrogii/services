import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import { routes } from "../../constants/routes";
import styles from "./home.module.css";

export default function Home(params) {
  const services = [
    "Сантехника",
    "Электрика",
    "Уборка",
    "Услуги грузчиков",
    "Слесарные работы",
    "Ремонт техники",
    "Готовка",
    "Ремонт",
    "Покраска",
    "Выездной автосервис",
  ];
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Ommy - Сервис поиска мастеров в сфере бытовых и ремонтных услуг
        </title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="Поиск проверенных мастеров в сфере ремонтных и бытовых услуг. Оставьте заявку всего за 1 минуту и сэкономьте до 40% за счет работы с частным специалистом"
        />
        <meta
          name="keywords"
          content="бытовые косметические услуги, бытовые услуги, бытовые услуги в городе, бытовые услуги каждому, бытовые услуги населению, бытовые услуги производственные услуги, бытовые услуги ремонт, бытовые услуги цена, доступные бытовые услуги, коммунально бытовые услуги, компании оказывающие бытовые услуги, компания бытовых услуг, мастера бытовых услуг, мелкие бытовые услуги, оказание бытовых услуг, оказание бытовых услуг населению, оказание мелких бытовых услуг, оказание социально бытовых услуг, оказываем бытовые услуги, организации бытовые услуги, предоставление бытовых услуг, работа бытовые услуги, социально бытовые услуги, услуги +по вывозу бытовых отходов, услуги бытовая техника, услуги бытового обслуживания, услуги мелкого бытового ремонта, услуги ремонта бытовой техники, фирмы бытовых услуг, центр бытовых услуг"
        />
      </Helmet>
      <Header />
      <div className={styles.containerFluid}>
        <div className={styles.container}>
          <h1 className={styles.mainInfo}>
            <div className={styles.relative}>
              Подбор мастера в сфере ремонтных и бытовых услуг
            </div>
          </h1>
          <span className={styles.about}>
            Оставьте заявку всего в пару кликов и найдите мастера уже через 15
            минут. Выезд мастера в течение часа.
          </span>

          <Link to={routes.about}>
            <button type="button" className={styles.button}>
              Оставить заявку
            </button>
          </Link>
          <div className={styles.about_services}>
            <h3>Виды услуг</h3>
            <ul className={styles.services}>
              {services.map((item, index) => (
                <li key={index} className={styles.service}>
                  {item}
                </li>
              ))}
              <li className={styles.spread}>...</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
