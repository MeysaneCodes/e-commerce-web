"use client"


import {Card} from "@material-tailwind/react";
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

    return (
        <div className="mt-10 ">

            {/*Title of this Section*/}
            <div>
                <p className="p-5 font-bold text-2xl text-black">{title}</p>
            </div>



            {/*List of the Items*/}
            <div>

                <div className="grid grid-flow-col grid-rows-1 gap-4  justify-center m-4">

                    {top_deals_Category.map((item,index) => {
                        return (

                            <div
                                key={index}
                                className="w-[200px] h-[200px] p-4 ">
                                <Card
                                    className="z-20"
                                    onClick={() => router.push("/")}
                                >
                                    <img
                                        src={item.image}
                                        className="object-fill block aspect-auto p-2 rounded-3xl  "
                                        alt={"Phone Image"}/>

                                </Card>
                                <p className="block bottom-1 text-center p-2 text-black">{item.title}</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}