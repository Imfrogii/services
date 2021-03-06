import { observer } from "mobx-react";
import { useState, useEffect, useRef } from "react";
import { FileDrop } from "react-file-drop";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import {
  DeleteIcon,
  MoneyIcon,
  OkIcon,
  SecurityIcon,
  TimeIcon,
  UploadIcon,
} from "../../images/images";
import RequestStore from "../../store/RequestStore";
import InputWithLabel from "../inputWithLabel";
import styles from "./text_tab.module.css";
import "./drag_drop.css";

const TextTab = observer(({ error, setError }) => {
  const { request } = RequestStore;
  const options = ['123', '234', '5234', '432'];
  const [enabledFiles, setEnabledFiles] = useState([]);
  const fileInput = useRef();
  const ref = useRef();

  // const handleImageChange = (e) => {
  //   request.files = [
  //     ...request.files,
  //     ...Object.values(e.target.files).map((file, index) => ({
  //       id: request.files.length + index,
  //       file,
  //     })),
  //   ];
  //   setEnabledFiles((prev) => [
  //     ...prev,
  //     ...Object.values(e.target.files).map((file) => URL.createObjectURL(file)),
  //   ]);
  //   console.log(request.files);
  // };
  const checkImg = (file) => {
    return /.*image.*/.test(file.type);
  };

  useEffect(() => {
    ref.current = true;
    if (request.files.length) {
      setEnabledFiles((prev) => [
        // ...prev,
        ...request.files.map((file) => {
          const url = URL.createObjectURL(file.file);
          return {
            id: file.id,
            file: checkImg(file.file)
              ? url
              : "https://freepngimg.com/thumb/youtube/77718-network-youtube-computer-facebook-social-video-icon.png",
          };
        }),
      ]);
    }
  }, []);

  const handleDeleteImg = (id) => {
    setEnabledFiles((prev) => {
      const temp = [...prev];
      temp.splice(
        temp.findIndex((item) => item.id === id),
        1
      );

      return [...temp];
    });
    request.files.splice(
      request.files.findIndex((item) => item.id === id),
      1
    );
  };

  const handleDrop = (files) => {
    request.files = [
      ...request.files,
      ...Object.values(files).map((file, index) => ({
        id: request.files.length + index,
        file,
      })),
    ];
    setEnabledFiles((prev) => [
      ...prev,
      ...Object.values(files).map((file, index) => {
        const url = URL.createObjectURL(file);
        return {
          id: prev.length + index,
          file: checkImg(file)
            ? url
            : "https://freepngimg.com/thumb/youtube/77718-network-youtube-computer-facebook-social-video-icon.png",
        };
        // file: checkImg(URL.createObjectURL(file))
        //   ? URL.createObjectURL(file)
        //   : "https://bennadel-cdn.com/resources/uploads/2018/download-text-as-blog-with-url-create-object-url.png",
      }),
    ]);
    console.log(enabledFiles);
  };

  return (
    <>
      <InputWithLabel
        value={request.minAbout}
        onChange={(val) => (request.minAbout = val)}
        id={"min_about"}
        labelText={"?? ?????? ?????? ?????????? ????????????? *"}
        setAllError={setError}
        required
      />
      <InputWithLabel
        value={request.workSphere}
        onChange={(val) => (request.workSphere = val)}
        id={"workSphere"}
        labelText={"???????????????? ?????????????????? ???????????? *"}
        additionalLabelText="?????? ?????????? ?????? ?????????????????????? ?????????????? ??????????????"
        setAllError={setError}
        options={options}
        required
      />
      <InputWithLabel
        value={request.bigAbout}
        onChange={(val) => (request.bigAbout = val)}
        id={"big_about"}
        labelText={"?????????????? ???????????? ?????????????????? *"}
        setAllError={setError}
        isTextArea={true}
        required
      />
      <div className={styles.price_row}>
        <InputWithLabel
          value={request.price_from}
          onChange={(val) => (request.price_from = +val)}
          id={"price_from"}
          type="number"
          labelText={"?????????? ???????? ?????? ?????? ??????????????????"}
          setAllError={setError}
          placeholder={"??????????????, BYN"}
        />
        <InputWithLabel
          value={request.price_to}
          onChange={(val) => (request.price_to = +val)}
          id={"price_to"}
          type="number"
          labelText={""}
          setAllError={setError}
          placeholder={"????????????????, BYN"}
        />
      </div>
      <div className={styles.inputWithLabel}>
        <label htmlFor="files">???????????????? ???????? ?????? ??????????</label>
        {/* <div className={styles.files}>
          <label htmlFor="files" className={styles.input_file}>
            +
          </label>
          {enabledFiles.map((img) => (
            <div key={img} className={styles.input_file}>
              {console.log(img)}
              <img src={img} alt="about" onClick={() => handleDeleteImg(img)} />
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
        </div> */}
        <FileDrop
          // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          // onFrameDrop={(event) => console.log('onFrameDrop', event)}
          // onDragOver={(event) => console.log('onDragOver', event)}
          // onDragLeave={(event) => console.log('onDragLeave', event)}
          onDrop={(files, event) => handleDrop(files)}
          className={styles.drag_drop}
        >
          <div className={styles.row}>
            <label htmlFor="files" className={styles.input_file}>
              ???????????????? ????????
              <UploadIcon />
            </label>
            <input
              type="file"
              onChange={(e) => handleDrop(e.target.files)}
              name="files"
              id="files"
              multiple
              ref={fileInput}
            />
            <span>?????? ???????????????????? ????????</span>
          </div>
          {enabledFiles.length ? (
            <div className={styles.preview}>
              {enabledFiles.map((img) => (
                <button
                  className={styles.preview_item}
                  onClick={() => handleDeleteImg(img.id)}
                  key={img.id}
                >
                  <img
                    src={img.file}
                    alt="Video"
                    // onClick={() => handleDeleteImg(img)}
                  />
                  <span>x</span>
                </button>
              ))}
            </div>
          ) : (
            <span className={styles.additional}>
              ?????????????????????? ???????? ?????? ??????????, ?????????????? ?????????????????? ?????????????????? ????????
              ????????????.
            </span>
          )}
        </FileDrop>
      </div>
      {error && (
        <span style={{ color: "red", fontSize: 22 }}>?????????????????? ????????</span>
      )}
    </>
  );
});

export default TextTab;
