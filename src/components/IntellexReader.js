import React,{useState, useCallback, useEffect } from 'react';
import ReactPDF from '@intelllex/react-pdf';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import {ChevronLeftIcon} from '@heroicons/react/outline';

const ExampleReactPDF = (params) => {
    const [urlData, setUrlData] = useState();
    const title = useSelector(state => state.title)
    const fetchData = async (params) => {
        var slug = params.params
        // var slug = params
        let Result = await axios.get(`https://scoopadm.apps-foundry.com/scoopcor/api/v1/${Number(slug)}/ebook-reader/view`,{ headers: { Authorization:Cookies.get('token')}})
    
        if(Result){
            var data = Result.data
            var urlNew = data.base_url + data.path + "?AWSAccessKeyId=" + data.access_key +"&Expires="+data.expires + "&Signature=" + data.signature
            setUrlData(urlNew);
            console.log(urlData)
        }
    }
    useEffect(()=>{
        console.log(params);
        fetchData(params)
        // console.log(urlData);
    },[])

    return (
        <div>
            <div>
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
                showProgressBar
                showToolbox
            />
        </div>
    )
};
 
export default ExampleReactPDF;