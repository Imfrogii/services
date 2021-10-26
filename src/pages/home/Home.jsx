import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import { routes } from "../../constants/routes";
import styles from "./home.module.css";
import RequestStore from "../../store/RequestStore";
import { SendImg } from "../../images/images";
import { observer } from "mobx-react";
import AboutMainPage from "../../components/aboutMainPage";
import AboutWork from "../../components/aboutWork";

// export default function Home(params) {
const Home = observer(() => {
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
  const { request } = RequestStore;
  const resentRequests = [
    "Собрать шкаф",
    "Отремонтировать стиралку",
    "Помочь вывести сгоревший дом",
  ];
  const history = useHistory();
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
              Самая быстрая помощь для тех, кто не откладывает на потом
            </div>
          </h1>
          <span className={styles.about}>
            Оставьте заявку всего в пару кликов и мастер свяжется с вами уже
            через 15 минут.
          </span>

          <div className={styles.input_with_img}>
            <input
              type="text"
              className={styles.input}
              value={request.minAbout}
              onChange={(e) => (request.minAbout = e.target.value)}
              placeholder="В чём вам нужна помощь?"
            />
            <Link to={routes.about}>
              <button type="button" className={styles.img_block}>
                <SendImg />
              </button>
            </Link>
          </div>

          <div className={styles.about_services}>
            <h3>Вам помогут с любой работой</h3>
            <ul className={styles.services}>
              {services.map((item, index) => (
                <li key={index} className={styles.service}>
                  {item}
                </li>
              ))}
              <li className={styles.spread}>...</li>
            </ul>
          </div>

          <div className={styles.resentRequests}>
            <h3>Например, недавние заявки</h3>
            <div
              className={styles.input_with_img}
              onClick={() => {
                request.minAbout = "";
                history.push(routes.about);
              }}
            >
              {/* <Link to={routes.about}> */}
              <input
                className={styles.input}
                placeholder="Мне нужно..."
                disabled
              />
              <button type="button" className={styles.img_block}>
                <SendImg />
              </button>
            </div>

            {resentRequests.map((resentRequest) => (
              <div key={resentRequest}>
                <div
                  className={styles.input_with_img}
                  onClick={() => {
                    request.minAbout = resentRequest;
                    history.push(routes.about);
                  }}
                >
                  <input
                    className={styles.input}
                    placeholder={resentRequest}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>

          <AboutMainPage />
          <AboutWork />
          <div className={styles.needMaster}>
            <h4>Вам нужен мастер?</h4>
            <Link to={routes.about}>
              <button type="button" className={styles.button}>
                Оставить заявку
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
export default Home;
