import { computed, observable, action, makeAutoObservable, toJS } from "mobx";
import { computedFn } from "mobx-utils";

class RequestStore {
  request = {
    minAbout: "",
    bigAbout: "",
    name: "",
    tel: "",
    address: "",
    files: [],
  };

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
        data.append("name", this.request.minAbout);
        data.append("customer", this.request.name);
        data.append("phone_number", this.request.tel);
        data.append("address", this.request.address);
        data.append("description", this.request.bigAbout);
        if (this.request.files) {
          Array.from(this.request.files).forEach((file) => {
            data.append("images", file);
          });
        }
        await fetch("https://ommy.by/api/order/", {
          body: data,
          method: "POST",
        }).then(function (response) {
          return response.json(); // parses json
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default new RequestStore();
