import image from "../assets/Aset_halaman_Login.png";
import logo from "../assets/logo.png";
import { React, useState } from "react";
import axios from "axios";
import { RefreshIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";
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

  const HashPassword = (password) => {
    const hash = sha1.create();
    let encPassword = hash.update(secretPassword + password).hex();
    console.log(encPassword);
    return encPassword;
  };

  const ownedBuffet = () => {
    axios.get(process.env.REACT_APP_BASE_URL + "owned_buffets",{
      headers: {Authorization:Cookies.get('token')}
    })
    .then((res)=>{
      var countOnBuffets = res.data.metadata.resultset.count
      var data =  res.data.owned_buffets;
      var offerId;
      var packageName;
      var offer;
      if(countOnBuffets > 0){
        data.map((item, index)=>{
          offerId = item.offerbuffet.offer.id
          packageName = item.offerbuffet.offer.name
          offer = {
            "offerId": offerId,
            "name": packageName,
          }
          return offer
        })
        Cookies.set('offerId', offer.offerId);
        Cookies.set('package_name', offer.name);
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
      .post(process.env.REACT_APP_BASE_URL + "auth/login", data)
      .then((res) => {
        setState(FormLogin);
        Cookies.set("token", res.data.realm + " " + res.data.token);
        Cookies.set("username", res.data.first_name);
        ownedBuffet();
      })
      .catch((err) => {
        console.log(err);
        // alert(JSON.stringify(err));
        setLoading(false);
        setErrPassword(true);
      });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="hidden lg:block">
        <img src={image} alt="login_image" className="bg-cover bg-center mx-auto" />
      </div>
      <div className="flex flex-row">
        <div className="w-full mt-14 lg:mt-24">
          <img src={logo} alt="logo_gramedia" className="h-20 mx-auto" />
          <h3 className="mt-6 mb-20 md:mb-24 mx-10 md:mx-40 text-2xl font-bold text-gray-900 font-nunito">
            Masuk
          </h3>
          <form className="mx-10 md:mx-40 space-y-4">
            <div className="flex flex-col space-y-1 border-b-2">
              <label htmlFor="email" className="font-normal text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="username"
                name="username"
                className="px-4 py-2 focus:outline-none"
                onChange={(e) => setState({ username: e.target.value })}
              />
            </div>
            <div className="flex flex-col border-b-2">
              <label htmlFor="password" className="font-normal text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-4 py-2 focus:outline-none"
                onChange={(e) =>
                  setState((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            {errPassword ?
              <p className="text-red-600">
                Email atau Password yang anda masukkan tidak sesuai.
              </p>
              :
              ""
            }
            <div className="text-sm text-blue-600 font-normal">
              <a href="https://ebooks.gramedia.com/id/forgot">
                Lupa kata sandi ?
              </a>
            </div>
            <div className="text-center">
              <button
                className={
                  state.username && state.password
                    ? "bg-blue-500 px-20 py-2 mt-10 md:mt-24 rounded-md text-white font-bold flex gap-4 mx-auto"
                    : "bg-gray-100 px-20 py-2 mt-10 md:mt-24 rounded-md text-gray-500 font-bold"
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
            <div className="text-center text-sm ">
              baru di Gramedia Digital?
              <a
                href="https://ebooks.gramedia.com/id/register"
                className="text-blue-600 font-bold"
              >
                Daftar
              </a>
            </div>
          </form>
          <div className="mx-10 md:mx-40 mt-40">
            <p className="text-center text-sm sm:text-normal">
              Butuh bantuan ?{" "}
              <a
                href="https://ebooks.gramedia.com/id/faq"
                className="text-blue-600"
              >
                Hubungi Gramedia Digital Customer Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
