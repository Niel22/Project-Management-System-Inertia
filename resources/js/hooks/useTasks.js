import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useFetchTasks = (queryParams) => {
    return useQuery({
        queryKey: ['tasks', queryParams],
        queryFn: async () => {
            const response = await axios.get('/all-tasks', {params: queryParams});
            const {data} = response;
            return data.data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}