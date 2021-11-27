import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useHistory } from "react-router-dom";
import Header from "../../components/header";
import InputWithLabel from "../../components/inputWithLabel";
import Loader from "../../components/loader";
import { routes } from "../../constants/routes";
import RequestStore from "../../store/RequestStore";
import styles from "./contact.module.css";

// export default function Contact() {
const Contact = observer(() => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const ref = useRef();
  const { request, startSearch } = RequestStore;
  const history = useHistory();

  const sendContacts = async () => {
    if (request.name && request.tel && request.address && checked) {
      setIsFetching(true);
      await startSearch();
      request.minAbout = "";
      request.bigAbout = "";
      request.name = "";
      request.tel = "";
      request.address = "";
      request.files = [];
      setIsFetching(false);
      history.push(routes.start_search);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    if (request.name && request.tel && request.address && checked) {
      setError(false);
    }
  }, [request, checked]);

  useEffect(() => {
    if (!request.bigAbout || !request.minAbout) {
      history.push(routes.about);
    }
    ref.current = true;
  }, []);
  return (
    <>
      <Helmet>
        <title>Ommy - Оформление заявки</title>
      </Helmet>
      <div className={styles.containerFluid}>
        <div className={styles.container}>
          <h1 className={styles.namePage}>Контакты</h1>
          <InputWithLabel
            value={request.name}
            onChange={(val) => (request.name = val)}
            id={"name"}
            labelText={"Представьтесь, пожалуйста *"}
            setAllError={setError}
            required
          />
          <InputWithLabel
            value={request.tel}
            onChange={(val) => (request.tel = val)}
            id={"mobile"}
            labelText={"Ваш номер телефона *"}
            setAllError={setError}
            type={"tel"}
            required
          />
          <InputWithLabel
            value={request.address}
            onChange={(val) => (request.address = val)}
            id={"address"}
            labelText={"Ваш адрес *"}
            setAllError={setError}
            required
          />

          <div
            className={
              styles.div_checkbox +
              ` ${!checked && error ? styles.errored : ""}`
            }
          >
            <input
              type="checkbox"
              id="politics"
              onChange={() => setChecked((prev) => !prev)}
              value={checked}
              required
            />
            <label htmlFor="politics">
              Я принимаю{" "}
              <NavLink to="/politics">политику кофиденциальности</NavLink> и
              согласен на передачу моих контактов третьему лицу (мастеру) для
              связи со мной.
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
      {isFetching ? <Loader /> : ""}
    </>
  );
});
export default Contact;
