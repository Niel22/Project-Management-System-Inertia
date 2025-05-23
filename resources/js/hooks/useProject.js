import { fetchProjectService, fetchSingleProjectService, fetchTaskByProjectService } from "@/service/projectService"
import { useQuery } from "@tanstack/react-query"

export const useFetchProject = (queryParams = null) => {
    return useQuery({
        queryKey: ['projects', queryParams],
        queryFn: () => fetchProjectService(queryParams),
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}

export const useFetchSingleProject = (id) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: () => fetchSingleProjectService(id),
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}

export const useFetchTaskByProject = (projectId, queryParams) => {
    return useQuery({
        queryKey: ['projects', projectId, queryParams],
        queryFn: () => fetchTaskByProjectService(projectId, queryParams),
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}