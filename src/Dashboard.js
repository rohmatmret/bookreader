import React, { useState, useEffect } from "react";
import CardItem from "./components/CardItem";

import axios from "axios";
/**
 *
 * @returns offers/items?offer_id=112023&item_type=2
 */
export default function Dashboard() {
  const [searchItems, setSearchItems] = useState("");
  const [Items, setItems] = useState("");
  useEffect(() => {
    OfferBuffets();
  }, []);
  //   const filterBook = DummyBooks.filter((books) => {
  //     return (
  //       books.title.toLocaleLowerCase().indexOf(searchItems.toLowerCase()) !== -1
  //     );
  //   });

  const OfferBuffets = async () => {
    let Result = await axios.get(
      "https://scoopadm.apps-foundry.com/scoopcor/api/v1/offers/items?offer_id=112023&item_type=2",
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (Result) {
      setItems(Result.data);
    }
  };
  return (
    <>
      <form className="pt-4 pb-8">
        <input
          type="search"
          placeholder="Search"
          className="px-5 bg-gray-100 p-2 w-80 placeholder-gray-500 placeholder-opacity-50 rounded-full focus:outline-none font-nunito"
          onChange={(e) => {
            setSearchItems(e.target.value);
          }}
        />
      </form>
      <div className="flex grid lg:grid-cols-6 lg:gap-4 md:grid-cols-3 md:gap-10 sm:grid-cols-3 grid-cols-1 gap-8 mx-14 sm:mx-auto">
        {Items
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
          : ""}
        {/* {JSON.stringify(Items.data)} */}
      </div>
    </>
  );
}
