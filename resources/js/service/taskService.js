import { api } from "@/utils/axios";

export async function fetchTaskService(queryParams){
    const response = await api.get('api/task', {params: queryParams});
    const {data} = response;
    return data.data;
}

export async function createTaskService(payload){
    const data = await api.post('api/task', payload);
    return data;
}
