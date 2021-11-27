import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./aboutWork.module.css";

// export default function AboutWork(params) {
const AboutWork = React.forwardRef((props, ref) => {
  const blocks = [
    {
      name: "1. Вы оставляете заявку",
      description:
        "Опишите задачу, которую нужно выполнить, ваш бюджет и оставьте контакты для связи.",
    },
    {
      name: "2. Мы находим мастера",
      description:
        "Мы подберем для вас специалиста, который подходит по профилю задачи, стоимости услуг и другим критериям. Эта услуга для вас бесплатна.",
    },
    {
      name: "3. Мастер звонит вам и уточняет детали",
      description:
        "Обычно мастер звонит вам уже через 15 минут и договариваривается о времени, узнает подробнее про работу.",
    },
    {
      name: "4. Мастер выполняет заказ",
      description:
        "Мастер приезжает к вам в назначенное время и выполняет заказ. Если требуется несколько дней, то вызывать нового мастера не нужно",
    },
    {
      name: "5. Вы рассчитываетесь напрямую с мастером",
      description:
        "Вы рассчитываетесь лично с мастером, никаких наценок наш сервис не делает, мы не берём с вас дополнительную плату.",
    },
  ];
  return (
    <div className={styles.containerFluid} ref={ref}>
      <div className={styles.container}>
        <h2>Как мы работаем?</h2>
        <div className={styles.blocks}>
          {blocks.map((block, index) => (
            <div
              className={`${styles.block} ${
                index % 2 ? styles.left : styles.right
              }`}
              key={index}
            >
              <h4>{block.name}</h4>
              <span>{block.description}</span>
              <div className={styles.line}></div>
            </div>
          ))}
        </div>
        <div className={styles.result}>
          <h2>Что вы получаете в итоге?</h2>
          <div className={styles.resultBlock}>
            <div className={styles.mainResult}>
              Работа выполена без задержек, вы сэкономили время и деньги
            </div>
            <div className={styles.description}>
              <h4>Истории клиентов:</h4>
              <span>
                Вечером прорвало кран в ванной, помыться невозможно, воду
                набрать тоже. Нужно было починить сразу же. До ЖЭС не
                дозвониться, знакомых тоже нет, в итоге написал в омми. Мастер
                приехал через час, даже свой смеситель принес и взял меньше, чем
                я ожидал, теперь все работает!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutWork;
