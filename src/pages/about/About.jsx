import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header";
import InputWithLabel from "../../components/inputWithLabel";
import { routes } from "../../constants/routes";
import RequestStore from "../../store/RequestStore";
import styles from "./about.module.css";

// function About() {
const About = observer(() => {
  const fileInput = useRef();
  const history = useHistory();
  const [enabledFiles, setEnabledFiles] = useState([]);
  const [error, setError] = useState(false);
  const { request } = RequestStore;
  const ref = useRef();
  const sendData = () => {
    if (request.minAbout && request.bigAbout) {
      history.push(routes.contact);
    } else {
      setError(true);
    }
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setEnabledFiles((prev) => [
      ...prev,
      ...Object.values(e.target.files).map((file) => URL.createObjectURL(file)),
    ]);
    request.files = e.target.files;
  };
  useEffect(() => {
    ref.current = true;
  }, []);

  useEffect(() => {
    if (request.minAbout && request.bigAbout) {
      setError(false);
    }
  }, [request.minAbout && request.bigAbout]);

  return (
    <>
      <Header />
      <Helmet>
        <title>Ommy - Оформление заявки</title>
      </Helmet>
      <div className={styles.containerFluid}>
        <form
          encType="multipart/form-data"
          method="post"
          className={styles.container}
          onSubmit={sendData}
        >
          {console.log(123, request.minAbout, 123)}
          <InputWithLabel
            value={request.minAbout}
            onChange={(val) => (request.minAbout = val)}
            id={"min_about"}
            labelText={"В чем вам нужна помощь? *"}
            setAllError={setError}
          />
          <InputWithLabel
            value={request.bigAbout}
            onChange={(val) => (request.bigAbout = val)}
            id={"big_about"}
            labelText={"Опишите задачу подробнее *"}
            setAllError={setError}
            isTextArea={true}
          />
          <div className={styles.inputWithLabel}>
            <label htmlFor="files">Добавьте фото</label>
            <div className={styles.files}>
              <label htmlFor="files" className={styles.input_file}>
                +
              </label>
              {enabledFiles.map((img) => (
                <div key={img} className={styles.input_file}>
                  <img src={img} alt="about" />
                </div>
              ))}
              <input
                type="file"
                onChange={handleImageChange}
                name="files"
                id="files"
                multiple
                ref={fileInput}
              />
            </div>
          </div>
          {error && (
            <span style={{ color: "red", fontSize: 22 }}>Заполните поля</span>
          )}
          <div className={styles.buttons}>
            <Link to={routes.home}>
              <button type="button" className={styles.buttonBack}>
                Назад
              </button>
            </Link>
            <button type="button" className={styles.button} onClick={sendData}>
              Далее
            </button>
          </div>
        </form>
      </div>
    </>
  );
});

export default About;
