import { useState } from "react"

const FormData=()=>{
    interface signInData{
        email:string;
        password:string
    }
    const [formData,setFormData]=useState<signInData>({
        email:"",
        password:"",
    })
    return(
        <>
        </>
    )
}
export default FormData