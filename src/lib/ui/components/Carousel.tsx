import {Button, Carousel, Typography} from "@material-tailwind/react";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {CaretLeftIcon, CaretRightIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {carousel_variables_type} from "@/types/layout_types/carousel_type";
import {auto} from "@popperjs/core";



//Params
const carousel_general_settings = {
    carousel_width:1400,
    card_width: 453.33,
    card_height: 670,
    cards_per_slide: 3,
    gap_between_cards :8,
    button_width : 40
}
const carousel_variables : carousel_variables_type = {
    width: carousel_general_settings.carousel_width.toString() + "px",

    card_variables: {
        div_gap: carousel_general_settings.gap_between_cards.toString() + "px",
        width: carousel_general_settings.card_width.toString() + "px",
        height: carousel_general_settings.card_height.toString() + "px",
    },

    // {/*pos of the buttons : left : width of each card - gap and width of the buttons,   top is calculated by adding height + 10px as margin (choice) */}
    navigation_div_buttons : {
        top:  (carousel_general_settings.card_height + 10).toString() + "px",
        left: ((carousel_general_settings.card_width * carousel_general_settings.cards_per_slide) - carousel_general_settings.gap_between_cards - (carousel_general_settings.button_width )).toString() + "px"
    },
    navigation_dots : {
        bottom : "-30" + "px",
        left : "50" + "%",
    }
}

export default function Cards_Carousel() {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const images = ["/Images/Werbung/products/iphone17_ads.png","/Images/Werbung/products/ps5_ads.png","/Images/Werbung/products/airpods_xmax_ads.png"]





    return (
           <div className="relative w-full h-fit scrollbar-hide flex flex-col gap-8">
               <Carousel

                   nextArrow={(t)=>(<div></div>)}
                   prevArrow={(t)=>(<div></div>)}

                    style={{
                        width: carousel_general_settings.carousel_width,
                    }}
                   className={`relative h-full rounded-xl scrollbar-hide overflow-visible`}
                   navigation={({ setActiveIndex, activeIndex, length }) => (
                       <>
                           {/* DOTS (center bottom) */}
                           <div
                               style={{
                                    bottom: carousel_variables.navigation_dots.bottom,
                                    left: carousel_variables.navigation_dots.left
                               }}
                               className={`absolute  z-50 flex -translate-x-1/2 gap-2`}>
                               {Array.from({ length }).map((_, i) => (
                                   <span
                                       key={i}
                                       className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                                           activeIndex === i
                                               ? "w-8 bg-black"
                                               : "w-4 bg-gray-200/50"
                                       }`}
                                       onClick={() => {
                                           setActiveIndex(i);
                                           setActiveSlide(i);
                                       }}
                                   />
                               ))}
                           </div>

                           {/* ARROWS (bottom-right) */}


                           {/*pos of the buttons : left : width of each card - gap and width of the buttons,   top is calculated by adding height + 10px as margin (choice) */}
                           <div
                               style={{
                                   left: carousel_variables.navigation_div_buttons.left,
                                   top: carousel_variables.navigation_div_buttons.top
                               }}

                               // left-[1152px]
                               className="absolute z-50 flex gap-2 scrollbar-hide">
                               <button
                                   style={{
                                       width: carousel_general_settings.button_width
                                   }}
                                   className={'group flex h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50'} data-isButtonDisabled={activeIndex=== 0}
                                   disabled={activeIndex === 0}
                                   onClick={() => {
                                       setActiveIndex(activeIndex - 1);
                                       setActiveSlide(activeSlide - 1);
                                   }}
                                   // onClick={() => setActiveIndex(activeIndex - 1)}
                               >
                                   <CaretLeftIcon className={'h-6 w-6 text-white group-data-[isButtonDisabled=true]:text-black'} />
                               </button>

                               <button
                                   style={{
                                       width: carousel_general_settings.button_width
                                   }}
                                   className="group flex h-10  items-center justify-center rounded-xl bg-black shadow disabled:opacity-40 disabled:bg-gray-300/50" data-isButtonDisabled={activeIndex=== length- 1}
                                   disabled={activeIndex === length - 1}
                                   // onClick={() => setActiveIndex(activeIndex + 1)}

                                   onClick={() => {
                                       setActiveIndex(activeIndex + 1);
                                       setActiveSlide(activeSlide + 1);
                                   }}
                               >
                                   <CaretRightIcon className="h-6 w-6 text-white  group-data-[isButtonDisabled=true]:text-black"  />
                               </button>
                           </div>
                       </>
                   )}
               >
                   {/* ---------- SLIDE 1 ---------- */}
                       {/* cards unchanged */}
                       {/* ... your Card code exactly as-is */}


                    {/*TODO Do a map for auto generation*/}
                       <div className={`h-full inline-flex flex-row items-center justify-center gap-5  transition-all duration-150 ease-out ${activeSlide != 0 ? "opacity-0 translate-x-0 pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}`}>
                           <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ maxWidth: carousel_general_settings.card_width ,width: auto, height:carousel_general_settings.card_height}}>
                               <CardOverflow>
                                   <AspectRatio ratio="1" objectFit="cover">
                                       <img
                                           className="w-[400px] h-[400px]"
                                           src={images[0]}
                                           loading="lazy"
                                           alt=""
                                       />
                                   </AspectRatio>
                               </CardOverflow>
                               <CardContent sx={{ bgcolor: 'white' }}>
                                   <div className="font-bold">
                                       <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                       <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                       <Typography  className="mt-5 " variant="paragraph">
                                           Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                       </Typography>
                                   </div>

                               </CardContent>
                               <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                                   <CardContent className="flex justify-end" orientation="horizontal">
                                       <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                           <CaretRightIcon width={25} height={25}/>
                                           Zu den Deals</Button>
                                   </CardContent>
                               </CardOverflow>
                           </Card>
                           <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ width: carousel_general_settings.card_width, height:carousel_general_settings.card_height}}>
                               <CardOverflow>
                                   <AspectRatio ratio="1" objectFit="cover">
                                       <img
                                           className="w-[400px] h-[400px]"
                                           src={images[0]}
                                           loading="lazy"
                                           alt=""
                                       />
                                   </AspectRatio>
                               </CardOverflow>
                               <CardContent sx={{ bgcolor: 'white' }}>
                                   <div className="font-bold">
                                       <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                       <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                       <Typography  className="mt-5 " variant="paragraph">
                                           Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                       </Typography>
                                   </div>

                               </CardContent>
                               <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                                   <CardContent className="flex justify-end" orientation="horizontal">
                                       <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                           <CaretRightIcon width={25} height={25}/>
                                           Zu den Deals</Button>
                                   </CardContent>
                               </CardOverflow>
                           </Card>
                           <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ width: carousel_general_settings.card_width, height:carousel_general_settings.card_height}}>
                               <CardOverflow>
                                   <AspectRatio ratio="1" objectFit="cover">
                                       <img
                                           className="w-[400px] h-[400px]"
                                           src={images[0]}
                                           loading="lazy"
                                           alt=""
                                       />
                                   </AspectRatio>
                               </CardOverflow>
                               <CardContent sx={{ bgcolor: 'white' }}>
                                   <div className="font-bold">
                                       <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                       <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                       <Typography  className="mt-5 " variant="paragraph">
                                           Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                       </Typography>
                                   </div>

                               </CardContent>
                               <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                                   <CardContent className="flex justify-end" orientation="horizontal">
                                       <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                           <CaretRightIcon width={25} height={25}/>
                                           Zu den Deals</Button>
                                   </CardContent>
                               </CardOverflow>
                           </Card>
                       </div>


                   {/* ---------- SLIDE 2 ---------- */}
                   <div className={`h-full inline-flex flex-row items-center justify-center gap-5 transition-all duration-150 ease-out ${activeSlide != 1 ? "opacity-0 translate-x-0 pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}`}>
                       <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ width: carousel_general_settings.card_width, height:carousel_general_settings.card_height}}>
                           <CardOverflow>
                               <AspectRatio ratio="1" objectFit="cover">
                                   <img
                                       className="w-[400px] h-[400px]"
                                       src={images[0]}
                                       loading="lazy"
                                       alt=""
                                   />
                               </AspectRatio>
                           </CardOverflow>
                           <CardContent sx={{ bgcolor: 'white' }}>
                               <div className="font-bold">
                                   <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                   <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                   <Typography  className="mt-5 " variant="paragraph">
                                       Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                   </Typography>
                               </div>

                           </CardContent>
                           <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                               <CardContent className="flex justify-end" orientation="horizontal">
                                   <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                       <CaretRightIcon width={25} height={25}/>
                                       Zu den Deals</Button>
                               </CardContent>
                           </CardOverflow>
                       </Card>
                       <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ width: carousel_general_settings.card_width, height:carousel_general_settings.card_height}}>
                           <CardOverflow>
                               <AspectRatio ratio="1" objectFit="cover">
                                   <img
                                       className="w-[400px] h-[400px]"
                                       src={images[0]}
                                       loading="lazy"
                                       alt=""
                                   />
                               </AspectRatio>
                           </CardOverflow>
                           <CardContent sx={{ bgcolor: 'white' }}>
                               <div className="font-bold">
                                   <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                   <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                   <Typography  className="mt-5 " variant="paragraph">
                                       Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                   </Typography>
                               </div>

                           </CardContent>
                           <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                               <CardContent className="flex justify-end" orientation="horizontal">
                                   <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                       <CaretRightIcon width={25} height={25}/>
                                       Zu den Deals</Button>
                               </CardContent>
                           </CardOverflow>
                       </Card>
                       <Card className="z-0 transition-transform hover:z-10 hover:scale-105 duration-300 ease-out" variant="outlined" sx={{ width: carousel_general_settings.card_width, height:carousel_general_settings.card_height}}>
                           <CardOverflow>
                               <AspectRatio ratio="1" objectFit="cover">
                                   <img
                                       className="w-[400px] h-[400px]"
                                       src={images[0]}
                                       loading="lazy"
                                       alt=""
                                   />
                               </AspectRatio>
                           </CardOverflow>
                           <CardContent sx={{ bgcolor: 'white' }}>
                               <div className="font-bold">
                                   <Typography variant="h6" className="font-bold">Nur bis 02.14</Typography>
                                   <Typography variant="h4"  className="font-bold">Freude für Fest</Typography>
                                   <Typography  className="mt-5 " variant="paragraph">
                                       Schnapp dir unsere Fast Christmas-Deals und profitiere von schnlellen Angeboten zu genialen Preisen
                                   </Typography>
                               </div>

                           </CardContent>
                           <CardOverflow variant="soft" sx={{ bgcolor: 'white' }}>
                               <CardContent className="flex justify-end" orientation="horizontal">
                                   <Button className="flex justify-center items-center bg-white border border-2 border-black text-black">
                                       <CaretRightIcon width={25} height={25}/>
                                       Zu den Deals</Button>
                               </CardContent>
                           </CardOverflow>
                       </Card>
                   </div>


               </Carousel>
           </div>
    );
}
