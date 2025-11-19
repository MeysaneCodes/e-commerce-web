import {CartItem} from "@/types/cart_types";

export async function UpdateCart  ({item, Qty, directional}:{item:CartItem, Qty: number | undefined, directional: "+" | "-"}) {
    //if null then we have nothing. => Fetch from database
    //TODO on this page we just need to know how much we got on our shopping list ? to update the icon notification

    console.log("calling");

    //TODO CREATE CSRF LOGIC
    console.log("Csrf request");
    // const Token = await getToken();
    const Token = "await getToken()";
    console.log("TOKEB" + Token);

    try {
        const response = await fetch(`/api/checkout/update`, {
            method: "POST",

            headers: {
                'X-CSRF-Token': Token,
                "Content-Type": "application/json",
            },
            credentials: "include",


            body: JSON.stringify({data : item, Qty: Qty, directional: directional}),

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
