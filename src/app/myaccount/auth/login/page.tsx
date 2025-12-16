"use client"

import React, {useEffect, useState} from 'react';
import {Typography,Button} from "@material-tailwind/react";
//import{getToken} from "../methods/get_csrf.js"
import router, {useRouter} from "next/navigation";
//import{get_isUserLoggedIn} from "../methods/isLoggedIn.tsx"
import {CaretDownIcon} from "@radix-ui/react-icons"
import {TextField} from "@mui/material"
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {validate_email, validate_password} from "@/utils/sign_up_validation";
import {Errors_list} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";







async function post_login(
    inEmail: string,
    inPassword: string,
    setEmailHelperText:React.Dispatch<React.SetStateAction<string>>,
    setPasswordHelperText:React.Dispatch<React.SetStateAction<string>>):Promise<{success:boolean, message:string} | undefined> {

    const {success, message}  = validate_email(inEmail);


    //Email & Password Check

    //Email template check
    if(!success){
        if(message === Errors_list.emailNotValid){
            setEmailHelperText(Errors_list.emailNotValid);
            return {success:false, message:message};
        }
    }

    //TODO REDUNDANT ?
   /* const {password_check_success, password_check_message} = validate_password(inPassword);
    if(!password_check_success){
        if(password_check_message.length > 0){
            setPasswordHelperText(password_check_message);
            return;
        }
    }*/


    try{
        const response =  await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                email: inEmail,
                password: inPassword,
            })
        });

        const {success, message, status} = await response.json();




        //error handling
        if(!success){
            if (message === Errors_list.EMAIL_PASSWORD_NOT_VALID){
                setPasswordHelperText(Errors_list.EMAIL_PASSWORD_NOT_VALID);
            }

            if (message === Errors_list.emailNotValid){
                setEmailHelperText(Errors_list.emailNotValid)
            }

            //404 error landing
            if (status && status === HttpStatus.INTERNAL_SERVER_ERROR)
                return undefined;

            return {success:false, message:message};
        }





        //return await response.json();


    }catch (error) {
        console.log("[CLIENT] [LOGIN] Error occurred when Fetching : " + error);
        return undefined;
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [emailHelperText, setEmailHelperText] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwrodHelperText, setPasswrodHelperText] = useState<string>("")
    const [state_isLogged, setIsLogged] = useState(false);
    const navigate = useRouter();


    const handleSubmit = (email:string,password:string) => {
       // console.log("handleSubmit", e);


        post_login(email, password, setEmailHelperText, setPasswrodHelperText).then((result)=> {


            if(result && result.success)
                navigate.push("/");

            else if(!result)
                navigate.push("/not-found");

            else return;


        }).catch((error)=> console.error("[CLIENT] [LOGIN] : " +  error));
    };


    if(state_isLogged){
        //TODO Loading page
        return(<span></span>)
    }else {
        return (

            <div className="relative w-full h-screen flex flex-col items-center justify-center scrollbar-hide">
                <p
                    onClick={()=>navigate.push("/")}
                    className="flex absolute p-5 left-10 top-5 underline text-black justify-center items-center select-none cursor-pointer">

                    <CaretDownIcon className="flex rotate-90 size-5"/>
                    Züruck
                </p>



                <div className={`w-[450px] rounded shadow-xl p-5 border-2 ${emailHelperText.length > 0 || passwrodHelperText.length > 0 ? "border-red-200" : "border-gray-400" } border-opacity-50`}>
                    <div className="mb-6 text-black">
                        <Typography variant="h4" className="font-bold">
                            Ich bin bereits Kunde
                        </Typography>
                        <Typography>
                            Logge dich jetzt ein, um alle Vorteile des myTemplate Kundenkontos wahrzunehmen.
                        </Typography>
                    </div>


                    <div className="bg-white rounded  pt-6 pb-8 w-full max-w-md">
                        <div className="w-full mb-5">
                            <TextField className="w-full mb-5" color="black" label="E-mail Addresse" variant="outlined" type="email" error={emailHelperText.length > 0} helperText={emailHelperText}
                                       onChange={(e)=>{
                                           setEmail(e.target.value)
                                           setEmailHelperText("");
                                       }}/>
                        </div>

                        <div className="w-full">
                            <TextField className="w-full" color="black" label="Passwort" variant="outlined" type="password" error={passwrodHelperText.length > 0} helperText={passwrodHelperText}
                                       onChange={(e)=>{
                                           setPassword(e.target.value)
                                           setPasswrodHelperText("");
                                       }}/>
                        </div>

                        <Button
                            onClick={()=>handleSubmit(email,password)}
                            className="w-full mt-3" color="red">
                            Einloggen
                        </Button>


                        <div className="mt-10 text-center">
                            <p className="text-gray-600">Du hast noch kein Online-Konto?</p>
                            <button
                                onClick={()=>navigate.push("/myaccount/auth/signup")}
                                type="button"
                                className="w-full flex  bg-white border-black border-2 hover:opacity-75 items-center justify-center text-black font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                <CaretDownIcon className="flex rotate-[270deg] size-5"/>
                                Jetzt regestrieren
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }

}
