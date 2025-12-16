"use client"

//Logo to the left, search button in the middle , market search (dropdown ? ), Login and Basketkorb logo

import {Typography} from "@material-tailwind/react";
import {NavArrowDown, Xmark} from "iconoir-react";


import {useEffect, useState} from "react";
import Drawer from '@mui/material/Drawer';
import router, {useRouter} from "next/navigation";
//Import Functions

//SearchBar
import  SearchBar from "./Search_bar"

//Event
//import {eventBus} from "../../methods/event/eventBus.tsx"
import {cart_count_observer} from "@/app/providers/patterns/beobachter";


import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";


//Logo
const Logo = "/icons/company_logo/template_logo.svg";
//ButtonIcons
const buttonIcons = {
    Profile_Icon : "/icons/topBar_icons/profile_icon.svg",
    ShoppingCart_Icon : "/icons/topBar_icons/shopping_cart_icon.svg",
     Favourite_Icon : "/icons/topBar_icons/favourite_icon.svg"
}


//ROUTES
import {ROUTES} from "@/lib/Routes/routes";


const Search_Placeholder = "Was suchst Du?";


function company_Logo({navigate}: {navigate: AppRouterInstance}) {


    return (
        <div
            onClick={()=>navigate.push("/")}
            className="w-full   ml-10 mr-5 flex flex-wrap p-2  justify-center cursor-pointer">
            <img className="w-12 h-12 flex object-contain " src={Logo} alt="Company Logo"/>
        </div>

    );
}









function TemporaryDrawer({open,setOpen,toggleDrawer}:{open:boolean, setOpen:(value:boolean| ((perv:boolean)=>boolean)) => void, toggleDrawer:(newOpen:boolean)=>()=>void})    {



    const DrawerList = (
        <div className="w-[500px] p-5">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <Typography variant={"h5"}>
                        Markt auswählen
                    </Typography>
                    <div>
                        <Xmark className="cursor-pointer" onClick={() => setOpen(false)}/>
                    </div>
                </div>

                <Typography className="mt-5" variant={"paragraph"}>
                    Bitte gib deine Postleitzahl oder Stadt ein, um Märkte in deiner Nähe anzuzeigen. Dadurch kannst du die Produktverfügbarkeit im Markt überprüfen.
                </Typography>

                <SearchBar placeHolder={"PLZ/Stadt"}/>


            </div>

        </div>
    );

    return (
        <div>
            <Drawer  anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}


function Toggle_Drawer ({open,setOpen}: {open:boolean, setOpen:(value:boolean| ((perv:boolean)=>boolean)) => void}) {
    // const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);


    return (
        <TemporaryDrawer setOpen={setOpen} open={open} toggleDrawer={toggleDrawer}/>
    )
}


/*function searchBar(){
    return (

        //50% width
        <div className=" inline-block w-[calc(100%-50%)] ">
            <div className="relative  flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                    <path fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                          clipRule="evenodd"/>
                </svg>

                <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border
            border-slate-200 rounded-md pl-10 pr-3 py-2
            transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300
            shadow-sm focus:shadow"
                    //Placeholder text
                       placeholder={Search_Placeholder}
                />

                <button className="rounded.nd bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all
                                shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700
                                active:shoadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    Suchen
                </button>

            </div>

            <span></span>
        </div>
    );

}*/


function Search_for_Store_location(){

    const [open, setOpen] = useState(false);


    return (

        <div
            onClick={()=>{
                setOpen(!open);
            }}
            className="flex flex-row hover:opacity-75 cursor-pointer">
            <div className="flex flex-col text-white">
                <Typography variant="h6" >Markt Auswählen</Typography>
                <Typography className="text-[10px]">Markt Auswählen</Typography>
                <Toggle_Drawer open={open} setOpen={setOpen}/>
            </div>
            <NavArrowDown/>
        </div>
    )
}

const ICONS = ["/icons/topBar_icons/profile_icon.svg",
    "/icons/topBar_icons/favourite_icon.svg","/icons/topBar_icons/shopping_cart_icon.svg"];



const Icon_button_group = ()=>{
    const router = useRouter();

    const [cartCounter, setCartCounter] = useState<number>(0)


    const update_counter = ()=>{
        getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            console.log("Called and updated");
        });
    }






    useEffect(()=>{

        getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            cart_count_observer.subscribe(update_counter);

        });

    },[cartCounter])

    return (
        <div className="ml-5 space-x-4  inline-block  flex-1  mr-2 ">
            {ICONS.map((item,index)=>{
                return (
                    <div
                        key={index}
                        className="relative inline-flex">
                        <div className="">
                            <button

                                onClick={()=>{
                                    switch (index) {
                                        case 0:
                                            router.push(ROUTES.MY_PROFILE);
                                            break;
                                            case 1:
                                                break;
                                        case 2:
                                            router.push(ROUTES.CHECKOUT_CART)
                                            break;

                                        default:
                                            router.push(ROUTES.HOME);
                                            break;
                                    }


                                 /*   if(index === ICONS.length-1){
                                        router.push(ROUTES.CHECKOUT_CART)
                                    }*/
                                }}

                                className="inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-md border
                         border-slate-200 bg-white text-center align-middle font-sans text-sm font-medium leading-none text-slate-800
                          transition-all duration-300 ease-in  hover:bg-slate-100">

                                <img className="bg-white" src={item} alt={""}/>
                            </button>
                        </div>

                        {/*Indicator*/}
                        { index != 0 && cartCounter &&
                            <span
                                className="absolute right-[6%] top-[6%] grid min-h-[10px] min-w-[10px] -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border-none
                         bg-black px-1 py-0.5 text-xs leading-none text-white">{cartCounter}</span>
                        }
                    </div>

                    /*     <button
                             onClick={()=>{
                                 if(index === ICONS.length-1){
                                         navigate("/checkout")
                                 }
                             }}
                             className="bg-white border p-1 rounded-sm hover:opacity-75 cursor-pointer">
                         <img className="bg-white" src={item}/>
                     </button>*/




                )

            })}
        </div>


    )
}


//TODO ADD BADGE ICON
async function getCheckout_Badge_Counter():Promise<number>{
    try {
        const res = await fetch("/api/badges/top_bar_checkout_items_count_badge/GET", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const items_count = await res.json();
        return items_count.data;


    }catch(error){
        console.error(error);
        return 0;
    }
}

export default function Top_bar_layout() {
    const router = useRouter();

/*
    useEffect(() => {
        if(cartCounter)
            return;

        console.log("top bar ref");
        getCheckout_Badge_Counter().then((v)=>{
            setCartCounter(v);
            setCartCounterIni(true);
        });
    }, [cartCounter]);*/



    return (
        <div className="w-full">
            <div className="grid grid-cols-10 p-2 w-full bg-[#CC291F] h-max-12 gap-2  items-center justify-center">

              {/*  <div className="col-span-2 bg-purple-500">
                    ds
                </div>

                <div className="col-span-1">
                    ds
                </div>

                <div className="col-span-1 ">
                    ds
                </div>
                <div className="col-span-1 ">
                    ds
                </div>*/}
                 <div className="flex col-span-1  ">
                {company_Logo({navigate: router})}
            </div>
            <div className="flex col-span-5 justify-center items-center">
                {SearchBar({placeHolder: Search_Placeholder})}

            </div>

            <div className="flex col-span-2 justify-center items-center ">
                {Search_for_Store_location()}
            </div>

            <div className="flex col-span-2 justify-center items-center">
                {<Icon_button_group/>}
            </div>
            </div>

        </div>
    )

}


