import React, { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import axios from "axios";
import Cookies from "js-cookie";
import NotFound from '../assets/notfound.png';
import ModalComponent from '../components/Modal'

/**
 *
 * @returns offers/items?offer_id=112023&item_type=2
 */
export default function PremiumOffers() {
  const [isLoading, setLoading] = useState(true);
  const [searchItems, setSearchItems] = useState("");
  const [Items, setItems] = useState("");
  const [modalShown, toggleModal] = useState(false);

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
      : 
      ""

  useEffect(() => {
    OfferBuffets(paramsId);
    setSearchItems("");
  }, [paramsId]);

  const OfferBuffets = async (id) => {
    let Result = await axios.get(
      process.env.REACT_APP_BASE_URL+`offers/items?offer_id=${id}&item_type=2`,
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

  const showModal = () => {
    toggleModal(!modalShown)
  }

  const handlePressEnter = (e) => {
    if(e.key === "Enter") {
      e.preventDefault()
      setSearchItems(e.target.value)
    }
  }

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
                value={searchItems}
                onChange={(e) => {
                  setSearchItems(e.target.value);
                }}
                onKeyDown={(e) => {
                  handlePressEnter(e);
                }}
              />
            </form>
            <div className="flex lg:grid-cols-6 xl:grid-cols-5 lg:gap-0 xl:gap-6 md:grid-cols-3 md:gap-10 sm:grid-cols-3 grid-cols-1 gap-8 mx-14 sm:mx-auto">
              {!isLoading ? (
                Items ? (
                  filterBook.length > 0 ?
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
                          modal={showModal}
                        />
                      );
                    })
                  :
                  <div className="w-screen">
                    <div className="w-10/12 font-semibold text-center font-nunito text-xl mt-12">Maaf, kami tidak menemukan apa yang anda cari</div>
                    <img src={NotFound} alt="notfound-img" className="w-8/12 mx-20"/>
                  </div>
                ) : (
                  ""
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
        <ModalComponent
          shown={modalShown}
          close={()=>{toggleModal(false)}}
          id={paramsId}
        >
          <div>Anda belum berlangganan paket ini.</div> 
          Untuk dapat menikmati layanan, silahkan melakukan pembelian paket di 
          halaman Gramedia Digital.
        </ModalComponent>
      </div>
    </>
  );
}
