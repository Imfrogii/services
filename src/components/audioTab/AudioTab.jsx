import { observer } from "mobx-react";
import { useState, useEffect, useRef, createRef } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import {
  DeleteIcon,
  MicroIcon,
  MoneyIcon,
  OkIcon,
  SecurityIcon,
  TimeIcon,
} from "../../images/images";
import RequestStore from "../../store/RequestStore";
import InputWithLabel from "../inputWithLabel";
import styles from "./audio_tab.module.css";

const AudioTab = observer(({ error, setError }) => {
  const { request, audios } = RequestStore;
  const [isRecording, setIsRecording] = useState(false);
  const fileInput = useRef();
  const [audio, setAudio] = useState(
    audios.get() ? URL.createObjectURL(audios.get()) : false
  );
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start(1);
      const someChunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          someChunks.push(e.data);
        }
        mediaRecorder.onstop = (e) => {
          saveAudio(someChunks);
          setIsRecording(false);
          setMediaRecorder(false);
        };
      };
    }
  }, [mediaRecorder]);

  const startRecording = async (e) => {
    e.preventDefault();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMediaRecorder(new MediaRecorder(stream));
  };

  const stopRecording = (e) => {
    e.preventDefault();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 10);
  };

  const saveAudio = (someChunks) => {
    // convert saved chunks to blob
    const blob = new Blob(someChunks, { type: someChunks[0].type });
    // generate video url from blob
    setAudio(URL.createObjectURL(blob));
    audios.set(
      // ...audios.get(),
      new File(
        [blob],
        `audiofile.${
          someChunks[0].type.split("audio/").join("").split(";")[0]
        }`,
        { type: someChunks[0].type }
      )
    );
  };

  const removeAudio = () => {
    audios.set(null);
    setAudio(false);
  };

  return (
    <div className={styles.recorder}>
      <button
        className={`${styles.start_button} ${isRecording ? styles.active : ""}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        <MicroIcon />
      </button>
      {audio ? (
        <div className={styles.audio_div}>
          <audio src={audio} className={styles.audio} controls></audio>
          <button className={styles.delete_audio} onClick={removeAudio}>
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <span className={styles.text}>
          Нажмите кнопку, чтобы оставить голосовую заявку. Опишите вашу задачу и
          необходимые детали.
        </span>
      )}
      <div className={styles.price_row}>
        <InputWithLabel
          value={request.price_from}
          onChange={(val) => (request.price_from = +val)}
          id={"price_from"}
          type="number"
          labelText={"Какая цена для вас приемлима"}
          setAllError={setError}
          placeholder={"Минимум, BYN"}
        />
        <InputWithLabel
          value={request.price_to}
          onChange={(val) => (request.price_to = +val)}
          id={"price_to"}
          type="number"
          labelText={""}
          setAllError={setError}
          placeholder={"Максимум, BYN"}
        />
      </div>
    </div>
  );
});

export default AudioTab;
