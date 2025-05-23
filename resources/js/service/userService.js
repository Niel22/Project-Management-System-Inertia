import { api } from "@/utils/axios";

export async function fetchUserService(){
    const response = await api.get('api/user');
    const {data} = response;
    return data.data;
}