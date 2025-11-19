"use client"
// import {getToken} from "../methods/get_csrf";


//Layouts
import GetSponsoredProducts_Cards from "@/app/components/ui/sponsored_products_layout";
import CategoriesCard_NavList_Layout from "@/app/components/ui/CategryCard_NavList_Layout"
import Home_product_card_layout from "@/app/components/ui/home_product_card_layout"
import BrandsCard_List_Layout from "@/app/components/ui/brandcard_list_layout"




//Templates to be replaced with URL from database
/*import Phone_IMAGE from "../assets/Werbung/Phone_Ads.jpg";
import Laptop_IMAGE from "../assets/Werbung/Laptop_Ads.png";
import Tv_IMAGE from "../assets/Werbung/TV_Ads.png";
import Gaming_IMAGE from "../assets/Werbung/Gaming_Ads.jpeg";*/

//ICONS Ads

//TODO Store in database
/*import icon_angebot from "/angebot_icon.png"
import icon_handyvertraege from "../assets/icons/Icons_ads/handyverträge.png"
import icon_super_spare_sale from "../assets/icons/Icons_ads/super_spare_sale.png"
import icon_wochenendknaller from "../assets/icons/Icons_ads/wochenende-knaller.png"*/


//Brands

/*import apple_Logo from "../assets/Brands_Logo/Apple_logo.svg"
import microsoft_logo from "../assets/Brands_Logo/Microsoft_logo.svg"
import philips_logo from "../assets/Brands_Logo/Philips_logo.svg"
import google_logo from "../assets/Brands_Logo/Google_logo.svg"
import miele_logo from "../assets/Brands_Logo/Miele_logo.svg"
import samsung_logo from "../assets/Brands_Logo/Samsung_Logo.svg"*/


//Fetching
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Item_Structure} from "@/types/product_type";


import {useRouter} from "next/navigation";


//Structure
///////////////////////Structure//////////////////
type AllItems_Structure = Item_Structure[];
///////////////////////Structure//////////////////





//TODO Fetch from database
const Top_deals_Category_List = [
    {image: "/Images/Werbung/Phone_Ads.jpg", title: "Händys" },
    {image: "/Images/Werbung/Laptop_Ads.png", title: "Laptops" },
    {image: "/Images/Werbung/TV_Ads.jpg", title: "Tvs" },
    {image: "/Images/Werbung/Gaming_Ads.jpeg", title: "Gaming" },
    {image: "/Images/Werbung/IPhoneWerbung.png", title: "Smartwachtes" },
];


const icons_ads = [
    {image: "/icons/ads/angebot_icon.png", title: "Angebote" },
    {image: "/icons/ads/icon_spare_sale.png", title: "Super Spar Sale" },
    {image: "/icons/ads/handyverträge.png", title: "Handysvertäge" },
    {image: "/icons/ads/wochenende-knaller.png", title: "Wochenend-Knaller" },
    {image: "/icons/ads/angebot_icon.png\"", title: "myTemplate" },
];

const brands_icon = [
    {image: "/icons/brands/philips_logo.svg", title: "Angebote" },
    {image: "/icons/brands/Microsoft.svg", title: "Super Spar Sale" },
    {image: "/icons/brands/Apple_logo.svg", title: "Handysvertäge" },
    {image: "/icons/brands/Google_logo.svg", title: "Wochenend-Knaller" },
    {image: "/icons/brands/Samsung_Logo.svg", title: "Wochenend-Knaller" },
    {image: "/icons/brands/Miele_logo.svg", title: "Wochenend-Knaller" },



];

const PORT = 2500;



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

    //const navigate = useNavigate();
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


    return (
        <div className="me-5">
            <GetSponsoredProducts_Cards/>
            <CategoriesCard_NavList_Layout sectionTitle={"Top-Deals nach Kategorien mit kostenloser Lieferung"} top_deals_Category_List={Top_deals_Category_List}/>

            {/*Hero Section*/}
            <div className="mt-10 bg-black p-10">
                <h1 className="font-extrabold text-3xl font-mono">Cool bleiben bei jeder Temperatur</h1>
                <h2 className="mt-3">Ob Kühlschrank oder Klimagerät - hier findest du alles für die perfekte Abkühlung</h2>
                <p className="mt-5 cursor-pointer underline hover:text-red-500 inline-flex" onClick={()=> router.push("/")}>▶ Zu den Produkten</p>
            </div>


            <div className="mt-10">
                <div>
                    <p className=" p-5 text-2xl font-bold text-black">Aktuell beliebt</p>
                </div>
                <div className=" flex w-full overflow-scroll scrollbar-hide">
                    {fetched_items && fetched_items.map((inItem)=>{
                        return (<Home_product_card_layout prefetch={prefetch} key={inItem.slug}  item={inItem} isDiscounted={false} isSponsored={false} OriginalPrice={"499,- €"}/>
                        )
                    })}
                </div>
            </div>

            <CategoriesCard_NavList_Layout sectionTitle={"Deals, Aktionen und Services"} top_deals_Category_List={icons_ads}/>
            <BrandsCard_List_Layout sectionTitle={"Top Marken"} IN_Brands={brands_icon}/>

            {/*Hero Section*/}
            <div className="mt-10 bg-black p-10 m-8">
                <h1 className="font-extrabold text-3xl ">Mehr als 2 Mio. Menschen lesen unseren Newsletter. Bist du dabei?</h1>
                <h2 className="mt-3">Erfahre als Erstes von den besten Angeboten, Neuheiten & Trends. Direkt in deinem Posteingang.
                </h2>
                <p className="mt-5 cursor-pointer underline hover:text-red-500 inline-flex" onClick={()=> router.push("/")}>▶ Jetzt anmelden</p>
            </div>
        </div>

    );

}




/*

export default function Home  (){
    return (
        <div>
            Hello Home page
        </div>
    )
}*/
