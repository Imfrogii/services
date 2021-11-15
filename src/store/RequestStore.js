import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { computedFn } from "mobx-utils";

class RequestStore {
  request = {
    minAbout: "",
    bigAbout: "",
    name: "",
    tel: "",
    address: "",
    price_from: "",
    price_to: "",
    file_type: "",
    files: [],
  };
  mode = observable.box("text");
  video = observable.box(null);
  audios = observable.box(null);

  constructor() {
    makeAutoObservable(this);
  }

  startSearch = async () => {
    try {
      if (
        this.request.minAbout &&
        this.request.bigAbout &&
        this.request.name &&
        this.request.tel &&
        this.request.address
      ) {
        let data = new FormData();
        if (this.mode.get() === "text") {
          data.append("name", this.request.minAbout);
          data.append("description", this.request.bigAbout);
          if (this.request.files.length) {
            this.request.files.forEach((file) => {
              console.log(file);
              data.append("files", file.file);
            });
          }
        }
        if (this.mode.get() === "audio") {
          data.append("files", this.audios.get());
          data.append("file_type", "audio");
        }
        if (this.mode.get() === "video") {
          data.append("files", this.video.get());
        }
        data.append("customer", this.request.name);
        data.append("phone_number", this.request.tel);
        data.append("address", this.request.address);
        // if (this.request.file_type) {
        //   data.append("file_type", this.request.file_type);
        // }
        if (this.request.price_from) {
          data.append("price_from", this.request.price_from);
        }
        if (this.request.price_to) {
          data.append("price_to", this.request.price_to);
        }
        await fetch("https://ommy.by/api/order/", {
          body: data,
          method: "POST",
        }).then((response) => {
          this.audios.set(null);
          this.video.set(null);
          this.request.price_from = "";
          this.request.price_to = "";
          this.mode.set("text");
          return response.json(); // parses json
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default new RequestStore();
