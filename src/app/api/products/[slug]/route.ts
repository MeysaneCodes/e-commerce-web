//this file for single Product

import {getDB} from "@/lib/server/db/mongodb";
import {Db} from "mongodb";
import {NextResponse} from "next/server";

export async function POST (req:Request, {params}:{params: Promise<{slug:string}>}){

    const {CName} = await req.json();

    //TODO maybe later ?
    //const qColor = typeof req.query.color === 'string' ? req.query.color.toLowerCase() : undefined;
    const {slug} = await params;

    const filter = {slug:slug};

    if(!process.env.MONGODB_DB)return;
    try{
        const Fetched_Item = await getDB(process.env.MONGODB_DB) as Db;

        if (!Fetched_Item) return;

        const singleProduct = await Fetched_Item.collection(CName).findOne(filter);
        if (singleProduct)
            console.log("item retrieved");

        return NextResponse.json({item: singleProduct});

    }catch (e){
        console.error(e);
    }
}


