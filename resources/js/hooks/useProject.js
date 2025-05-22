import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchProject = (queryParams) => {
    return useQuery({
        queryKey: ['projects', queryParams],
        queryFn: async () => {
            const response = await axios.get('/all-projects', {params: queryParams});
            const {data} = response;
            return data.data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}

export const useFetchSingleProject = (id) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const response = await axios.get(`/single-project/${id}`);
            const {data} = response;
            return data.data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}

export const useFetchTaskByProject = (projectId, queryParams) => {
    return useQuery({
        queryKey: ['projects', projectId],
        queryFn: async () => {
            const response = await axios.get(`/single-project/${projectId}/tasks`, {params: queryParams});
            const {data} = response;
            return data.data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}