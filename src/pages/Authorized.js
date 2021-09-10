import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const Authorized = () => {
    const [accessToken, setAccessToken] = useState();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let params = useQuery();
    
    let changeToken = async(params) => {
        let payload = {
            "grant_type": "authorization_code",
            "client_id": "EbooksGramedia",
            "client_secret": "df4d91e0-c25a-432d-8945-20497eb8e5dc",
            "code": params ? params.get('code') : params,
            "redirect_uri": "http://localhost:3000/authorized"
        }
        axios.post('https://auth.ovaltech.id/auth/token',payload, {headers: {'content-type': 'application/json'}})
        .then(response => {
            var data = response.data
            getUserAPI(data.access_token);
        })
        .catch(err => console.log(err))
    }

    let getUserAPI = async(token) => {
        let payloadData = token ? token : "";
        axios.post('http://localhost/auth/valid', payloadData)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        changeToken(params);
    },[])
    return(
        <div>
           {/* {encodeURIComponent(params)} */}
           {params?params.get('code') : params}
        </div>
    )
}
export default Authorized;