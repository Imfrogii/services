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
  VideoIcon,
} from "../../images/images";
import RequestStore from "../../store/RequestStore";
import InputWithLabel from "../inputWithLabel";
import styles from "./video_tab.module.css";

const VideoTab = observer(({ error, setError }) => {
  const { request, video } = RequestStore;
  const [enabledFiles, setEnabledFiles] = useState(
    video.get() ? URL.createObjectURL(video.get()) : []
  );
  const [isRecording, setIsRecording] = useState(false);
  const fileInput = useRef();

  const handleVideoChange = (e) => {
    console.log(e.target.files);
    video.set(...Object.values(e.target.files));
    // request.files = [...request.files, ...Object.values(e.target.files)];
    console.log(request.files);

    setEnabledFiles(
      ...Object.values(e.target.files).map((file) => URL.createObjectURL(file))
    );
  };

  const removeVideo = () => {
    video.set(null);
    setEnabledFiles([]);
  };

  return (
    <div className={styles.recorder}>
      <label
        htmlFor="file_input"
        className={`${styles.start_button} ${isRecording ? styles.active : ""}`}
        // onClick={(e) => e.preventDefault()}
      >
        <VideoIcon />
      </label>
      <input
        id="file_input"
        type="file"
        ref={fileInput}
        onChange={handleVideoChange}
        className={styles.hidden}
      />
      {enabledFiles.length ? (
        <div className={styles.audio_div}>
          <video src={enabledFiles} className={styles.video} controls></video>
          <button className={styles.delete_audio} onClick={removeVideo}>
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <span className={styles.text}>
          Для записи видео нажмите кнопку и выберите функцию использования
          камеры. На видео опишите вашу задачу и необходимые детали.{" "}
        </span>
      )}
      <div className={styles.price_row}>
        <InputWithLabel
          value={request.price_from}
          onChange={(val) => (request.price_from = +val)}
          id={"price_from"}
          type="number"
          labelText={"Какая цена для вас приемлема"}
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

export default VideoTab;
