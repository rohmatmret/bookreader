import React, {useState, useEffect, useRef} from 'react';
import {MenuIcon, ArrowsExpandIcon, SearchIcon, CogIcon, ChevronLeftIcon, ZoomInIcon, ZoomOutIcon, ArrowRightIcon, ArrowLeftIcon} from '@heroicons/react/outline';
import useDarkMode from '../SetThemes.js';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
const screenfull = require('screenfull');



const Reader = (params) => {
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const [colorTheme, setTheme] =useDarkMode();
    const [layout, setLayout] = useState(false)
    const [items, setItems]         = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore]     = useState(true);
    const [pages, setPages]         = useState(1);
    const observer                  = useRef();
    // const [zoomIn, setZoomIn] = useState(false);
    // const [zoomOut, setZoomOut] = useState(false);
    const totalPage = useSelector(state => state.pageCount)
    const title = useSelector(state => state.title)
    const TOTAL_PAGES = totalPage;
    const [pageNumber, setPageNumber] = useState(1);

    const Item = ({ children, reference, ids }) => {
        return (
            <div ref={reference} id={ids}>
                {children}
            </div>
        );
    };
    
    const Loader = () => {
        return (
            <div className="w-full md:w-3/5 mx-auto p-4 items-center text-center mb-4">
                <svg class="animate-spin h-8 w-8 mx-auto dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )
    }

    const fetchData = async (index) => {
        setIsLoading(true);
        var slug = params.params
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await axios.get(`https://scoopadm.apps-foundry.com/scoopcor/api/v1/items/${Number(slug)}/web-reader/${index}.jpg`,
        { headers: { Authorization:Cookies.get('token')}, responseType: 'blob' }
      ).then((response)=>{
        let image = window.URL.createObjectURL(response.data)
        setItems([...items, `${image}`])
        setIsLoading(false)
      })
    }

    const preventDrag =  (e) => {
        e.preventDefault()
    }

    useEffect(()=> {
        //disable right click
        document.addEventListener('contextmenu',(e) => {
            e.preventDefault();
        })

        //disable print
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key == 'p') {
                alert('This section is not allowed to print or export to PDF');
                e.cancelBubble = true;
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });

        document.addEventListener('scroll', (e) => {
            var lastScrollTop = 0;
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop){
                // downscroll code
                var pages = Math.floor(st/1150);
                setPageNumber(pages+1)
             } else {
                // upscroll code
                var pages = Math.floor(st/1150);
                setPageNumber(pages+1)
             } 
             lastScrollTop = st <= 0 ? 0 : st;
        },false);

        // disable print screen
        document.addEventListener('keyup', (e) => {
            if (e.key == 'PrintScreen') {
                navigator.clipboard.writeText('');
                alert('Screenshots disabled!');
            }
        });


        if(screenfull.isEnabled){
            screenfull.on('change');
        }
        if(pages <= TOTAL_PAGES){
            fetchData(pages);
            // getItems(pages);
            setPages((pages) => pages + 1);
        }
    },[])

    const lastItemRef = React.useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
        
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (pages < TOTAL_PAGES) {
                        // getItems(pages);
                        fetchData(pages);
                        setPages((pages) => pages + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });
        
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const toggleFullScreen = () => {
        if(screenfull.isEnabled){
            screenfull.toggle();
        }
    }

    const changeValue = (e) => {
        if(e != null || e != "" || e != 0){
            setPageNumber(e)
            var pageId = document.getElementById(e)
            if(pageId){
                pageId.scrollIntoView();
            }
        }else{
            return false
        }
    }
    return(
        <>
            <div>
            <TransformWrapper
                    initialScale={1}
                    initialPositionX={1}
                    initialPositionY={1}
                    centerOnInit={true}
                    wheel={{disabled: true}}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className="w-full">
                    <div className="bg-white min-h-14 dark:bg-gray-800 space-x-10 grid grid-cols-3 items-center sticky top-0 z-50">
                        <div className="px-12 text-black dark:text-white flex">
                            <ChevronLeftIcon className="w-5 h-5 dark:text-white text-black mt-1"/>
                            <span className="mt-0.5"><Link to="/">back to home</Link></span>
                        </div>
                        <div className="text-black dark:text-white px-12 text-center">
                           {title}
                        </div>
                        <div className="flex flex-nowrap ml-64 space-x-10 absolute right-20">
                            <button onClick={() => zoomIn()}><ZoomInIcon className="w-5 h-full text-black dark:text-white"/></button>
                            <button onClick={() => zoomOut()}><ZoomOutIcon className="w-5 h-full text-black dark:text-white"/></button>
                            <ArrowsExpandIcon className="w-5 h-full text-black dark:text-white cursor-pointer" onClick={()=>toggleFullScreen()}/>
                            {/* <CogIcon className="w-5 h-full text-black dark:text-white cursor-pointer" onClick={()=>setLayout(!layout)}/> */}
                        </div>
                    </div>
                    <TransformComponent>
                        <div className={!layout ? "flex flex-col space-x-4 w-screen mx-auto space-y-4" : "grid grid-cols-2 gap-2 w-screen mx-auto space-y-4"} style={{minHeight:'750px'}}>
                            {items.map((item, index) => 
                                index + 1 === items.length ? (
                                    <Item reference={lastItemRef} key={index} ids={index}>
                                        <div 
                                            className={
                                                "w-2/5 h-full bg-gray-300 mx-auto p-4 rounded mb-4 flex"
                                            }
                                        >
                                            <img src={item} alt={index} srcSet={`${item} 2x`} className="w-full h-full mx-auto" onDragStart={(e)=>preventDrag(e)}/>
                                        </div>
                                    </Item>
                                ):(
                                    <Item reference={lastItemRef} key={index} ids={index}>
                                        <div 
                                            className={
                                                "w-2/5 h-full bg-gray-300 mx-auto p-4 rounded mb-4 flex"
                                            }
                                        >
                                            <img src={item} alt={index} className="w-full h-full mx-auto" onDragStart={(e)=>preventDrag(e)}/>
                                        </div>
                                    </Item>
                                )
                            )}
                        </div>
                    </TransformComponent>
                    <div className="font-nunito">
                        {isLoading && <Loader />}
                    </div>
                    <div className="absolute bottom-0 top-4 sticky z-10 h-14 text-center dark:bg-gray-800 bg-white w-full py-2">
                        <div className="dark:text-white text-black py-2 flex justify-center spcae-x-2 w-auto">
                            <input type="text" className="focus:outline-none w-12 px-2 text-center text-black rounded-md mx-2" value={pageNumber} onChange={(e)=> changeValue(e.target.value)}/>
                            <span className="font-nunito">/ {TOTAL_PAGES}</span>
                        </div>
                    </div>
                </div>
                )}
                </TransformWrapper>
            </div>
        </>
    )
}

export default Reader;