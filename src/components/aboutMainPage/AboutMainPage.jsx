import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import { MoneyIcon, OkIcon, SecurityIcon, TimeIcon } from "../../images/images";
import styles from "./aboutMainPage.module.css";

const AboutMainPage = React.forwardRef((props, ref) => {
  const blocks = [
    {
      name: "Вы сэкономите Время",
      description: "Вам нужно сделать всего пару кликов, чтобы оставить заявку",
      img: <TimeIcon />,
    },
    {
      name: "Вы сэкономите Деньги",
      description:
        "Обычно стоимость работы частного мастера дешевле до 40%, так как нет наценок",
      img: <MoneyIcon />,
    },
    {
      name: "Вы сэкономите Нервы",
      description:
        "Вам не нужно самостоятельно искать и договариваться с мастерами",
      img: <SecurityIcon />,
    },
    {
      name: "Бесплатный подбор мастера",
      description:
        "Подбор мастера для вас полностью бесплатный, вы рассчитываетесь с мастером напрямую",
      img: <OkIcon />,
    },
  ];
  return (
    <div className={styles.containerFluid} ref={ref}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Почему вам стоит оставить у нас заявку?</h2>
          <span>
            Сервис Ommy создан для того, чтобы людям не приходилось часами
            вызванивать мастера, ждать до понедельника и тратить огромные
            деньги. - Мы хотим помочь вам забыть о сложностях и сделать все
            быстро
          </span>
        </div>
        <div className={styles.mainInfo}>
          <h3>Что вы получите?</h3>
          <div className={styles.blocks}>
            {blocks.map((block) => (
              <div className={styles.block} key={block.name}>
                {block.img}
                <h4>{block.name}</h4>
                <span>{block.description}</span>
              </div>
            ))}
          </div>
        </div>
        <Link to={routes.about}>
          <button type="button" className={styles.button}>
            Оставить заявку
          </button>
        </Link>
      </div>
    </div>
  );
});

export default AboutMainPage;
