import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'


function useAuthUser() {
    const authuser= useQuery({
      queryKey:["authUser"],
      queryFn:getAuthUser,
      retry:false
    })

     return { isLoading: authuser.isLoading, authUser: authuser.data }  
}

export default useAuthUser