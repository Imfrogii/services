import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import emailjs from "emailjs-com";
import { routes } from "../constants/routes";
import About from "./about";
import Home from "./home";
import Contact from "./contact";
import AboutUs from "./aboutUs";
import Finding from "./Finding";
// init("user_6jARMg7P8wTNLTtJh1WLZ");

export default function Router() {
  const [minAbout, setMinAbout] = useState("");
  const [bigAbout, setBigAbout] = useState("");

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  console.log("ROUTER");

  const [files, setFiles] = useState(null);
  const sendEmail = async () => {
    if (minAbout && bigAbout && name && tel && address) {
      let data = new FormData();
      data.append("name", minAbout);
      data.append("customer", name);
      data.append("phone_number", tel);
      data.append("address", address);
      data.append("description", bigAbout);
      if (files) {
        Array.from(files).forEach(file => {
          data.append("images", file);
        })
      }
      await fetch("https://ommy.by/api/order/", {
        // URL
        body: data, // data you send.
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
      }).then(function (response) {
        // manipulate response object
        // check status @ response.status etc.
        console.log(response, 123123);
        history.push(routes.start_search);

        return response.json(); // parses json
      });
    }
  };

  return (
    <Switch>
      <Route path={routes.home} exact>
        <Home />
      </Route>
      <Route path={routes.about} exact>
        <About
          minAbout={minAbout}
          setMinAbout={setMinAbout}
          bigAbout={bigAbout}
          setBigAbout={setBigAbout}
          setFiles={setFiles}
        />
      </Route>
      <Route path={routes.contact} exact>
        <Contact
          name={name}
          setName={setName}
          tel={tel}
          setTel={setTel}
          address={address}
          setAddress={setAddress}
          sendEmail={sendEmail}
        />
      </Route>
      <Route path={routes.aboutUs} exact>
        <AboutUs />
      </Route>
      <Route path={routes.start_search} exact>
        <Finding />
      </Route>
      <Redirect from="/" to="/main" />
    </Switch>
  );
}
