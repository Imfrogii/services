import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header";
import InputWithLabel from "../../components/inputWithLabel";
import TextTab from "../../components/textTab";
import { routes } from "../../constants/routes";
import RequestStore from "../../store/RequestStore";

import styles from "./about.module.css";
import { MicroIcon, TextIcon, VideoIcon } from "../../images/images";
import AudioTab from "../../components/audioTab";
import VideoTab from "../../components/videoTab";

// function About() {
const About = observer(() => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const { request, video, mode, audios } = RequestStore;
  const sendData = () => {
    if (mode.get() === "audio") {
      request.minAbout = " ";
      request.bigAbout = " ";
      request.file_type = "audio";
    }
    if (mode.get() === "video") {
      request.minAbout = " ";
      request.bigAbout = " ";
      request.file_type = "video";
    }
    if (request.minAbout && request.bigAbout) {
      history.push(routes.contact);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (request.minAbout && request.bigAbout) {
      setError(false);
    }
  }, [request.minAbout && request.bigAbout]);

  const buttons = [
    {
      name: "text",
      img: <TextIcon />,
      alt: "Text",
    },
    {
      name: "video",
      img: <VideoIcon />,
      alt: "Video",
    },
    {
      name: "audio",
      img: <MicroIcon />,
      alt: "Microphone",
    },
  ];

  return (
    <>
      <Header />
      <Helmet>
        <title>Ommy - Оформление заявки</title>
      </Helmet>
      <div className={styles.containerFluid}>
        <div className={styles.tabs}>
          {buttons.map((button) => (
            <button
              key={button.name}
              className={`${
                button.name === "text" ? styles.tab_button2 : styles.tab_button
              } ${button.name === mode.get() ? styles.active : ""}`}
              onClick={() => mode.set(button.name)}
            >
              {/* <img src={button.img} alt={button.alt} /> */}
              {/* {button.icon} */}
              {button.img}
            </button>
          ))}
        </div>
        <form
          encType="multipart/form-data"
          method="post"
          className={styles.container}
          onSubmit={sendData}
        >
          {mode.get() === "text" ? (
            <TextTab error={error} setError={setError} />
          ) : mode.get() === "audio" ? (
            <AudioTab error={error} setError={setError} />
          ) : (
            <VideoTab error={error} setError={setError} />
          )}
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.buttonBack}
              onClick={() => {
                request.minAbout = "";
                request.bigAbout = "";
                request.files = [];
                video.set(null);
                audios.set(null);
                history.push(routes.home);
              }}
            >
              Назад
            </button>
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
