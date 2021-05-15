import { useState } from "react";
import { Redirect, Route, Switch } from "react-router"
import emailjs from 'emailjs-com';
import { routes } from "../constants/routes"
import About from "./about"
import Home from "./home"
import Contact from "./contact";
import AboutUs from "./aboutUs";
import Finding from "./Finding";
// init("user_6jARMg7P8wTNLTtJh1WLZ");

export default function Router() {
    const [minAbout, setMinAbout] = useState('');
    const [bigAbout, setBigAbout] = useState('');

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');

    const [files, setFiles] = useState(null);
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send('service_ucbjjti', 'template_damd5x8', { minAbout, bigAbout }, 'user_6jARMg7P8wTNLTtJh1WLZ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <Switch>
            <Route path={routes.home} exact>
                <Home />
            </Route>
            <Route path={routes.about} exact>
                <About minAbout={minAbout} setMinAbout={setMinAbout} bigAbout={bigAbout} setBigAbout={setBigAbout} setFiles={setFiles} sendEmail={sendEmail} />
            </Route>
            <Route path={routes.contact} exact>
                <Contact name={name} setName={setName} tel={tel} setTel={setTel} address={address} setAddress={setAddress} />
            </Route>
            <Route path={routes.aboutUs} exact>
                <AboutUs />
            </Route>
            <Route path={routes.start_search} exact>
                <Finding />
            </Route>
            <Redirect from='/' to='/main' />
        </Switch>
    )
}