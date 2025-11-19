"use client"

import {Card,Button} from "@material-tailwind/react";
import {useRef,useState} from "react";


//ICONS
import leftArrow from "../../../assets/icons/button_icons/navigation_icon/leftArrow.svg"
import rightArrow from "../../../assets/icons/button_icons/navigation_icon/rightArrow.svg"
import {useRouter} from "next/navigation";


type Props = {
    sectionTitle: string;
    IN_Brands?: Array<{image:any;title:string}>;
}



export default function CategoriesCard_NavList_Layout({sectionTitle,IN_Brands}: Props) {
    const router = useRouter();
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState<boolean>(false);
    const [atEnd, setAtEnd] = useState<boolean>(false);





    const scrollLeft = ()=>{
        scrollbarRef.current?.scrollBy({left:-200,behavior:"smooth"});
        setAtEnd(false);

        console.log(scrollbarRef.current?.scrollLeft);
    }

    const scrollRight = ()=>{
        const maxscrollLeft = scrollbarRef.current?.scrollWidth - scrollbarRef.current?.clientWidth;
        scrollbarRef.current?.scrollBy({left:+200,behavior:"smooth"});
        setAtStart(false);
    }


    const handleScroll = () => {
        const el = scrollbarRef.current;
        if(!el) return;

        const scrollLeft = el.scrollLeft;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        setAtStart(scrollLeft<= 0);
        setAtEnd(scrollLeft >= maxScrollLeft -1);

    }

    //Default Value
    const Brands = IN_Brands ?? new Array(10).fill({
        image: <div className="w-200 h-200"></div>,
        title: ""
    });

    const title = sectionTitle ?? "";

    return (
        <div className="mt-10 ">

            {/*Title of this Section*/}
            <div className="w-full  flex">
                <p className="p-5 font-bold text-2xl text-black w-full flex flex-grow1">{title}</p>
                <div className="w-full flex  flex-1/3 gap-4 place-self-center justify-end me-4">
                    <Button

                        disabled={atStart}
                        onClick={scrollLeft}
                        className=" w-[40px] h-[40px] rounded-none ">
                        <img src={"/icons/button_icons/navigation_icon/leftArrow.svg"}/>
                    </Button>
                    <Button
                        disabled={atEnd}
                        className=" w-[40px] h-[40px] rounded-none"
                        onClick={scrollRight}
                    >
                        <img src={"/icons/button_icons/navigation_icon/rightArrow.svg"}/>
                    </Button>
                </div>
            </div>



            {/*List of the Items*/}
            <div>

                <div
                    ref={scrollbarRef}
                    onScroll={handleScroll}
                    className=" direction-ltr grid grid-flow-col grid-rows-1 gap-4 overflow-y-hidden overflow-x-scroll scrollbar-hide justify-start m-4">

                    {Brands.map((item,index) => {
                        return (

                            <div key={index} className="w-[200px] h-[200px] p-4 ">
                                <Card
                                    className="z-20 rounded-none border border-gray-300 shadow-none flex items-center justify-center"
                                    onClick={() => router.push("/")}
                                >
                                    <img
                                        src={item.image}
                                        className="h-[150px] w-[150px]  object-fit p-2 rounded-3xl"
                                        alt={""}/>

                                </Card>
                                <p className="block bottom-1 text-center p-2 text-black">{item.title}</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}