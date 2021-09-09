import React from "react";
import Icon from "../assets/book-reading.png";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import Cookies from "js-cookie";
import { setPageCount, setTitle } from "../rootSlice";



const CardItem = ({ image, title, author,offerId, url, pageCount, params }) => {
  const dispatch = useDispatch();
  const offerBuffet = Cookies.get('offer') != null ? Cookies.get('offer') : "";
  const getPackage = offerBuffet !== "" ? JSON.parse(offerBuffet) : "";
  const offerIds = getPackage ? getPackage.map((item, index)=>{
    return Number(item.offerId);
  }): '';

  

  const handleStorePageCount = () => {
    dispatch(setPageCount(pageCount))
    dispatch(setTitle(title))
  }

  return (
    <div className="container w-48 shadow-lg p-2 rounded-md bg-white lg:my-2 xl:my-auto">
      <div className="w-11/12 mx-auto mb-4 shadow">
        {offerIds.includes(Number(params)) ?
          <Link
            to={"/reader/" + offerId}
          >
            <img src={image} alt={title} className="rounded" />
          </Link>
        : <img src={image} alt={title} className="rounded" />
        }
      </div>
      <div className="space-y-4">
        <a href={url} rel="noreferrer" target="_blank">
          <h3 className="text-sm font-bold font-nunito h-20">{title.substr(0)}</h3>
        </a>
      </div>
      <div className="mb-6">
        <span className="text-xs text-gray-500 font-nunito">{author}</span>
      </div>
      {offerIds.includes(Number(params)) ?
      <div className="mx-auto text-center bg-blue-500 rounded-md py-1 px-2">
        <button className="text-white font-bold text-left flex grid grid-cols-2 gap-0 mx-auto font-nunito" onClick={(e)=>{handleStorePageCount()}}>
        <img
          src={Icon}
          alt="icon-button"
          className="text-white h-6 my-auto ml-auto mr-4"
        />
        <Link
            to={"/reader/" + offerId}
          >
            Baca
          </Link>
        </button>
      </div>
        : ""
        }
    </div>
  );
};

export default CardItem;
