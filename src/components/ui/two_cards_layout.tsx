"use client"

import { Card, Typography, Button } from "@material-tailwind/react"

const card_images = [
    {image: "/Images/Werbung/cards_image/gift_card_ads.png", title: "Angebote" },
    {image: "/icons/ads/super_spare_sale_ads.png", title: "Super Spar Sale" },
];

export default function Two_cards(){
    return(
        <div className="w-full max-w-[1400px] flex flex-row gap-3 mt-14">
           <div className="w-[694px] h-[250px] flex ">
               <Card className="w-full h-full flex shadow-lg rounded-2xl overflow-hidden">
                   <div className="w-full h-full">
                        <img className="w-full h-full object-cover" src={card_images[0].image}/>
                   </div>

                   <div className="absolute top-[25%] left-[5%]">
                       <Typography variant={"h4"}>
                           Guthabenkarten &
                       </Typography>

                       <Typography variant={"h4"}>
                           Gift Cards
                       </Typography>
                       <Typography variant={"small"}>
                           Jetzt Streaming-, Shopping-, Freizeit-
                       </Typography>
                       <Typography variant={"small"}>
                           und Gaming-Guthabenjarten sichern
                       </Typography>

                       <Button className="mt-5">Jetzt Entdecken</Button>
                   </div>
               </Card>
           </div>
            <div className="w-[694px] h-[250px] flex ">
                <Card className="w-full h-full flex shadow-lg rounded-2xl overflow-hidden">
                    <div className="w-full h-full">
                        <img className="w-full h-full object-cover" src={card_images[0].image}/>
                    </div>

                    <div className="absolute top-[25%] left-[5%]">
                        <Typography variant={"h4"}>
                            Guthabenkarten &
                        </Typography>

                        <Typography variant={"h4"}>
                            Gift Cards
                        </Typography>
                        <Typography variant={"small"}>
                            Jetzt Streaming-, Shopping-, Freizeit-
                        </Typography>
                        <Typography variant={"small"}>
                            und Gaming-Guthabenjarten sichern
                        </Typography>

                        <Button className="mt-5">Jetzt Entdecken</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}