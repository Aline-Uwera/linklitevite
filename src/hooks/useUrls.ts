import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const useUrls = () => {
  return useQuery({
    queryKey: ['urls'],
    queryFn: api.getUrls,
  })
}

export default useUrls
