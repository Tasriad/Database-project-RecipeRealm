"use client"
import { toast } from "react-toastify";

export default function Test() {

    const handeclick = (e) => {
        toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    };
    return (<button onClick={handeclick}> Click Me</button>)

}