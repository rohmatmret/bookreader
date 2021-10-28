import image from "../assets/Login.png";
import logo from "../assets/logo.png";
import { React, useState } from "react";
import axios from "axios";
import { RefreshIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import LogoMyValue from '../assets/myvalue.png';
import { v4 as uuidv4 } from 'uuid';
const sha1 = require("js-sha1");

require("dotenv").config();

const LoginForm = () => {
  let FormLogin = {
    username: null,
    password: null,
  };

  const [state, setState] = useState(FormLogin);
  const [loading, setLoading] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const secretPassword = process.env.REACT_APP_NOT_SECRET_CODE;
  const uuid = uuidv4();
  Cookies.set("uuid", uuid)

  const HashPassword = (password) => {
    const hash = sha1.create();
    let encPassword = hash.update(secretPassword + password).hex();
    return encPassword;
  };

  const ownedBuffet = () => {
    axios.get(process.env.REACT_APP_BASE_URL+"owned_buffets",{
      headers: {Authorization:Cookies.get('token')}
    })
    .then((res)=>{
      var countOnBuffets = res.data.metadata.resultset.count
      var data =  res.data.owned_buffets;
      var offerId;
      var packageName;
      var offer = [];
      if(countOnBuffets > 0){
        data.map((item, index)=>{
          offerId = item.offerbuffet.offer.id
          packageName = item.offerbuffet.offer.name
          offer.push({
            "offerId": offerId,
            "name": packageName,
          })
          return offer
        })
        Cookies.set("offer", JSON.stringify(offer));
        setLoading(false);
        window.location.href = "/dashboard";
      }else{
        setLoading(false);
        window.location.href = "/dashboard";
      }
    })
    .catch((err) => {
      console.log(err);
      alert(JSON.stringify(err));
      setLoading(false);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let encPassword = HashPassword(state.password);

    let data = {
      username: state.username,
      password: encPassword,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL+"auth/login", data)
      .then((res) => {
        setState(FormLogin);
        Cookies.set("token", res.data.realm + " " + res.data.token);
        Cookies.set("username", res.data.first_name);
        Cookies.set("email", res.data.email)
        ownedBuffet();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrPassword(true);
      });
  };

  const handleSSOMyValue = () => {
    window.open(`https://auth.ovaltech.id/auth/authorize?client_id=EbooksGramedia&redirect_uri=${process.env.REACT_APP_BASE_URL_DOMAIN}/authorized&state=${uuid}`)
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="hidden lg:block">
        <img src={image} alt="login_image" className="bg-cover bg-center mx-auto my-10" />
      </div>
      <div className="flex flex-row">
        <div className="w-full mt-14 lg:mt-24">
          <img src={logo} alt="logo_gramedia" className="h-20 mx-auto" />
          <h3 className="mt-6 mb-20 md:mb-24 mx-10 md:mx-40 text-2xl font-bold text-black font-nunito">
           
          </h3>
          <form className="mx-10 md:mx-40 space-y-4">
            <div className="flex flex-col space-y-1 border-b-2">
              <label htmlFor="email" className="font-nunito text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                className="px-4 py-2 focus:outline-none font-nunito"
                onChange={(e) => setState({ username: e.target.value })}
              />
            </div>
            <div className="flex flex-col border-b-2">
              <label htmlFor="password" className="font-nunito text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-4 py-2 focus:outline-none font-nunito"
                onChange={(e) =>
                  setState((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            {errPassword ?
              <p className="text-red-600 text-base font-nunito">
                Email atau Password yang anda masukkan tidak sesuai.
              </p>
              :
              ""
            }
            <div className="text-sm text-blue-500 font-bold font-nunito">
              <a href="https://ebooks.gramedia.com/id/forgot">
                Lupa Kata Sandi
              </a>
            </div>
            <div className="text-center">
              <button
                className={
                  state.username && state.password
                    ? "bg-blue-500 px-24 py-2 mt-10 md:mt-24 rounded-md text-white font-bold flex gap-4 mx-auto font-nunito"
                    : "bg-gray-100 px-24 py-2 mt-10 md:mt-24 rounded-md text-gray-500 font-bold font-nunito"
                }
                onClick={handleSubmit}
              >
                <RefreshIcon
                  className={
                    loading ? "animate-spin w-5 h-5 text-white" : "hidden"
                  }
                />
                Masuk
              </button>
            </div>
          </form>
          <div className="text-center my-4">
            atau masuk dengan
          </div>
          <div className="text-center my-4">
            <button className="shadow-md px-6 py-2 flex mx-auto rounded-md text-gray-700" onClick={handleSSOMyValue}>
              <img src={LogoMyValue} alt="my-value" />
              Masuk dengan MyValue
            </button>
          </div>
          <div className="mx-10 md:mx-40 mt-40">
            <p className="text-center text-sm sm:text-normal font-nunito font-bold">
              Butuh bantuan ?{" "}
              <a
                href="https://ebooks.gramedia.com/id/faq"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                Hubungi Customer Service Gramedia Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
