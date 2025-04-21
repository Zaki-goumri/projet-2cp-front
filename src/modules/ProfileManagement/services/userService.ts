import axios from '@/api/axios.config'
import { User } from '@/modules/shared/store/userStore'

export async function getUserById(id:string):Promise<User>{
    const res=await axios.get<User>(`/Auth/user/${id}/`)
     if (res.status==200) {
        return res.data;
     }
     if (res.status==404){
        throw Promise.reject('user Not Found');
     }
     if (res.status==401){
        throw Promise.reject('Unauthorized');
     }
     throw Promise.reject('Unkown Error');
    }
