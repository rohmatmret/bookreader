import React, { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import axios from "axios";
/**
 *
 * @returns offers/items?offer_id=112023&item_type=2
 */
export default function PremiumOffers() {
  const [isLoading, setLoading] = useState(true);
  const [Items, setItems] = useState("");
  const [slug, setSlug] = useState("");
  let params = useParams();
  useEffect(() => {
    setSlug(params.offerid);
    console.log(params);
    OfferBuffets(params.offerid);
  }, []);

  const OfferBuffets = async (id) => {
    let Result = await axios.get(
      `https://scoopadm.apps-foundry.com/scoopcor/api/v1/offers/items?offer_id=${id}&item_type=2`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );

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
        <div className="bg-blue-500 h-96 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <form className="pt-4 pb-8">
              <input
                type="search"
                placeholder="Search"
                className="px-5 bg-gray-100 p-2 w-80 placeholder-gray-500 placeholder-opacity-50 rounded-full focus:outline-none"
              />
            </form>
            <div className="flex grid lg:grid-cols-6 lg:gap-4 md:grid-cols-3 md:gap-10 sm:grid-cols-3 grid-cols-1 gap-8 mx-14 sm:mx-auto">
              {!isLoading
                ? Items
                  ? Items.data.map((books) => {
                      return (
                        <CardItem
                          image={books.images}
                          title={books.name}
                          author={books.id}
                          url={books.images}
                        />
                      );
                    })
                  : ""
                : "Loading..."}
            </div>
          </div>
          <div>lorem ipsum dolor sit</div>
        </div>
      </div>
    </>
  );
}
