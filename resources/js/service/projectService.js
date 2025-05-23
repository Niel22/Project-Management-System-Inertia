import { api } from "@/utils/axios";

export async function fetchProjectService(queryParams){
    const response = await api.get('api/project', {params: queryParams});
    const {data} = response;
    return data.data;
}

export async function fetchSingleProjectService(id){
    const response = await api.get(`api/project/${id}`);
    const {data} = response;
    return data.data;
}

export async function createProjectService(payload){
    const data = await api.post('api/project', payload);
    return data;
}

export async function deleteProjectService(id){
    const data = await api.delete(`api/project/${id}`);
    return data;
}

export async function updateProjectService(id, payload){
    const data = await api.put(`api/project/${id}`, payload);
    return data;
}

export async function fetchTaskByProjectService(id, queryParams){
    const response = await api.get(`api/project/${id}/tasks`, {params: queryParams});
        const {data} = response;
        return data.data;
}