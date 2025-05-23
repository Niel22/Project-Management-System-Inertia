import { fetchUserService } from "@/service/userService"
import { useQuery } from "@tanstack/react-query"

export const useFetchUsers = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => fetchUserService(),
        enabled: true,
        staleTime: 5 * 60 * 1000
    })
}