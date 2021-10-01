import React from 'react';

const ModalComponent = ({children, shown, close, id, props}) => {
    const redirectPage = (params) => {
        window.open("https://ebooks.gramedia.com/id/premium/buku?offer_id="+params);
    }
    return(
        <div>
             {shown ? (
                    <div
                    className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                    onClick={() => {
                        close();
                    }}
                    >
                        <div
                            className="mt-1/2 rounded-lg z-10 absolute bg-gray-50 h-auto md:w-3/5 lg:w-2/5 p-8 w-full flex flex-col items-center "
                            onClick={(e) => {
                            e.stopPropagation();
                            }}
                        >
                            <div className="text-sm sm:text-md md:text-lg flex flex-col z-50 items-center justify-center text-center font-nunito">
                            {children}
                            </div>
                            {props !== "loading" ?
                            <div className="flex mt-10 mb-2 space-x-10">
                                <button className="text-blue-500 font-bold font-nunito" onClick={() => {close()}}>
                                    Tutup
                                </button>
                                <button className="bg-blue-600 text-white p-2 rounded-md font-bold font-nunito" onClick={()=>{redirectPage(id)}}>
                                    Beli Sekarang
                                </button>
                            </div>
                            : null}
                        </div>
                    </div>
                ) : 
            null}

        </div>
    )
}

export default ModalComponent;