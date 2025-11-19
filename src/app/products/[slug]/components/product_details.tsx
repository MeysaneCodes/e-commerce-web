"use client"

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import FetchTimeout from "@/utils/timeout";
import {Radio, RadioGroup} from '@mui/material';
import {DiscountOption, Item_Structure} from "@/types/product_type";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import ToolTip_ui from "@/app/components/ui/Tooltip/tooltip";
import {CartItem} from "@/types/cart_types";
import {UpdateCart} from "@/lib/api/cart_api";


type Props = {
    // fetched_item : Item_Structure | undefined | null
    inFetched_item : Item_Structure | undefined | null
    setVariant : (value: number | ((prev: number) => number)) => void
    Icons: any
}

export default function Product_Details ({inFetched_item,setVariant, Icons }:Props){
    console.log("Product details render")

    const [openPointSystem_modal, setOpenPointSystemModal] = useState(false);
    const [IMAGE_INDEX, set_IMAGE_TOSHOW] = useState<number>(0);
    const [StorageSelected_INDEX, setSelectedStorage] = useState<number>(0);
    const [isNewProductClicked, setNewProductClicked] = useState<boolean>(true);
    const [devicecondition, setDevicecondition] = useState<number>(0);
    const [isDiscount, setIsDiscount] = useState<boolean>(false);
    const [isTimeOutOn, setIsTimeOutOn] = useState<boolean>(false);
    const [finalPrice, setFinalPrice] = useState<string | undefined>("0");



    const enum deviceConditionList  {
        Excellent = "Exzellent",
        Very_Good = "Sehr Gut",
        Good = "Gut",
    }



    const Modal = ({setOpen}: {setOpen:Dispatch<SetStateAction<boolean>>})=>{
        const modalRef = useRef<HTMLDivElement>(null);


        useEffect(()=>{
            function handleClickOutside(event: MouseEvent){
                if(modalRef.current && !modalRef.current.contains(event.target as Node)){
                    setOpen(false);
                }
            }

            function handleEscKey(event:KeyboardEvent){
                if (event.key ==="Escape"){
                    setOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", (handleEscKey));
            document.body.style.overflow = "hidden";


            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscKey);
                document.body.style.overflow = "auto";
            }
        },[])


        return (


            //Modal Overlay
            <div className="fixed inset-0 bg-slate-950/50 flex justify-center items-center z-[9999] ">
                {/* Modal Content */}
                <div ref={modalRef} className=" bg-white rounded-xl shadow-2xl border border-slate-200 w-1/2 scale-95 overflow-hidden">
                    <div className=" max-h-[90vh] p-7 pb-2 flex flex-col ">

                        {/*Modal Title*/}

                        <div className="flex">
                            <Typography variant="h4">
                                Über myTemplate-Punkte
                            </Typography>
                        </div>

                        {/*Modal Description*/}
                        <div className="overflow-y-auto flex-1 ">

                            <div className=" flex content-center items-center justify-center ">
                                <img src={Icons.point_system_diagramm} alt={""}/>
                            </div>
                            <div className="">

                                <div className=" font-semibold">
                                    <Typography variant="paragraph">
                                        Als myTemplate-Kunde punktest du bei jedem Einkauf. So funktioniert es:
                                    </Typography>
                                </div>

                                <div className="space-y-2 text-black p-5" >
                                    <Typography variant="paragraph">• Beim Kauf im Markt deine (digitale) myTemplate-Karte vorzeigen,</Typography>
                                    <Typography variant="paragraph">• In der App oder online shoppen</Typography>
                                    <Typography variant="paragraph">• Automatisch mindestens 5 Punkte pro ausgegebenem Euro erhalten</Typography>
                                    <Typography variant="paragraph">
                                        • Die gesammelten Punkte 30 Tage nach dem Kauf in einen Coupon umwandeln und beim nächsten Einkauf sparen.
                                        Dabei kannst du deine Punkte wie folgt eintauschen:
                                    </Typography>
                                    <div className="pl-4 space-y-1">
                                        <Typography variant="paragraph">• 10.000 Punkte in einen 10.- Euro Coupon (50.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 25.000 Punkte in einen 25.- Euro Coupon (125.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 50.000 Punkte in einen 50.- Euro Coupon (250.- Mindestbestellwert)</Typography>
                                        <Typography variant="paragraph">• 100.000 Punkte in einen 100.- Euro Coupon (500.- Mindestbestellwert)</Typography>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="p-5 flex justify-end ">
                            <Button  className="p-2 rounded-none bg-black cursor-pointer underline text-white" onClick={()=>setOpen(false)}>
                                Mehr über myTemplate-Punkte erfahren
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }


    //Preparing the method for use
    const {start:startTimeOut} = FetchTimeout({setLoading: setIsTimeOutOn, delay:300});





    useEffect(()=>{

        if(!inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount){

            setFinalPrice(Intl.NumberFormat("de-DE", {
                style:"currency",
                currency: "EUR"
            }).format(inFetched_item?.options?.colors[StorageSelected_INDEX].variants[StorageSelected_INDEX].price ?? 0));
            setIsDiscount(false);
            return;
        }
        //console.log("didnt return")

        function  calculateDiscountPrice ({price,discountValue,valid_until,discountType}: {price: number | undefined,valid_until:DiscountOption["valid_until"] , discountValue:DiscountOption["value"], discountType: DiscountOption["type"] }) {



            const now = new Date();
            const isValid = !valid_until || new Date(valid_until) >= now;
            //TODO fix check of undefined
            if(!discountValue || !price) return "0";
            if (!isValid){
                setIsDiscount(false)
                return price?.toString();
            }

            if(discountType === "PERCENTAGE"){
                setIsDiscount(true);
                const calculatedPrice = (price ?? 0 ) * ( 1 - (discountValue ?? 0)/100);
                return  Intl.NumberFormat('de-DE',{
                    style: "currency",
                    currency: "EUR"
                }).format(calculatedPrice);


            }else if(discountType === "AMOUNT"){
                setIsDiscount(true);
                const calculatedPrice =  (price ?? 0) - (discountValue ?? 0);
                return  Intl.NumberFormat('de-DE',{
                    style: "currency",
                    currency: "EUR"
                }).format(calculatedPrice);
            }else return price?.toString();
        }


        setFinalPrice(calculateDiscountPrice({price: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].price,
            discountValue: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.value,
            discountType: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.type,
            valid_until: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.valid_until})
        );


    }, [IMAGE_INDEX, StorageSelected_INDEX,inFetched_item?.options?.colors]);




    const variants = [...inFetched_item?.options?.colors ?? []];


    const discountTypeObject = ()=>{
        if(isDiscount)return [
            {code: "Test", type:inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.type ?? "AMOUNT" , amount: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.value ?? 0,}
        ];
        else return [];
    }


    return (
        <div className="p-4">
            <Card className="h-auto p-5 border-none bg-surface">
                <CardBody>
                    <div>

                        {/*Discount section if activated*/}
                        {(inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount ?? false) &&
                            (<div className="flex gap-2 justify-end">
                                <p className="bg-black text-white text-xs p-1">{(()=>{
                                    if(inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.type === "PERCENTAGE"){
                                        return `- ${inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.value} %`
                                    } else if(inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.type === "AMOUNT"){
                                        return `- ${inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].discount.value} €`
                                    }
                                })()}</p>
                                <p className="text-xs p-1 line-through"> UVP {Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR"
                                }).format(inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].price ?? 0)}</p>
                                <div className="flex ">
                                    <ToolTip_ui imgIndicator={Icons.info_Icon} alt_text={""}
                                                contentText={" Der hier angezeigte Preis ist die unverbindliche Preisempfehlung des Herstellers."} toolTipPos={"tooltip-left"}/>
                                </div>

                            </div>)
                        }


                        {/*Product Price*/}
                        <div>
                            <p className="text-4xl font-bold text-black flex justify-end">
                                {

                                    (()=>{
                                        if((inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].stock ?? 0 )> 0)
                                            return finalPrice;
                                        else return "Out of Stock";
                                    })()

                                }
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <p className="underline text-sm">inkl. MwSt. versandkostenfrei</p>
                        </div>


                        {/*Financing section*/}

                        <div className="flex justify-between mt-5">
                            <div className="flex grid-cols-2 gap-0  m-0 p-0">
                                <div className="w-[50px]  ">
                                    <img className="" src={Icons.finanze_icon} alt={""}/>
                                </div>
                                <div className="ml-2 ">
                                    <div>
                                        <Typography variant="h5">
                                            Finanzierung
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small">
                                            10 mtl. Raten
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small">
                                            Gesamtbetrag: 261,– €
                                        </Typography>
                                    </div>

                                </div>

                            </div>
                            <div>
                                <div>
                                    <Typography variant="small">
                                        eff. Zins p.a. 10.9%**
                                    </Typography>
                                    <Typography variant="small">
                                        26,10 € monatlich
                                    </Typography>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Typography className="mt-3 cursor-pointer font-bold">
                                ***Zum Ratenrechner & rechtl. Hinweise
                            </Typography>
                        </div>

                        {/*Point System section if activated*/}
                        <div className="mt-3 flex items-center gap-1">
                            <img src={Icons.point_system_icon} alt={""}/>
                            <Typography>myTemplate-Punkte</Typography>
                            <div className="border-none"  onClick={() => setOpenPointSystemModal(true)}>
                                <img src={Icons.info_Icon} alt={"Gesponserte Produkte"}/>
                            </div>
                            {/*Modal*/}


                            {openPointSystem_modal && (<Modal setOpen={setOpenPointSystemModal}/>
                            )}

                        </div>


                        {/*Border line separator*/}
                        <div className=" mt-4 border-t border-gray-300"></div>

                        {/*Color Selector*/}

                        <div className="mt-4">
                            <div>
                                <Typography className="font-bold" variant="h5">
                                    Farbe (laut Hersteler): {(() => {
                                    return inFetched_item?.options?.colors[IMAGE_INDEX].name;
                                })()}
                                </Typography>
                            </div>

                            <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide">

                                {/*from database*/}

                                {inFetched_item && inFetched_item.options?.colors.map((_image, index) => (
                                    <div key={index}

                                        //TODO Create system : onClick it shows the pictures of this color and changes the price if differs
                                         onClick={() => {
                                             set_IMAGE_TOSHOW(index);
                                             setVariant(index);
                                             setSelectedStorage(0)
                                         }}
                                         className={`min-w-[150px] flex h-[150px] items-center justify-center border mt-2 ${
                                             IMAGE_INDEX === index ? "border-black border-2" : "border-gray-300"
                                         } hover:border-black cursor-pointer`}>

                                        {/*TODO USE URL INSTEAD OF LOCAL IMAGES, WITH A CDN CLOUD STORAGE*/}

                                        {/*Always Front */}
                                        <img className="object-fill aspect-auto h-[100px]" src={variants[index].imagesURL.front} alt={""}/>

                                    </div>
                                ))}
                            </div>
                        </div>


                        {/*Other Selector, Ex-Storage Capacity*/}

                        <div className="mt-4">
                            <div>
                                <Typography className="font-bold" variant="h5">
                                    Speicherkapazität
                                </Typography>
                            </div>

                            <div className="w-full   flex gap-1 overflow-x-scroll mt-1 scrollbar-hide ">
                                {inFetched_item?.options?.storages && inFetched_item?.options?.storages.map((Storage_capacity, index) => (
                                    <div key={index}

                                        //TODO Create system : onClick it shows the pictures of this color and changes the price if differs
                                         onClick={() => setSelectedStorage(index)}
                                         className={`min-w-[100px]  h-[50px] mt-2 mr-2 flex justify-center items-center border ${
                                             StorageSelected_INDEX === index ? "border-black border-2" : "border-gray-300"
                                         } hover:border-black cursor-pointer`}>
                                        <Typography>
                                            {Storage_capacity}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*Border line separator*/}
                        <div className=" mt-4 border-t border-gray-300"></div>

                        {/*Other Selector, Ex-New Product or Refurbished Product*/}



                        {/*new Product*/}
                        <div className="">
                            <div className={`w-full h-auto border ${isNewProductClicked ? "border-black border-2" : "border-gray-300" } mb-2 `}>

                                <div className="p-5 block ">

                                    {/*Headline Title*/}
                                    <div className="flex mb-5  " onClick={()=>setNewProductClicked(true)}>
                                        <div className="flex items-center justify-between ">



                                            <div className="w-full flex justify-center items-center">
                                                <div>

                                                    <Radio sx={{
                                                        color: "black",
                                                        '&.Mui-checked': {
                                                            color: "red",
                                                        }

                                                        }} checked={isNewProductClicked}/>
                                                </div>

                                                <label
                                                    htmlFor="radio-description-html1" className="shrink-0 relative cursor-pointer w-full">
                                                    <Typography className="">
                                                        Neues Produkt
                                                    </Typography>
                                                </label>


                                            </div>



                                        </div>

                                    </div>

                                    {/*Content*/}

                                    <div>
                                        <div className="mb-2">
                                            <div>
                                                <Typography className="font-bold">
                                                    {inFetched_item?.price}
                                                </Typography>
                                            </div>
                                            <div className="flex ">
                                                <p className="underline text-sm">inkl. MwSt. versandkostenfrei</p>
                                            </div>
                                        </div>

                                        <div className="block">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="block w-2 h-2 bg-green-700"/>
                                                    <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                                </div>

                                                <div>
                                                    <Typography variant="small" className="text-black font-semibold">
                                                        + 0,– €
                                                    </Typography>
                                                </div>

                                            </div>
                                            <Typography variant="small" className="text-slate-700 ">Lieferung 31.07.2025 - 02.08.2025</Typography>


                                            <div className="flex items-center ">
                                                <div className="flex items-center gap-2">
                                                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0" y="0" width="8" height="4" fill="white" stroke="#8B4513" strokeWidth="1"/>

                                                        <rect x="0" y="4" width="8" height="4" fill="#8B4513" stroke="#8B4513" strokeWidth="1"/>
                                                    </svg>
                                                    <Typography variant="small" className="text-[#8B4513] font-semibold">Abholung</Typography>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <Typography variant="small" className="text-slate-700 ">Bitte wähle einen Markt aus&nbsp;</Typography>
                                                <Typography variant="small" className="text-slate-700 cursor-pointer font-semibold ">Markt auswählen</Typography>
                                            </div>

                                            <div className=" mt-4 border-t border-gray-300"></div>


                                        </div>
                                    </div>
                                </div>


                            </div>



                            {/*Refurbished*/}

                            <div className={`w-full h-auto border ${!isNewProductClicked  ? "border-black border-2" : "border-green-200" } mb-2 `}>


                                {/*if checked we display more details otherwise short overview*/}


                                 <div className={`p-5 ${isNewProductClicked ? "block" : "hidden" }`} >

                                {/*Headline Title*/}
                                <div className="flex mb-5 "
                                     onClick={()=>setNewProductClicked(false)}
                                >
                                    <div className="flex items-center justify-between">
                                        <label
                                            className=" group block mr-2  cursor-pointer shadow-sm shadow-slate-950/5 relative h-5 w-5 shrink-0 rounded-full
                                 border border-slate-200 transition-all duration-200 ease-in
                                 hover:shadow-md data-[checked=true]:bg-slate-800 data-[checked=true]:border-slate-800
                                text-slate-950"
                                            data-value=":R5H1:"
                                            data-checked={!isNewProductClicked}
                                            htmlFor="radio-description-html">
                                            <input
                                                id="radio-description-html"
                                                type="radio"
                                                className="hidden"
                                                value=":R5H1:"/>
                                            <span
                                                className="pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4
                                scale-75 opacity-0 transition-all duration-200 ease-in group-data-[checked=true]:scale-100 group-data-[checked=true]:opacity-100">
                                       <img src={Icons.radiobutton_dot} alt={""}/>
                                    </span>
                                        </label>
                                    </div>


                                    <label  htmlFor="radio-description-html" className="shrink-0 relative w-full cursor-pointer">
                                        <Typography className="">
                                            Refurbisched Produkte
                                        </Typography>
                                    </label>
                                </div>

                                {/*Content*/}

                                <div className="">
                                    <div className="flex justify-between">
                                        <div className="mb-2">
                                            <div>
                                                <Typography variant="h5" className="font-bold">
                                                    von Unternehmen X
                                                </Typography>
                                            </div>
                                            <div className="flex ">
                                                <p className="underline text-sm">Zum Impressum</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <Typography className="font-bold flex justify-end">
                                                    576,89 €
                                                </Typography>
                                            </div>
                                            <div className="flex justify-end ">
                                                <p className="underline text-sm justify-end">inkl. MwSt. versandkostenfrei</p>
                                            </div>
                                        </div>


                                    </div>




                                    <div className="block">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="block w-2 h-2 bg-green-700"/>
                                                <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" className="text-black font-semibold">
                                                    + 0,– €
                                                </Typography>
                                            </div>

                                        </div>
                                        <Typography variant="small" className="text-slate-700 ">Lieferung 31.07.2025 - 02.08.2025</Typography>
                                    </div>
                                </div>

                            </div>
                                 <div className={`p-5 ${isNewProductClicked ? "hidden" : "block" }`}>

                                {/*Headline Title*/}
                                <div className="flex mb-5 "
                                     onClick={()=>setNewProductClicked(false)}
                                >


                                    <div className="flex items-center justify-between">

                                        <Radio  sx={{
                                            color: "black",
                                            '&.Mui-checked': {
                                                color: "red",
                                            }

                                        }} checked={!isNewProductClicked}/>

                                        <label  htmlFor="radio-description-html" className="shrink-0 relative w-full cursor-pointer">
                                            <Typography className="font-bold">
                                                Wähle ein refurbished Zustand aus:
                                            </Typography>
                                        </label>
                                    </div>


                                </div>

                                {/*Content*/}

                                <div className="">

                                    {/*Condition Selection*/}
                                    <div className=" grid grid-cols-3 relative gap-0 justify-center mb-5  ">

                                        <div
                                            onClick={()=>setDevicecondition(0)}
                                            className={`w-[150px] p-5 grid-flow-col grid-row-2 border  ${devicecondition === 0 ? " font-bold border-black border-2 scale-110 ": "border-gray-300" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Excellent}
                                            </div>

                                            <Typography className="font-bold">
                                                999 €
                                            </Typography>

                                        </div>

                                        <div
                                            onClick={()=>setDevicecondition(1)}

                                            className={`w-[150px] p-5 grid-flow-col grid-row-2 border  ${devicecondition === 1 ? " font-bold border-black border-2 scale-110 ": "border-gray-300" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Very_Good}
                                            </div>

                                            <Typography className="font-bold">
                                                750 €
                                            </Typography>

                                        </div>

                                        <div
                                            onClick={()=>setDevicecondition(2)}
                                            className={`w-[150px] p-5 grid-flow-col grid-row-2 border  ${devicecondition === 2 ? " font-bold border-black border-2 scale-110 ": "border-gray-300" } items-center text-center 
                                                cursor-pointer  transition ease-out duration-700
                                                
                                                `}>
                                            <div className="">
                                                {deviceConditionList.Good}
                                            </div>

                                            <Typography className="font-bold">
                                                550 €
                                            </Typography>

                                        </div>


                                    </div>
                                    <div>
                                        <Typography variant="small">
                                            Verkauf und Versand durch von
                                        </Typography>
                                    </div>


                                    <div className="flex justify-between">
                                        <div className="mb-2">
                                            <div>
                                                <Typography variant="h5" className="font-bold">
                                                    Unternehmen X geprüft
                                                </Typography>
                                            </div>
                                            <div className="flex ">
                                                <p className="underline text-sm">Zum Impressum</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <Typography className="font-bold flex justify-end">
                                                    576,89 €
                                                </Typography>
                                            </div>
                                            <div className="flex justify-end ">
                                                <p className="underline text-sm justify-end">inkl. MwSt. versandkostenfrei</p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <Typography  className="text-green-600 font-bold">
                                                Refurbished:
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography className="text-green-600 font-bold">
                                                {devicecondition === 0 ? deviceConditionList.Excellent
                                                    : devicecondition === 1 ? deviceConditionList.Very_Good
                                                        : devicecondition === 2 ? deviceConditionList.Good : " "
                                                }
                                            </Typography>
                                        </div>
                                    </div>


                                    ?
                                    {/*Condition Explained*/}
                                    <div className="w-full h-auto bg-[#E6F3F0] p-4">

                                        <Typography className="font-bold" variant="h1" >
                                            Zustand : {
                                            devicecondition === 0 ? deviceConditionList.Excellent
                                                : devicecondition === 1 ? deviceConditionList.Very_Good
                                                    : devicecondition === 2 ? deviceConditionList.Good : " "
                                        }
                                        </Typography>


                                        <div className="mt-5 ">
                                            {/*--------------------------------------------*/}

                                            <div className="flex">
                                                <Typography className="inline" variant="paragraph">
                                                    Gebrauchtes Gerät in {" "}
                                                    <span className="font-bold">
                                                             {
                                                                 devicecondition === 0 ?  "\u00A0ausgezeichnetem Zustand."
                                                                     : devicecondition === 1 ? "\u00A0sehr gutem Zustand mit minimalen Gebrauchsspuren."
                                                                         : devicecondition === 2 ? "\u00A0gutem Zustand." : " "
                                                             }
                                                       </span>
                                                </Typography>

                                            </div>




                                            {/*--------------------------------------------*/}

                                            <div className="flex">

                                                <Typography className="inline font-bold" variant="paragraph">
                                                    Funktionsfähigkeit: {" "}
                                                    <span className="font-normal">
                                                           voll funktionsfähig.
                                                       </span>
                                                </Typography>

                                            </div>


                                            {/*--------------------------------------------*/}

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Gehäuse:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0 Keine Kratzer oder Abnutzung auf Armlänge sichtbar."
                                                                 : devicecondition === 1 ? "\u00A0Minimale Kratzer oder Gebrauchsspuren, die bei Armlänge sichtbar sein können."
                                                                     : devicecondition === 2 ? "\u00A0Gerät kann sichtbare Kratzer und Dellen aufweisen." : " "
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Display:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0 Keine Kratzer."
                                                                 : devicecondition === 1 ? "\u00A0 Feinste Mikrokratzer, bei eingeschaltetem Display nicht sichtbar."
                                                                     : devicecondition === 2 ? "\u00A0G Feine Mikrokratzer, nicht sichtbar, wenn das Display eingeschaltet ist." : " "
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            {/*--------------------------------------------*/}

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Batteriestatus:

                                                    <span className="font-normal">

                                                         {
                                                             devicecondition === 0 ?  "\u00A0  Mind. 90% der ursprünglichen Batterielebensdauer."
                                                                 : "\u00A0Mind. 85% der ursprünglichen Batterielebensdauer.\n"
                                                         }
                                                       </span>
                                                </Typography>

                                            </div>

                                            {/*--------------------------------------------*/}


                                            <div className="flex mt-2">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Lieferumfang:

                                                    <span className="font-normal">
                                                        Gerät und Ladekabel.
                                                       </span>
                                                </Typography>

                                            </div>

                                            <div className="flex">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Verpackung:

                                                    <span className="font-normal">
                                                        Originale Verpackung oder neutral umverpackt.
                                                       </span>
                                                </Typography>

                                            </div>

                                            {/*--------------------------------------------*/}

                                            <div className="flex mt-2">
                                                <Typography className="inline font-bold " variant="paragraph">
                                                    Hinweis:

                                                    <span className="font-normal">
                                                        Technische Herstellerdaten können im Einzelfall abweichen und
                                                           hängen von den durch unsere Verkäufer verwendeten (Original-)Ersatzteilen
                                                           im Refurbishing-Prozess ab. Es gelten die gesetzlichen Gewährleistungsrechte.
                                                       </span>
                                                </Typography>

                                            </div>

                                        </div>


                                    </div>

                                    <div className="block mt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="block w-2 h-2 bg-green-700"/>
                                                <Typography variant="small" className="text-green-600 font-semibold">Lieferung nach Hause</Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" className="text-black font-semibold">
                                                    + 0,– €
                                                </Typography>
                                            </div>

                                        </div>
                                        <Typography variant="small" className="text-slate-700 ">Lieferung 31.07.2025 - 02.08.2025</Typography>
                                    </div>
                                </div>

                            </div>




                            </div>

                            <div className=" mt-4 border-t border-gray-300"></div>

                            <div className="w-full h-auto bg-[#E6F3F0] p-4">

                                <Typography variant="paragraph">
                                    MyTemplate wählt für Dich das beste Angebot aus, indem Erscheinungsbild, Preis, technischer
                                    Zustand, Zubehör und Verkäuferbewertung berücksichtigt werden. Von MyTemplate
                                    angebotene Produkte können bei anderen Verkäufern zu einem günstigeren Preis erhältlich sein.
                                </Typography>

                                <Typography className="font-bold mt-4 cursor-pointer">
                                    Weitere neue und Refurbished-Produkte
                                </Typography>

                            </div>

                            <div className="flex m-5 gap-2 ">
                                <Button
                                    disabled={isTimeOutOn}

                                    //TODO maybe on backend ?
                                    onClick={()=>{

                                        setIsTimeOutOn(true);
                                        const item: CartItem = {
                                            productId: inFetched_item?._id ?? "",
                                            skuId: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].sku ?? "",
                                            title: inFetched_item?.title ?? "",
                                            imageUrl: inFetched_item?.options?.colors[IMAGE_INDEX].imagesURL.front ?? "",
                                            qty: 1,
                                            discounts: discountTypeObject(),
                                            attributes: {color:inFetched_item?.options?.colors[IMAGE_INDEX].name, ram: inFetched_item?.specs?.ram , storage: inFetched_item?.options?.colors[IMAGE_INDEX].variants[StorageSelected_INDEX].storage},// e.g., { color: "Space Black", storage: "128GB" }
                                            addedAt: new Date(),
                                            updatedAt: new Date()
                                        }

                                        //TODO aysnc function ??
                                        UpdateCart({item:item, Qty:undefined, directional:"+"}).then((r)=>{
                                            startTimeOut();
                                            if (r.success) {
                                                console.log("called now emit")
                                                //eventBus.emit();
                                            }
                                        })
                                    }
                                    }
                                    className="flex-[70%] bg-black hover:opacity-70 p-2 rounded-none">

                                    {isTimeOutOn ?
                                        (<div><span className="loading loading-dots loading-xl bg-white"></span></div>)
                                        :
                                        <div className="flex items-center justify-center gap-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 6h2l1.2 6h9.6l1.2-4H9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="10" cy="20" r="1.5" fill="#fff"/>
                                                <circle cx="18" cy="20" r="1.5" fill="#fff"/>
                                                <line x1="15" y1="3" x2="15" y2="9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                                <line x1="12" y1="6" x2="18" y2="6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>

                                            <div className="text-white">
                                                <Typography>
                                                    in den Warenkorb
                                                </Typography>
                                            </div>
                                        </div>
                                    }
                                </Button>

                                <Button className="bg-transparent  border-2 border-black  p-2 flex items-center justify-center hover:bg-slate-100 rounded-none">
                                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21s-6-4.35-9-8.36C.9 9.4 2.7 5.5 6.3 5.5c1.98 0 3.3 1.44 3.7 2.14.4-.7 1.72-2.14 3.7-2.14 3.6 0 5.4 3.9 3.3 7.14-3 4.01-9 8.36-9 8.36z"
                                              stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Button>

                            </div>


                        </div>


                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
