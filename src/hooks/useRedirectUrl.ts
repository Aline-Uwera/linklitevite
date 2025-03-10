import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const useRedirectUrls = (shortUrl: string) => {
  return useQuery({
    queryKey: ['redirect', shortUrl],
    queryFn: () => api.redirectToLongUrl(shortUrl),
    enabled: !!shortUrl,
  })
}

export default useRedirectUrls
