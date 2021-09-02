import React,{useState, useCallback, useEffect } from 'react';
import ReactPDF from '@intelllex/react-pdf';
import axios from 'axios';
import {useSelector} from 'react-redux';
// import {Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const ExampleReactPDF = (params) => {
    const [urlData, setUrlData] = useState();
    const fetchData = async (params) => {
        var slug = params.params
        // var slug = params
        let Result = await axios.get(`https://dev.apps-foundry.com/scoopcor/api/v1/items/${Number(slug)}/ebook-reader/view`,{ headers: { Authorization:Cookies.get('token')}})
    
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
        <ReactPDF
            url={urlData}
            showProgressBar
            showToolbox
        />
    )
};
 
export default ExampleReactPDF;