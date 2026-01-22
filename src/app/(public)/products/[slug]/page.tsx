"use client"

//Query

import {useQuery} from "@tanstack/react-query"

//Dynamic URL
import {useParams} from "next/navigation"



//Components
import {
    Button,
    Card,
    CardBody, ListItem,
    Typography
} from "@material-tailwind/react";
import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {Collapse, List} from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";
import {Breadcrumbs,Link} from "@mui/material/"





//Icons

const Icons = {
     share_icon: "/icons/button_icons/share_icon.svg",
     info_Icon:  "/icons/info_icon.svg",
     leftArrow:  "/icons/button_icons/navigation_icon/leftArrow.svg",
     rightArrow:  "/icons/button_icons/navigation_icon/rightArrow.svg",
     finanze_icon:  "/icons/finanze_icon.svg",
     point_system_icon:  "/icons/point_system_icon.svg",
     radiobutton_dot:   "/icons/radio_point.svg",
     point_system_diagramm:  "/icons/point_system_diagram/diagram.svg",
    APPLE_LOGO:  "/icons/brands/Apple_logoo.svg",
}
import HomeIcon from '@mui/icons-material/Home';



//ProductImages TODO Fetch from DB





//Cart Method

import {UpdateCart} from "@/lib/api/cart_api"

//Events
//import {eventBus} from "../../methods/event/eventBus.tsx"






///////////////////////Structure//////////////////
import {DiscountOption, Item_Structure} from "@/types/product_type";


/////////Cart Item structure

//Shoppingcart Item Settings
import {CartItem} from "@/types/cart_types";



//Variables






import {ColorOption} from "@/types/product_type";
import ToolTip_ui from "@/components/ui/Tooltip/tooltip";
import FetchTimeout from "@/utils/timeout";
import {json} from "node:stream/consumers";
import Product_Details from "@/app/(public)/products/[slug]/components/product_details";
import Product_Overview from "@/app/(public)/products/[slug]/components/product_overview";
import {images} from "next/dist/build/webpack/config/blocks/images";


//[IPHONE_PACK,IPHONE_UB,IPHONE_FR,IPHONE_B,IPHONE_BE],







//get Cache, maybe this one to be moved to nav_bar ? because navbar is shared across the app
//update the shoppingcart on client adding item to shopping cart









//TODO Change on deploying
async function getItemsBySlug ({slug, signal}:{slug:string|undefined, signal?: AbortSignal}): Promise<Item_Structure | null> {

    //  console.log("fetched")

    //TODO change the link on deploying
    //TODO Generate SLUG ON ADMIN PANEL WHEN ADDING PRODUCT (IMPORTANT!!!)
    //TODO now we do fetch without Query, later maybe ?
    const item = await fetch(`/api/products/${slug}`, {
        method: "POST",
        credentials: "include",
        signal: signal,
        body: JSON.stringify({CName:"products"})
    });


    if(!item.ok)
        throw new Error("Failed to fetch items.");

    const res = await item?.json();
    const data = res.item as Item_Structure;
    //console.log(data);
    return data ?? null;
}



const Collapse_ProductSpecsList = ()=>{
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [isOpen4, setIsOpen4] = useState(false)


    return(

        <div className="p-4 mt-10">
            <Card className="p-10 pl-20 pr-20 border-none bg-surface">
                <List className="border-t ">
                    <ListItem className="flex justify-between font-bold text-xl" onClick={()=>setIsOpen1((current) => !current)}>
                        Produktbeschreibung
                        <NavArrowDown className={`${isOpen1 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen1}>
                        <Typography>
                            Keine Produktbeschreibung vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t ">
                    <ListItem className="flex justify-between font-bold text-xl" onClick={()=>setIsOpen2((current) => !current)}>
                        Technische Daten
                        <NavArrowDown className={`${isOpen2 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen2}>
                        <Typography>
                            Keine Technische Daten vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t ">
                    <ListItem className="flex justify-between font-bold text-xl" onClick={()=>setIsOpen3((current) => !current)}>
                        Allgemeine Produktsicherheit
                        <NavArrowDown className={`${isOpen3 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen3}>
                        <Typography>
                            Keine Allgemeine Produktsicherheit vorhanden

                        </Typography>
                    </Collapse>

                </List>
                <List className="border-t">
                    <ListItem className="flex justify-between font-bold text-xl"  onClick={()=>setIsOpen4((current) => !current)}>
                        Produktbewertungen
                        <NavArrowDown className={`${isOpen4 ? "rotate-180" : "" }`}/>
                    </ListItem>
                    <Collapse open={isOpen4}>
                        <Typography>
                            Keine Produktbewertungen vorhanden

                        </Typography>
                    </Collapse>

                </List>
            </Card>
        </div>



    )
}


//Main

export default function SingleProduct() {



//Slug
    const {slug} = useParams<{ slug: string }>();






    const {data: fetched_items, isLoading} = useQuery({
        queryKey: ["product", slug],
        queryFn: async ({signal}) => {
            return await getItemsBySlug({slug: slug, signal})
        },
        //after 10mins data becomes stale, but it will get the data from cache
        //10mins
        staleTime: 60 * 60 * 1000,
        //1h
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
    })


    //Which collection to show based on ColorSelected
    const [ImageVariantIndex, setImageVariantIndex] = useState<number>(0)

    //Variants we have
    const variants = useMemo(
        () =>
            [...fetched_items?.options?.colors ?? []]
        ,
        [fetched_items?.options?.colors]
    );

    console.log("Images : " + JSON.stringify(fetched_items?.options?.colors[0].imagesURL));


    //Current images to show on big slide
    const currentImages = useMemo(
        //return the current selected variant among other variants
        () => variants[ImageVariantIndex],
        [variants, ImageVariantIndex]
    );



    //TODO use skeleton loading on FETCHING
    if (isLoading)
        return (<div className="w-full h-screen"></div>);


    return (

        <div className="max-w-[1400px] mx-auti ml-auto mr-auto  h-[2000px] scroll-auto">
            <div className="w-full p-4 ml-5 mt-5">
                    <Breadcrumbs aria-label="breadcrumbs" className="text-gray-500">
                        <Link underline="hover" color="inherit" href="/public">
                            <HomeIcon/>
                        </Link>
                        <Link underline="always" color="inherit" href="/public">
                            Products
                        </Link>

                        <Link underline="always" color="inherit" href="/public">
                            {slug}
                        </Link>
                    </Breadcrumbs>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-2 min-h-[200vh]">
                {/* Left column */}
                <div
                    className="w-full sticky top-0 h-screen "
                >
                   <Product_Overview data={fetched_items} Images={currentImages} Icons={Icons}/>
                </div>

                {/* Right column */}
                <div
                    className="w-full h-full"
                >

                    <Product_Details inFetched_item={fetched_items} setVariant={setImageVariantIndex} Icons={Icons} />

                </div>
            </div>

            <div className="w-full h-auto ">
                <Collapse_ProductSpecsList/>
            </div>


        </div>

    )

}




