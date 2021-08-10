import image from "../assets/Aset_halaman_Login.png";
import logo from "../assets/logo.png";
import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { func } from "prop-types";
const sha1 = require("js-sha1");

function Dashboard() {
  let history = useHistory();
  history.push("/dashboard");
}
const LoginForm = () => {
  let FormLogin = {
    username: null,
    password: null,
  };

  const [state, setState] = useState(FormLogin);

  const secretPassword = "5gvi-ojhgf%^&YGBNeds1{";

  const HashPassword = (password) => {
    const hash = sha1.create();
    let encPassword = hash.update(secretPassword + password).hex();
    return encPassword;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let encPassword = HashPassword(state.password);

    let data = {
      username: state.username,
      password: encPassword,
    };

    axios
      .post(
        "https://scoopadm.apps-foundry.com/scoopcor/api/v1/auth/login",
        data
      )
      .then((res) => {
        setState(FormLogin);
        localStorage.setItem("token", res.data.realm + " " + res.data.token);
        localStorage.setItem("username", res.data.first_name);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="hidden lg:block">
        <img src={image} alt="login_image" className="bg-cover bg-center" />
      </div>
      <div className="flex flex-row">
        <div className="w-full mt-14 lg:mt-24">
          <img src={logo} alt="logo_gramedia" className="h-20 mx-auto" />
          <h3 className="mt-6 mb-20 md:mb-24 mx-10 md:mx-40 text-2xl font-bold text-gray-900">
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
            <div className="text-sm text-blue-600 font-normal">
              <a href="https://ebooks.gramedia.com/id/forgot">
                Lupa kata sandi ?
              </a>
            </div>
            <div className="text-center">
              <button
                className="bg-gray-100 px-24 py-2 mt-10 md:mt-24 rounded-md text-gray-500 font-bold"
                onClick={handleSubmit}
              >
                Masuk
              </button>
            </div>
            <div className="text-center text-sm ">
              baru di Gramedia Digital?
              <a href="#" className="text-blue-600 font-bold">
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
