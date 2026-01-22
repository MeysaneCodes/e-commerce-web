"use client"

import {ColorOption, Item_Structure} from "@/types/product_type";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import ToolTip_ui from "@/components/ui/Tooltip/tooltip";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Badge_layout from "@/components/ui/Badge";

export default function Product_Overview ({data,Images, Icons}:{data:Item_Structure | null |undefined, Images:ColorOption, Icons:any})  {
    //const IMAGES = [IPHONE_PACK,IPHONE_UB,IPHONE_FR,IPHONE_B,IPHONE_BE];

    console.log("Product Overview render")


    const IMAGES = Images.imagesURL ?? "";

    //if any view wasnt uploaded, will be skipped.
    const imagesFilter = Object.entries(IMAGES);
    const filteredArray = imagesFilter.filter(([,v]) => v.length > 0);


    const [IMAGE_INDEX, setImageShow] = useState<number>(0);


    const [atStart, setAtStart] = useState<boolean>(true);
    const [atEnd, setAtEnd] = useState<boolean>(false);
    const [fade, setFade] = useState<boolean>(false);


    //Images

    const triggerPos = ()=>{
        setAtStart(IMAGE_INDEX === 0);
        setAtEnd(IMAGE_INDEX === filteredArray.length-1);
    }



    useEffect(() => {
        triggerPos();
    }, [IMAGE_INDEX]);


    useEffect(() => {
        setFade(true);
        const timeout = setTimeout(()=> setFade(false),100);
        return () => clearTimeout(timeout);

        //TODO CHECK IF WE NEED IMAGE INDEX TO RE RENDER
    }, [IMAGE_INDEX]);


    return (

        <div className="p-4 w-full overflow-y-scroll scrollbar-hide">
            <Card className="p-5 border-none shadow-none bg-surface">
                <CardBody>
                    <div className="flex justify-between">
                        <div>
                            <Typography variant="h4" className="font-bold">
                                {data?.title}
                            </Typography>
                        </div>
                        <div>
                            <img src={Icons.share_icon} alt={"Share"}/>
                        </div>
                    </div>

                    {/*Rating section*/}
                    <div className="flex items-center gap-2   text-gray-600 text-xs">


                        <Stack>
                            <Rating color={"red"} name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly={true} sx={{
                                "& .MuiRating-iconFilled": {
                                    color: "#CC291F",
                                }
                            }} />
                        </Stack>

                        {/*TODO Delete and create a logic ,Generate a number*/}
                        <p>{data?.rating}</p>
                        <p>({data?.review_count})</p>
                        <div className="flex">

                            <ToolTip_ui imgIndicator={Icons.info_Icon} alt_text={""}
                                        contentText={ "Die durchschnittliche Bewertung basiert auf " +
                                            "allen verfügbaren Produktbewertungen. Dabei werden auch Bewertungen " +
                                            "aus externen Quellen berücksichtigt (z. B. von der Website des Hersteller oder anderen Online-Shops, " +
                                            "die zu unserer Unternehmensgruppe gehören)Verifizierte Bewertungen sind mit dem Vermerk verifiziert gekennzeichnet."} toolTipPos={"tooltip-bottom"}/>

                        </div>

                        <div>
                            <Typography>
                                | Art.-Nr. {data?.sku} |
                            </Typography>
                        </div>

                        <div>
                            <Typography className="underline cursor-pointer">
                                {data?.brand}
                            </Typography>
                        </div>
                    </div>

                    <div>
                        <img className="w-5 aspect-auto" src={Icons.APPLE_LOGO} alt={data?.brand}/>
                    </div>

                    {/*//TODO create system for this to be based on db. dynamic addition for admin*/}
                    <Badge_layout badges={["Versandkostenfrei","myTemplate-Rabatt verfügbar" ]}/>

                    <div className="w-full ">
                        <div className="w-full] h-[500px] flex ">
                            {/*<img className="object-cover aspect-auto h-[500px]" src={IPHONE_B} alt={""}/>*/}




                            {/*<div className="flex-1/2" ><Button

                                className=" w-[40px] h-[40px] rounded-none ">
                                <img src={leftArrow}/>
                            </Button></div>*/}
                            <div className="flex-[10%] h-full  flex items-center justify-center ">
                                <div className="" ><Button
                                    disabled={atStart}

                                    onClick={()=>{
                                        if(IMAGE_INDEX ===0) return;
                                        setImageShow(IMAGE_INDEX -1);
                                    }}
                                    className=" w-[40px] h-[40px] p-0 m-0 flex rounded-none ">
                                    <img className="w-full h-full flex object-fill bg-red-500" src={Icons.leftArrow} alt={"perv"}/>
                                </Button></div>

                            </div>
                            <div className="h-full aspect-auto flex-[80%] ">
                                {/*<img className="bg-yellow-100 object-contain aspect-auto h-[500px]" src={IMAGES[IMAGE_INDEX]} alt={""}/>*/}
                                <img className={` object-contain w-full h-full transition-opacity  ease-out  ${fade ? "opacity-0" : "opacity-100"}`} src={
                                    (()=>{
                                        const img =  Object.entries(Images.imagesURL);
                                        const [,value] = img[IMAGE_INDEX];
                                        return value;
                                    })()

                                } alt={""}/>

                            </div>
                            <div className="flex-[10%] h-full  flex items-center justify-center ">
                                <div className="" ><Button
                                    disabled={atEnd}
                                    onClick={()=>{
                                        console.log(IMAGE_INDEX);
                                        console.log(Object.keys(Images.imagesURL).length-1)
                                        if(IMAGE_INDEX === Object.keys(Images.imagesURL).length-1)return;
                                        setImageShow(IMAGE_INDEX +1);
                                    }}
                                    className=" w-[40px] h-[40px] m-0 p-0 rounded-none ">
                                    <img src={Icons.rightArrow} alt={"next"}/>
                                </Button></div>
                            </div>


                        </div>

                        <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide ">
                            {Object.entries(Images.imagesURL).map(([v,url], index)=>(
                                (url && <div key={v}
                                             className={`w-[150px] flex h-[100px] content-center justify-center  border ${
                                                 IMAGE_INDEX === index ? "border-black" : "border-gray-300"
                                             } hover:border-black cursor-pointer`}>
                                        <img className="object-contain aspect-auto w-full h-full" src={url} alt={""} onClick={()=>setImageShow(index)}/>
                                    </div>
                                )
                            ))}

                            {/*     IMAGES.map((image,index) => (
                                <div key={index}
                                     className={`w-[150px] flex h-[100px] content-center justify-center  border ${
                                         IMAGE_INDEX === index ? "border-black" : "border-gray-300"
                                     } hover:border-black cursor-pointer`}>
                                    <img className="object-contain aspect-auto w-full h-full" src={} alt={""} onClick={()=>setImageShow(index)}/>
                                </div>
                            ))*/}



                            {/*<div className="min-w-[150px] flex h-[150px] border  border-gray-300 hover:border-black">
                                <img className="object-fill aspect-auto h-[150px]" src={IMAGES[0]} alt={""} onClick={}/>
                            </div>

                            <div className="min-w-[150px] flex h-[150px] border  border-gray-300 hover:border-black  transition-shadow duration-700">
                                <img className="object-fill aspect-auto h-[150px]" src={IMAGES[1]} alt={""} onClick={()=>setImageShow(IPHONE_UB)}/>
                            </div>

                            <div className="min-w-[150px] flex h-[150px] border  border-gray-300 hover:border-black">
                                <img className="object-fill aspect-auto h-[150px]" src={IMAGES[2]} alt={""} onClick={()=>setImageShow(IPHONE_FR)}/>
                            </div>

                            <div className="min-w-[150px] flex h-[150px] border  border-gray-300 hover:border-black">
                                <img className="object-fill aspect-auto h-[150px]" src={IPHONE_B} alt={""} onClick={()=>setImageShow(IPHONE_B)}/>
                            </div>
*/}

                            ´

                        </div>

                    </div>


                </CardBody>
            </Card>
        </div>

    );
}
