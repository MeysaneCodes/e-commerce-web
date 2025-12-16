import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {getDB} from "@/lib/server/db/mongodb";
import {getSession} from "@/lib/server/session/session_manager";

export async function POST (req:Request){



    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [BADGE] [GET] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }
    const db = await getDB(process.env.MONGODB_DB);

    if(!db){
        console.error("[SERVER] [BADGE] [GET] DB is undefined");
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }

    if(!process.env.MONGODB_CART_COLLECTION) {
        console.error("[SERVER] [BADGE] [GET] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }

    //TODO create logic for shoppingcart for guest with limit of 30days
    const {success, status,message, user_session} = await getSession(req);


    if(!success)
        return NextResponse.json({success:false, message:message, status:status});



    try {


        const res = await db.collection(process.env.MONGODB_CART_COLLECTION).aggregate([{
            $match: {userId: user_session.id},
        },
            {
                $addFields: {
                    cart_added_items: {
                        $sum: {
                            $map: {
                                input: "$items",
                                as: "item",
                                in: "$$item.qty"
                            }
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    cart_added_items: 1,
                }
            },
        ]).toArray();


        //console.log("ddd" + res[0].cart_added_items);

        if(res)
            return NextResponse.json({success:true, status:HttpStatus.OK, data:res[0].cart_added_items});
        else
            return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.ERROR});



    }catch (e) {
        console.error("[SERVER] [CHECKOUT] [GET] " + server_messages_list.ERROR + " : " + e);
        return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.ERROR});
    }



}