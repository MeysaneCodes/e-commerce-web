"use client"


import {Card,Typography} from "@material-tailwind/react";
import {useRouter} from "next/navigation";






type Props = {
    sectionTitle: string;
    top_deals_Category_List?: Array<{image:any;title:string}>;
}



export default function CategoriesCard_NavList_Layout({sectionTitle,top_deals_Category_List}: Props) {

    const router = useRouter();
    //Default Value
    const top_deals_Category = top_deals_Category_List ?? new Array(4).fill({
        image: <div className="w-200 h-200"></div>,
        title: ""
    });

    const title = sectionTitle ?? "";


    const category_layout_variables = {

        gap_between_card: 6.6,
        card: {
            div_width :  227.8,
            div_height : 227.8,
        }
    }

    return (
        <div className="w-max-[1400px] flex flex-col gap-5 mb-10 mt-14 ">

            {/*Title of this Section*/}
                <Typography  variant={"h4"} className=" font-bold  text-black">{title}</Typography>

            {/*List of the Items*/}

                <div className="flex flex-row gap-[6.6px]">

                    {top_deals_Category.map((item,index) => {
                        return (

                            <div
                                key={index}
                                className="w-[227.8px] h-[227.8px]">
                                <Card
                                    className="w-full h-full flex flex-col items-center justify-center   hover:z-20  hover:shadow-xl shadow-none  hover:border-2  hover:border-gray-200  transition-transform ease-linear duration-300  "
                                    onClick={() => router.push("/")}
                                >
                                    <div>
                                        <img
                                            src={item.image}
                                            className=" h-[150px] object-cover w-auto block aspect-auto p-2 rounded-3xl  "
                                            alt={"Phone Image"}/>
                                    </div>

                                    <Typography  variant="h6" className="block  text-center font-bold p-2 text-black">{item.title}</Typography>
                                </Card>

                            </div>
                        )
                    })}
                </div>

        </div>
    )
}