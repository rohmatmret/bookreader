/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Authorized = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let params = useQuery();
    let uuid = params ? params.get('state') : ''
    let cookiesUUID = Cookies.get('uuid')
    
    let changeToken = async(params) => {
        let payload = {
            "grant_type": "authorization_code",
            "client_id": "EbooksGramedia",
            "client_secret": "df4d91e0-c25a-432d-8945-20497eb8e5dc",
            "code": params ? params.get('code') : params,
            "redirect_uri": process.env.REACT_APP_BASE_URL_DOMAIN+"/authorized"
        }
        axios.post('https://auth.ovaltech.id/auth/token',payload, {headers: {'content-type': 'application/json'}})
        .then(response => {
            var data = response.data
            getUserAPI(data.access_token);
        })
        .catch(err => console.log(err))
    }

    let getUserAPI = async(token) => {
        let payloadData = {
            "access_token": token ? token : ""
        }
        axios.post(process.env.REACT_APP_BASE_URL+'auth/myvalue', payloadData)
        .then(response => {
            var res = response.data
            console.log(res)
            Cookies.set("token", res.realm.toUpperCase() + " " + res.access_token);
            Cookies.set("username", res.first_name);
            Cookies.set("email", res.email)
            if(response.status === 200){
                ownedBuffet();
            }else if(response.status === 201){
                alert('user anda belum terdaftar');
            }
            
            })
        .catch(err => console.log(err))
    }

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
            if(uuid === cookiesUUID){
              window.location.href = "/dashboard";
            }else{
              console.log('invalid session')
              window.location.href = "/login";
            }
            
          }else{
            if(uuid === cookiesUUID){
              window.location.href = "/dashboard";
            }else{
              window.location.href = "/login";
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
      }

    useEffect(() => {
        changeToken(params);
    },[])
    return(
        <div>
           Loading...
        </div>
    )
}
export default Authorized;