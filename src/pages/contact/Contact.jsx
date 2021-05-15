import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/header"
import InputWithLabel from "../../components/inputWithLabel";
import { routes } from "../../constants/routes";
import styles from './contact.module.css'

export default function Contact({ name, setName, tel, setTel, address, setAddress }) {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const sendContacts = () => {
        history.push(routes.start_search);
    }
    useEffect(() => {
        if (name && tel && address) {
            setError(false)
        }
    }, [name, tel, address])
    return (
        <>
            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <h1 className={styles.namePage}>
                        Контакты
                   </h1>
                    {/* <div className={styles.inputWithLabel}>
                        <label htmlFor="name">Представьтесь, пожалуйста</label>
                        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div> */}
                    <InputWithLabel val={name} onChange={setName} id={'name'} labelText={'Представьтесь, пожалуйста'} setAllError={setError} />
                    <InputWithLabel val={tel} onChange={setTel} id={'mobile'} labelText={'Ваш номер телефона'} setAllError={setError} type={'tel'}/>
                    <InputWithLabel val={address} onChange={setAddress} id={'address'} labelText={'Ваш адрес'} setAllError={setError} />
                    {/* <div className={styles.inputWithLabel}>
                        <label htmlFor="mobile">Ваш номер телефона*</label>
                        <input type="tel" id='mobile' value={tel} onChange={(e) => setTel(e.target.value)} pattern="+?[0-9]{12}" required />
                    </div> */}
                    {/* <div className={styles.inputWithLabel}>
                        <label htmlFor="address"> Ваш адрес</label>
                        <input type="text" id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div> */}
                    <div className={styles.div_checkbox}>
                        <input type="checkbox" id='politics' onChange={() => setChecked(prev => !prev)} value={checked} />
                        <label htmlFor="politics">Я принимаю политику кофиденциальности и согласен на передачу моих контактов третьему лицу (мастеру) для связи со мной.</label>
                    </div>
                    <button type='button' className={styles.button} onClick={sendContacts}
                        disabled={!checked || error}
                    >Отправить</button>
                </div>
            </div>
        </>
    )
};
