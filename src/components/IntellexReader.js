/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect } from 'react';
import ReactPDF from '@intelllex/react-pdf';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import {ChevronLeftIcon} from '@heroicons/react/outline';
import ModalComponent from '../components/Modal';

const ExampleReactPDF = (params) => {
    const [urlData, setUrlData] = useState();
    const [spinner, setSpinner] = useState(true);
    const title = useSelector(state => state.title)
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();

    const fetchData = async (params) => {
        var slug = params.params
        let Result = await axios.get(process.env.REACT_APP_BASE_URL+`items/${Number(slug)}/ebook-reader/view`,{ headers: { Authorization:Cookies.get('token')}})
    
        if(Result){
            var data = Result.data
            var urlNew = data.base_url + data.path + "?AWSAccessKeyId=" + data.access_key +"&Expires="+data.expires + "&Signature=" + encodeURIComponent(data.signature)
            setUrlData(urlNew);
        }
    }
    useEffect(()=>{
        fetchData(params);
    },[])

    const setProgressBar = () => {
        setTimeout(() => {
            setSpinner(false);
        }, 20000)
    }

    return (
        <div>
            <div>
                <div>
                <div className="text-black absolute left-1/3 top-2/3 opacity-10 font-nunito z-40 text-3xl font-bold transform rotate-45">
                    {Cookies.get('email')}/{day}{month}{year}/GDWR 
                </div>
                <div className="bg-white min-h-14 dark:bg-gray-800 space-x-10 grid grid-cols-3 items-center sticky top-0 z-50">
                        <div className="px-12 text-black dark:text-white flex">
                            <ChevronLeftIcon className="w-5 h-5 dark:text-white text-black mt-1 font-bold"/>
                            <span className="mt-1 uppercase text-sm font-bold"><Link to="/">back to homepage</Link></span>
                        </div>
                        
                        <div className="text-black dark:text-white px-12 text-center font-bold w-full">
                            {title}
                        </div>
                    </div>
                </div>
                <ReactPDF
                    url={urlData}
                    // showProgressBar
                    showToolbox
                    onProgress={() => {setProgressBar()}}
                />
            </div>
            <ModalComponent
            shown={spinner}
            close={()=>{setSpinner(false)}}
            props={"loading"}
            >
                <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin mx-auto my-1/2" style={{borderTopColor:"transparent"}}></div>
                <div className="text-center my-8 text-2xl font-nunito">
                    Kami sedang menyiapkan buku Anda. Silahkan tunggu beberapa saat.
                </div>
            </ModalComponent>
        </div>
    )
};
 
export default ExampleReactPDF;