import React from 'react';
import ErrorPage from './assets/404.png';
import './App.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div>
            <img src={ErrorPage} alt="404" className="cover mx-auto"/>
            <div className="absolute left-20 top-24">
                <span className="text-7xl font-nunito font-bold">Whoops !</span>
                <p className="text-normal px-1 w-5/6 my-6 font-nunito">Halaman yang anda cari tidak ada atau tidak ditemukan</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-nunito">
                    <Link to="/dashboard">
                        Kembali ke Dashboard
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default NotFound;