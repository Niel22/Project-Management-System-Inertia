import { fetchTaskService } from "@/service/taskService";
import { useQuery } from "@tanstack/react-query";

export const useFetchTasks = (queryParams) => {
    return useQuery({
        queryKey: ['tasks', queryParams],
        queryFn: () => fetchTaskService(queryParams),
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}