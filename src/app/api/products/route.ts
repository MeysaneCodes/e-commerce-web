import {getDB} from "@/lib/server/db/mongodb"
import {Db} from "mongodb";
import {NextResponse} from "next/server";


export async function POST (req: Request){

    const {CName} = await req.json();

    console.log('GET products came  ' +  CName);
    const db = await  getDB(process.env.MONGODB_DB) as Db;


    const Fetched_Items = await db.collection(CName).find({}, {projection: {options:1,thumbnail:1,title:1, slug:1,_id:0}}).toArray();


    return NextResponse.json({item: Fetched_Items})

  /*  console.log(JSON.stringify({
        message: "Backend mongodb:",
        collections: await db.listCollections().toArray()
    }, null, 2));*/
}