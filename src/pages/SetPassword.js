import image from '../assets/lupa_pass.png'
import logo from '../assets/logo.png'
import {useState} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'

const SetPasswordPage = () => {
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const checkPassword = (confirmPass) => {
        if(password !== confirmPass) {
            setErrorMessage(true)
        }
    }
    let params = useQuery();
    let paramsEmail = params ? params.get('email') : "";
    const handleSetPassword = async (id) => {
        let payload = {
            email: paramsEmail,
            password: password
        }
        axios
        .post(process.env.REACT_APP_BASE_URL+"auth/myvalue/set-password", payload)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
      };
    return(
        <div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="hidden lg:block">
                    <img src={image} alt="login_image" className="bg-cover bg-center mx-auto my-10" />
                </div>
                <div className="flex flex-row">
                    <div className="w-full mt-14 lg:mt-48">
                    <img src={logo} alt="logo_gramedia" className="h-20 mx-auto" />
                    <h3 className="mt-6 mb-20 md:mb-24 mx-10 md:mx-40 text-2xl font-bold text-black font-nunito">
                    
                    </h3>
                    <form className="mx-10 md:mx-40 space-y-4">
                        <div className="flex flex-col space-y-1 border-b-2">
                        <label htmlFor="email" className="font-nunito text-gray-600">
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="px-4 py-2 focus:outline-none font-nunito"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div className="flex flex-col border-b-2">
                        <label htmlFor="password" className="font-nunito text-gray-600">
                            Konfirmasi Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="px-4 py-2 focus:outline-none font-nunito"
                            onChange={(e) => checkPassword(e.target.value)}
                        />
                        </div>
                        {errorMessage ?
                        <p className="text-red-600 text-base font-nunito">
                            Kata sandi tidak dan konfirmasi kata sandi tidak sama.
                        </p>
                        :
                        ""
                        }
                        <div className="text-center">
                        <button className="bg-blue-500 px-14 py-2 mt-10 md:mt-24 rounded-md text-white font-bold flex gap-4 mx-auto font-nunito" onClick={handleSetPassword}>
                            Ubah Kata Sandi
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetPasswordPage;