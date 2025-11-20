import {CartItem} from "@/types/cart_types";

export async function POST  (req:Request) {
    //if null then we have nothing. => Fetch from database
    //TODO on this page we just need to know how much we got on our shopping list ? to update the icon notification

    console.log("calling");

    const {data, Qty, directional} = await req.json();

    const PORT = 2500;

    //TODO CREATE CSRF LOGIC
    console.log("Csrf request");
    // const Token = await getToken();
    const Token = "await getToken()";

    console.log("TOKEB" + Token);

    try {
        const response = await fetch(`http://localhost:${PORT}/api/checkout/update`, {
            method: "POST",

            headers: {
                'X-CSRF-Token': Token,
                "Content-Type": "application/json",
            },
            credentials: "include",


            body: JSON.stringify({data : data, Qty: Qty, directional: directional}),

        });

        console.log("before return")
        return response.json();

    }catch (e){
        // if(!response.ok)
        console.error("Error occurred" + e);
        // throw new Error(`HTTP ${e.status} - ${e.statusText}`);
        // throw new Error(e.data);

    }






}
