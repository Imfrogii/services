import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useHistory } from "react-router-dom";
import Header from "../../components/header";
import InputWithLabel from "../../components/inputWithLabel";
import { routes } from "../../constants/routes";
import styles from "./contact.module.css";

export default function Contact({
  name,
  setName,
  tel,
  setTel,
  address,
  setAddress,
  sendEmail,
}) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const sendContacts = () => {
    if (name && tel && address && checked) {
      sendEmail();
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    if (name && tel && address) {
      setError(false);
    }
  }, [name, tel, address]);
  return (
    <>
      <Helmet>
        <title>Ommy - Оформление заявки</title>
      </Helmet>
      <div className={styles.containerFluid}>
        <div className={styles.container}>
          <h1 className={styles.namePage}>Контакты</h1>
          <InputWithLabel
            val={name}
            onChange={setName}
            id={"name"}
            labelText={"Представьтесь, пожалуйста *"}
            setAllError={setError}
          />
          <InputWithLabel
            val={tel}
            onChange={setTel}
            id={"mobile"}
            labelText={"Ваш номер телефона *"}
            setAllError={setError}
            type={"tel"}
          />
          <InputWithLabel
            val={address}
            onChange={setAddress}
            id={"address"}
            labelText={"Ваш адрес *"}
            setAllError={setError}
          />
          <div className={styles.div_checkbox}>
            <input
              type="checkbox"
              id="politics"
              onChange={() => setChecked((prev) => !prev)}
              value={checked}
            />
            <label htmlFor="politics">
              Я принимаю <NavLink to='/politics'>политику кофиденциальности</NavLink>{' '}
               и согласен на передачу моих контактов третьему
              лицу (мастеру) для связи со мной.
            </label>
          </div>
          {error && (
            <span
              style={{ color: "red", fontSize: 22, margin: "20px auto 0 auto" }}
            >
              Заполните поля
            </span>
          )}
          <div className={styles.buttons}>
            <Link to={routes.about}>
              <button type="button" className={styles.buttonBack}>
                Назад
              </button>
            </Link>
            <button
              type="button"
              className={styles.button}
              onClick={sendContacts}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
