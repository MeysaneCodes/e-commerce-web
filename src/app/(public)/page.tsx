"use client"


//Layouts
import GetSponsoredProducts_Cards from "@/components/ui/sponsored_products_layout";
import CategoriesCard_NavList_Layout from "@/components/ui/CategryCard_NavList_Layout"
import Home_product_card_layout from "@/components/ui/home_product_card_layout"
import BrandsCard_List_Layout from "@/components/ui/brandcard_list_layout"


//Fetching
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Item_Structure} from "@/types/product_type";


import {useRouter} from "next/navigation";
import {CaretLeftIcon, CaretRightIcon} from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";
import Two_cards from "@/components/ui/two_cards_layout";


//Structure
///////////////////////Structure//////////////////
type AllItems_Structure = Item_Structure[];
///////////////////////Structure//////////////////





//TODO Fetch from database
const Top_deals_Category_List = [
    {image: "/Images/Werbung/Phone_Ads.jpg", title: "Händys" },
    {image: "/Images/Werbung/Laptop_Ads.png", title: "Laptops" },
    {image: "/Images/Werbung/TV_Ads.png", title: "Tvs" },
    {image: "/Images/Werbung/Gaming_Ads.jpeg", title: "Gaming" },
    {image: "/Images/Werbung/Smartwatch.png", title: "Smartwachtes" },
    {image: "/Images/Werbung/Smartwatch.png", title: "Smartwachtes" },

];


const icons_ads = [
    {image: "/icons/ads/angebot_ads_icon.png", title: "Angebote" },
    {image: "/icons/ads/super_spare_sale_ads.png", title: "Super Spar Sale" },
    {image: "/icons/ads/handy_verträge.png", title: "Handysvertäge" },
    {image: "/icons/ads/outlet_ads.png", title: "Wochenend-Knaller" },
    {image: "/icons/ads/wochenende_knaller.png", title: "Wochenend-Knaller" },
    {image: "/icons/ads/angebot_ads_icon.png", title: "myTemplate" },

];

const brands_icon = [
    {image: "/icons/brands/AMD_logo.png", title: "AMD" },
    {image: "/icons/brands/Bosch-logo.svg", title: "Bosch" },
    {image: "/icons/brands/Microsoft_logo.svg", title: "Microsoft" },
    {image: "/icons/brands/Miele_logo.png", title: "Miele" },
    {image: "/icons/brands/Apple_logo.png", title: "Apple" },
    {image: "/icons/brands/Samsung_logo.png", title: "Samsung" },
    {image: "/icons/brands/Xiaomi_logo.png", title: "Xiaomi" },




];


async function getAllItems ({signal}:{ signal?: AbortSignal}): Promise<AllItems_Structure | null> {

    //TODO change the link on deploying
    //TODO Generate SLUG ON ADMIN PANEL WHEN ADDING PRODUCT (IMPORTANT!!!)
    //TODO now we do fetch without Query, later maybe ?
    const item = await fetch(`api/products`, {
        method: "POST",
        credentials: "include",
        signal: signal,
        body: JSON.stringify({CName: "products"}),
    });

    if(!item.ok)
        throw new Error("Failed to fetch items.");

    const res = await item?.json();
    const data = res.item as AllItems_Structure;
    return data ?? null;
}



export default function Home   () {
    const QueryClient = useQueryClient();



    const {data: fetched_items} = useQuery({
        queryKey: ["product"],
        queryFn: async ({signal})=>{
            return await getAllItems({signal})
        },
        //after 10mins data becomes stale, but it will get the data from cache
        //10mins
        staleTime: 60 * 60 * 1000,
        //1h
        gcTime:60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
    })





    //TODO RECHECK FOR SIGNAL and abortion of FETCH
    //Warming data when user hover on item, for time optimisation
    const prefetch = (slug :string | undefined)=>{
        if (!slug) return;

        const state = QueryClient.getQueryState<Item_Structure>(['product', slug]);
        const isFresh =
            !!state && Date.now() - (state.dataUpdatedAt ?? 0) < 10 * 60 * 1000; // 10 min

        if (isFresh) {
            console.log("cache is still fresh")
            return; // nothing to do
        }

        //if not fresh we fetch and add it to cache
        QueryClient.prefetchQuery({
            queryKey: ['product', slug],
            queryFn: async ({ signal }) => {
                const res = await fetch(`/api/products/product/${slug}`, { signal });
                if (!res.ok) throw new Error('Failed to fetch product');
                const json = await res.json();
                return (json.item as Item_Structure) ?? null;
            },
            staleTime: 60 * 60 * 1000, // 1h
            gcTime: 60 * 60 * 1000,    // 1h
        });
    }

    const router = useRouter();


    //scrollable

    //Navigation Button condition
    const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState<boolean>(true);
    const [isRightButtonDisabled, setIsRightButtonDisabled] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement | null>(null);
    const [current_x_scroll_value, setCurrent_x_scroll_value] = useState<number>(0);


    const update_scroll_value =  () => {
        setCurrent_x_scroll_value(divRef.current?.scrollLeft ?? 0);

        const el = divRef.current;
        if (!el)return;

        if(el.scrollLeft + el.clientWidth === el.scrollWidth)
            setIsRightButtonDisabled(true);
        else setIsRightButtonDisabled(false);

        if(el.scrollLeft === 0)
            setIsLeftButtonDisabled(true);
        else setIsLeftButtonDisabled(false);
    }


    useEffect(() => {

        const  el = divRef.current;
        console.log("Scrolling pos on x is : " + divRef.current?.scrollLeft);
        console.log("Scrolling pos on x is : " + divRef.current?.scrollWidth);


        if(!el)
            return;

        el.addEventListener("scroll", update_scroll_value)


        return () => {
            el.removeEventListener("scroll", update_scroll_value)
        }

    }, []);

    return (
        <div className="relative  max-w-[1400px]  w-full mx-auto ml-auto mr-auto  ">
            <GetSponsoredProducts_Cards/>
            <CategoriesCard_NavList_Layout sectionTitle={"Deals, Aktionen und Services"} top_deals_Category_List={icons_ads}/>
            <div className="mt-10">
                <div className="flex justify-between items-center">
                    <p className=" p-5 text-2xl font-bold text-black">Aktuell beliebt</p>
                    <div  id="NavigationButton" className="flex flex-row gap-2">
                        <button
                            disabled={isLeftButtonDisabled}
                            onClick={(e)=>{
                                if(divRef.current){



                                    divRef.current.scrollBy({
                                        left:-500,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                            className={'group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50'}
                            // onClick={() => setActiveIndex(activeIndex - 1)}
                        >
                            <CaretLeftIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isLeftButtonDisabled ? "text-black" : "text-white"}`} />
                        </button>

                        <button
                            disabled={isRightButtonDisabled}
                            onClick={(e)=>{
                                if(divRef.current){
                                    divRef.current.scrollBy({
                                        left:500,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                            className="group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50"
                            // onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                            <CaretRightIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isRightButtonDisabled ? "text-black" : "text-white"}`}   />
                        </button>
                    </div>
                </div>
                <div ref={divRef} className="relative w-full flex flex-row gap-[13.3px] overflow-scroll scrollbar-hide ">
                    {fetched_items && fetched_items.map((inItem)=>{
                        return (<Home_product_card_layout prefetch={prefetch} key={inItem.slug}  item={inItem} isDiscounted={false} isSponsored={false} OriginalPrice={"499,- €"}/>
                        )
                    })}

                </div>
            </div>
            <GetSponsoredProducts_Cards/>
            <CategoriesCard_NavList_Layout sectionTitle={"Top-Deals nach Kategorien mit kostenloser Lieferung"} top_deals_Category_List={Top_deals_Category_List}/>
            <BrandsCard_List_Layout sectionTitle={"Top Marken"} IN_Brands={brands_icon}/>
            <CategoriesCard_NavList_Layout sectionTitle={"Top-Deals nach Kategorien mit kostenloser Lieferung"} top_deals_Category_List={Top_deals_Category_List}/>
            <div className="mt-10">
                <div className="flex justify-between items-center">
                    <p className=" p-5 text-2xl font-bold text-black">Aktuell beliebt</p>
                    <div  id="NavigationButton" className="flex flex-row gap-2">
                        <button
                            disabled={isLeftButtonDisabled}
                            onClick={(e)=>{
                                if(divRef.current){



                                    divRef.current.scrollBy({
                                        left:-500,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                            className={'group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50'}
                            // onClick={() => setActiveIndex(activeIndex - 1)}
                        >
                            <CaretLeftIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isLeftButtonDisabled ? "text-black" : "text-white"}`} />
                        </button>

                        <button
                            disabled={isRightButtonDisabled}
                            onClick={(e)=>{
                                if(divRef.current){
                                    divRef.current.scrollBy({
                                        left:500,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                            className="group flex w-10 h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50"
                            // onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                            <CaretRightIcon className={`h-6 w-6  group-data-[isButtonDisabled=true]:text-black ${isRightButtonDisabled ? "text-black" : "text-white"}`}   />
                        </button>
                    </div>
                </div>
                <div ref={divRef} className="relative w-full flex flex-row gap-[13.3px] overflow-scroll scrollbar-hide ">
                    {fetched_items && fetched_items.map((inItem)=>{
                        return (<Home_product_card_layout prefetch={prefetch} key={inItem.slug}  item={inItem} isDiscounted={false} isSponsored={false} OriginalPrice={"499,- €"}/>
                        )
                    })}

                </div>
            </div>
            <CategoriesCard_NavList_Layout sectionTitle={"Deals, Aktionen und Services"} top_deals_Category_List={icons_ads}/>
            <GetSponsoredProducts_Cards/>
            <Two_cards/>
            {/*Hero Section*/}
            <div className="w-full mt-10 bg-red-700 rounded-3xl p-10 text-white">
                <h1 className="font-extrabold text-3xl font-mono">Cool bleiben bei jeder Temperatur</h1>
                <h2 className="mt-3">Ob Kühlschrank oder Klimagerät - hier findest du alles für die perfekte Abkühlung</h2>
                <p className="mt-5 cursor-pointer underline hover:text-red-500 inline-flex" onClick={()=> router.push("/")}>▶ Zu den Produkten</p>
            </div>
            <Two_cards/>

            {/*Hero Section*/}
            <div className="w-full mt-10 bg-black p-10  text-white">
                <h1 className="font-extrabold text-3xl ">Mehr als 2 Mio. Menschen lesen unseren Newsletter. Bist du dabei?</h1>
                <h2 className="mt-3">Erfahre als Erstes von den besten Angeboten, Neuheiten & Trends. Direkt in deinem Posteingang.
                </h2>
                <p className="mt-5 cursor-pointer underline hover:text-red-500 inline-flex" onClick={()=> router.push("/")}>▶ Jetzt anmelden</p>
            </div>
        </div>

    );

}
