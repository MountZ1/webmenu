import { useState } from "react";
import Connection from "./api";
import axios, { Axios } from "axios";
import { create } from "ionicons/icons";

const baseUrl = 'http://10.0.0.127:8000';

function useGlobalFetching(url: string){
    const [hook, setHook] = useState<any>(null);
    
    const fetch = async () => {
        // await fetchEventSource(`http://10.0.0.127:8000/${url}`, {
        //         headers: {
        //             'allowed_origins': '*',
        //             'allowed_headers': '*',
        //         },
        //         onmessage(ev) {
        //             // console.log(JSON.parse(ev.data));
        //             const data = JSON.parse(ev.data);
        //             console.log(data);
        //             setHook(data);
        //         },
        //         onerror(error) {
        //             console.error('EventSource error:', error);
        //         },
        // })

        // console.log(url);
        try{
            const response = await Connection.get(url);
            // console.log(response.data);
            // setHook(response.data);
            const data = await response.data;
            setHook(data);
            // const response = new EventSource(`http://10.0.0.127:8000/${url}`);
            // response.onmessage = (event) => {
            //     console.log(event.data);
            //     const data = JSON.parse(event.data);
            //     setHook(data);
            //     // setHook(JSON.stringify(event.data));
            // }
            // response.onerror = (error) => {
            //     console.error('EventSource error:', error);
            // };

            // sse
            
        } catch(error) {
            throw error;
        }
        
    }
    // console.log(`errornya:${printerr}`);s
    return {hook, fetch};
}

function useGlobalStore(){
    const [err, setErr] = useState<any>(null);
    const postData = async (url: string, data: any) => {
        try{
            await Connection.post(url, data);
        } catch(error) {
            setErr(error);
        }
    }
    return {err, postData};
}

function useGlobalDelete(){
    const [err, setErr] = useState<any>(null);

    const deleteData = async (url: string) => {
        try{
            await Connection.post(url, {_method:'delete'});
        } catch(error) {
            setErr(error);
        }
    }
    return {err, deleteData};
}

function useGLobalUpdate(){
    const [err, setErr] = useState<any>(null);

    const updateData = async (url: string, data: any) => {
        try{
            await Connection.patch(url, data); //the data wasn't recognized
        } catch(error){
            setErr(error);
        }
    }

    return {err, updateData};
}

export {useGlobalFetching, useGlobalStore, useGlobalDelete, useGLobalUpdate};