import {CartItem} from "@/types/cart_types";
import {Dispatch, SetStateAction} from "react";


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


export async function GetNumberOfCartItems  ({setNumberCartItems}:{setNumberCartItems:Dispatch<SetStateAction<number>>})  {
    //if null then we have nothing. => Fetch from database
    //TODO on this page we just need to know how much we got on our shopping list ? to update the icon notification

    const response = await fetch(`/api/checkout/Cart_Item_Count`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok)
        throw new Error(`HTTP ${response.status}`);


    const payload:{success:boolean, data?:number} = await response.json();

    if(payload.success && payload.data) {
        //show the new data
        console.log("items nb" + payload.data);
        setNumberCartItems(payload.data ?? 0);
        try {

            //update the cache
            //  await localforage.setItem("cart_NB", payload.data ?? 0);
        }catch (e){
            throw new Error(`Error parsing local cart: ${e}`);
        }
    }
}
