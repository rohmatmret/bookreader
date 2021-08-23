import React, { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import { useParams, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux';
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import axios from "axios";
import Cookies from "js-cookie";

/**
 *
 * @returns offers/items?offer_id=112023&item_type=2
 */
export default function PremiumOffers() {
  const [isLoading, setLoading] = useState(true);
  const [searchItems, setSearchItems] = useState("");
  const [Items, setItems] = useState("");
  const offerId = useSelector((state) => state.offer)

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let params = useQuery();
  var paramsId = params ? params.get('offerid') : "";

  const filterBook =
    Items !== ""
      ? Items.data.filter((books) => {
          return (
            books.name
              .toLocaleLowerCase()
              .indexOf(searchItems.toLowerCase()) !== -1
          );
        })
      : "";

  useEffect(() => {
    OfferBuffets(paramsId);
  }, [paramsId]);

  const OfferBuffets = async (id) => {
    let Result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}offers/items?offer_id=${id}&item_type=2`,
      { headers: { Authorization: Cookies.get("token") } }
    ).catch(err => {
      if(err){
        window.location.href = "/404"
      }
    });

    if (Result) {
        setItems(Result.data);
        setLoading(false);
    }
  };

  return (
    <>
      <SideMenu />
      <div className="relative md:ml-64">
        <Header />
        <div className="h-96 pt-24">
          <div className="px-4 md:px-10 mx-auto w-full">
            <form className="pt-4 pb-8">
              <input
                type="search"
                placeholder="Search"
                className="px-5 bg-gray-100 p-2 w-80 placeholder-gray-400 placeholder-opacity-50 rounded-full focus:outline-none font-nunito"
                onChange={(e) => {
                  setSearchItems(e.target.value);
                }}
              />
            </form>
            <div className="flex grid lg:grid-cols-6 xl:grid-cols-5 lg:gap-0 xl:gap-6 md:grid-cols-3 md:gap-10 sm:grid-cols-3 grid-cols-1 gap-8 mx-14 sm:mx-auto">
              {!isLoading ? (
                Items ? (
                  filterBook.map((books) => {
                    return (
                      <CardItem
                        image={books.images}
                        title={books.name}
                        author={books.author}
                        offerId={books.id}
                        url={books.images}
                        key={books.id}
                        pageCount={books.page_count}
                        params={paramsId}
                      />
                    );
                  })
                ) : (
                  ""
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
