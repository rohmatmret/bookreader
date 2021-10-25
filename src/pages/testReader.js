// import React, {forwardRef, useState, useEffect, createRef, useCallback} from 'react';
// import { useRef } from 'react';
// import HTMLFlipBook from "react-pageflip";
// import Cover from '../assets/Aset_halaman_Login.png';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const PageCover = forwardRef((props, ref) => {
//   return (
//     <div className="page page-cover" ref={ref} data-density="hard">
//       <div className="page-content">
//         <h2>{props.children}</h2>
//       </div>
//     </div>
//   );
// });

// const PageLeft = forwardRef((props, ref) => {
//   return (
//       <div className="demoPage" ref={ref}>
//            <img src={props.children} alt="img-left"/>
//       </div>
//   );
// });

// const PageRight = forwardRef((props, ref) => {
//   return (
//       <div className="demoPage" ref={ref}>
//            <img src={props.children} alt="img-right"/>
//       </div>
//   );
// });

// // const Page = forwardRef((props, ref) => {
// //   // console.log(props.children);
// //   return (
// //       <div className="demoPage" ref={ref}>
// //           {/* <h1>Page Header</h1> */}
// //           <img src={props.children} alt="image"/>
// //           {/* <p>Page number: {props.number}</p> */}
// //       </div>
// //   );
// // });

// const Test = () => {
//   const [page, setPage] = useState(0)
//   const [totalPage, setTotalPage] = useState(0)
//   const [items, setItems]         = useState([]);
//   const [itemsRight, setItemsRight]         = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pagesLeft, setPagesLeft]         = useState(1);
//   const [pagesRight, setPagesRight]       = useState(2);
//   const TOTAL_PAGES = 213;
//   var flipBook = useRef()

//   const fetchDataLeft = async (index) => {
//       setIsLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       await axios.get(`${process.env.REACT_APP_BASE_URL}items/197200/web-reader/${index}.jpg`,
//       { headers: { Authorization:'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25zIjpbXSwidXNlcl9pZCI6MTg1NDgxOCwiZXhwIjoxNjI5ODc4ODA3LCJyb2xlcyI6WzldLCJpc3MiOiJTQ09PUCIsInNpZyI6ImIwNzI3NjdlYzU0ZGNkNWFkODU1MGFjMmNjODIzMWRjODlkMTg1NWEiLCJleHBpcmVfdGltZWRlbHRhIjowLCJ1c2VyX25hbWUiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZW1haWwiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZGV2aWNlX2lkIjpudWxsfQ.ytZFLnXFH75arRh_Kz6fbhqRKk5Rco7BZ2gBcrFH0oQ'}, responseType: 'blob' }
//     ).then((response)=>{
//       let image = window.URL.createObjectURL(response.data)
//       setItems([...items, `${image}`])
//       // setPagesRight((pagesLeft) => pagesLeft + 2)
//       setIsLoading(false)
//     })
//   }

//   const fetchDataRight = async (index) => {
//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     await axios.get(`${process.env.REACT_APP_BASE_URL}items/197200/web-reader/${index}.jpg`,
//     { headers: { Authorization:'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25zIjpbXSwidXNlcl9pZCI6MTg1NDgxOCwiZXhwIjoxNjI5ODc4ODA3LCJyb2xlcyI6WzldLCJpc3MiOiJTQ09PUCIsInNpZyI6ImIwNzI3NjdlYzU0ZGNkNWFkODU1MGFjMmNjODIzMWRjODlkMTg1NWEiLCJleHBpcmVfdGltZWRlbHRhIjowLCJ1c2VyX25hbWUiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZW1haWwiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZGV2aWNlX2lkIjpudWxsfQ.ytZFLnXFH75arRh_Kz6fbhqRKk5Rco7BZ2gBcrFH0oQ'}, responseType: 'blob' }
//   ).then((response)=>{
//     let image = window.URL.createObjectURL(response.data)
//     setItemsRight([...itemsRight, `${image}`])
//     // setPagesRight((pagesRight) => pagesRight + 2)
//     setIsLoading(false)
//   })
// }
  

//   const nextButtonClick = () => {
//     flipBook.pageFlip().flipNext();
//   }

//   const prevButtonClick = () => {
//     flipBook.pageFlip().flipPrev();
//   };

//   const onPage = useCallback((e) => {
//     setPage(e.data)
//   })

//   useEffect(() => {
//     // if(flipBook.pageFlip().getPageCount() !== undefined){
//     //   setTotalPage(flipBook.pageFlip().getPageCount())
//     // }
//     if(pagesLeft < TOTAL_PAGES){
//       fetchDataLeft(pagesLeft)
//       fetchDataRight(pagesRight)

//       setPagesLeft((pagesLeft) =>  pagesLeft + 2)
//       setPagesRight((pagesRight) => pagesRight + 2)
//     }

//     console.log(items, itemsRight)
//     // console.log(pages)
//   },[])

//   return(
//     <div>
//       <HTMLFlipBook width={300} height={500} onFlip={onPage} ref={(el) => (flipBook = el)}> 
//           {/* <PageCover>BOOK TITLE</PageCover> */}
//           {/* <PageLeft number="1">Page text left</PageLeft>
//           <PageRight number="2">Page text right</PageRight> */}
//           {items.map((item, index)=> {
//               return(
//                 <PageLeft number={index}>{item}</PageLeft>
//               )
//           })}
//           {itemsRight.map((item, index)=> {
//               return(
//                 <PageRight number={index}>{item}</PageRight>
//               )
//           })}
//       </HTMLFlipBook>
//       <div>
//         <button type="button" onClick={prevButtonClick}>
//           Previous page
//         </button>
//         [<span>{page}</span> of <span>{totalPage}</span>]
//         <button type="button" onClick={nextButtonClick}>
//           Next page
//         </button>
//         </div>
//     </div>
//   )
// }

// export default Test


// import React from 'react';
// import { Worker } from '@react-pdf-viewer/core';
// import ReactView from '../components/ReactView';
// // import Aset from '../assets/file.pdf'

// const App = () => {
//     return <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//         <ReactView params={197605}/>
//     </Worker>;
// };

// export default App;

import React, {useState, useEffect} from 'react';

const Test = () => {
    const [spinner, setSpinner] = useState(true);

    useEffect(() =>{
        setTimeout(() => {
            setSpinner(false);
        }, 15000)
    })

    return(
        <div>
            {spinner ?
            <div className="my-96">
                <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin mx-auto my-1/2" style={{borderTopColor:"transparent"}}></div>
                <div className="text-center my-8 text-2xl font-nunito">
                    Kami sedang menyiapkan webreader. silahkan tunggu beberapa saat
                </div>
            </div>
            : ""
            }
            
        </div>
    )
}

export default Test