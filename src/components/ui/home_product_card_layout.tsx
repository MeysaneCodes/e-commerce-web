"use client"

import {
    Card,
    CardBody,
    Popover,
    PopoverContent, PopoverHandler,
    Rating, Typography,
} from "@material-tailwind/react";
import {useState} from "react";
//Routes
import {ROUTES} from "@/lib/Routes/routes";





import {Item_Structure} from "@/types/product_type";
import {useRouter} from "next/navigation";



type prefetch_function = (slug: string | undefined) => void;

type Props = {
    isSponsored: boolean,
    isDiscounted?: boolean,
    OriginalPrice: string
    item: Item_Structure,
    prefetch:prefetch_function
}



export default function ProductCardLayout({item,prefetch,isSponsored, isDiscounted,OriginalPrice} : Props ) {
    const discount = isDiscounted ?? false;

    const router = useRouter();
    const [openPopover, setOpenPopover] = useState(false);
    const [openPopover_Discount, setOpenPopover_Discount] = useState(false);

    const triggers = {
        onMouseEnter: ()=>setOpenPopover(true),
        onMouseLeave: ()=>setOpenPopover(false),
    }

    const triggers_discount = {
        onMouseEnter: ()=>setOpenPopover_Discount(true),
        onMouseLeave: ()=>setOpenPopover_Discount(false),
    }




    return (
        <div>
            <Card
                onClick={()=>{
                  //  router.push(`/products/${item.slug}`)
                      if(!item.slug)console.warn("No slug found!");
                      router.push(ROUTES.PRODUCT(item.slug ?? ""))
                }


                }

                onMouseEnter={()=> prefetch(item.slug)}

                className="w-[300px] h-[500px] border border-gray-300   p-5 bg-white hover:cursor-pointer hover:opacity-80">
                <CardBody className="p-0 m-0 ">
                    <div className="flex overflow-scroll scrollbar-hide">
                        <p className="border border-gray-600 whitespace-nowrap text-gray-600 ml-2 mr-2 text-xs p-1 inline-flex">Versandkostenfrei</p>
                        <p className="border border-gray-600 whitespace-nowrap text-gray-600 ml-2 mr-2 text-xs p-1 inline-flex">myTemplate-Rabatt verfügbar</p>
                    </div>

                    {/*Sponosoring products information*/}
                    {isSponsored && (<div className="flex">
                        <p className=" p-2 text-xs">Gesponsert</p>
                        <Popover open={openPopover} handler={setOpenPopover} placement="bottom-start">
                            <PopoverHandler {... triggers }>
                                <img src={"/icons/info_icon.svg"} alt={"Gesponserte Produkte"}/>
                            </PopoverHandler>

                            <PopoverContent {... triggers } className="rounded-l-xs border-none text-xs bg-black text-white w-[350px]">
                                <div className="absolute -top-0.5 left-0 w-0.5 h-0.5 border-l-12 border-r-12 border-t-12 border-transparent border-t-white"></div>

                                <p>
                                    Dies sind Produktanzeigen, die von unseren Partnern finanziert werden.
                                    Wenn Sie auf eine Anzeige klicken, bleiben Sie in unserem Shop und werden
                                    auf eine Produktdetailseite geleitet.
                                </p>

                                {/*TODO change route*/}

                                <p onClick={()=> router.push("/")} className="mt-5 font-bold hover:text-red-500 cursor-pointer">
                                    Weiter Details
                                </p>

                            </PopoverContent>
                        </Popover>
                    </div>)}

                    <div className="mt-2 flex justify-center items-center w-[250px] h-[250px]">
                        {/*Product Image*/}
                        <img className="aspect-auto h-[250px] object-cover" src={item.options?.colors[0].imagesURL.front} alt={"Smartwatch"}/>
                    </div>

                    {/*Rates*/}
                    {/*TODO need to be edited to be dynamic, total of reviews and how many stars should be calculated*/}

                    <div className="flex items-center gap-2   text-gray-600 text-xs">
                        <Rating ratedColor="blue-gray" value={4} readonly />
                        <p>1024</p>
                    </div>

                    {/*Product Title*/}
                    <div className="mb-8">
                        <div className="mt-2 w-full line-clamp-3 text-foreground ">
                            <Typography>
                                {item.title}
                            </Typography>
                        </div>
                    </div>

                    {/*If Produkt with discount*/}
                    {discount && (<div className="flex gap-2">
                        <p className="bg-black text-white text-xs p-1">-12%</p>
                        <p className="text-xs p-1 line-through"> UVP {OriginalPrice}</p>
                        <div className="flex">

                            {/*//TODO UPDATE POPOVER*/}
                            {/*    <Popover open={openPopover_Discount} handler={setOpenPopover_Discount} placement="top-start">
                                <PopoverHandler {... triggers_discount }>
                                    <img src={info_Icon} alt={"Gesponserte Produkte"}/>
                                </PopoverHandler>

                                <PopoverContent {... triggers_discount } className="rounded-l-xs border-none text-xs bg-black text-white w-[350px]">
                                    <div className="absolute -bottom-0.5 left-0 w-0.5 h-0.5 border-l-12 border-r-12 border-b-12 border-transparent border-b-white"></div>

                                    <p>
                                        Der hier angezeigte Preis ist die unverbindliche Preisempfehlung des Herstellers.
                                    </p>

                                </PopoverContent>
                            </Popover>*/}
                        </div>

                    </div>)
                    }


                    {/*Product Price*/}
                    <div>
                        <p className="text-2xl font-bold">
                            {/*479,- €*/}
                            {item.options?.colors[0].variants[0].price},- €
                        </p>
                    </div>

                    <div>
                        <p className="underline text-sm">inkl. MwSt. versandkostenfrei</p>
                    </div>


                </CardBody>
            </Card>
        </div>
    )


}