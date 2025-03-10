import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, BarChart, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const handleCopy = (shortUrl:string) => {
  navigator.clipboard.writeText(shortUrl)
  toast.success('URL copied to clipboard')
}

interface UrlTableProps {
  urls: Array<{ id: string; short_code: string; long_url: string; clicks: number; created_at: string }>;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const UrlTable: React.FC<UrlTableProps> = ({ urls, isLoading, isError, refetch }) => {
  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>
  }
  if (isError) {
    return (
      <div className="text-center p-6">
        <p className="text-destructive">Failed to load URLs</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }
  if (urls.length === 0) {
    return (
      <div className="text-center p-6">
        <p>No URLs yet</p>
        <Button asChild>
          <Link to="/shorten">Create URL</Link>
        </Button>
      </div>
    )
  }
    return (
                <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle>Your Shortened URLs</CardTitle>
              <CardDescription>
                View, manage and analyze all your shortened links
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : isError ? (
                <div className="p-6 text-center">
                  <p className="text-destructive mb-4">
                    Failed to load your URLs
                  </p>
                  <Button onClick={() => refetch()}>Try Again</Button>
                </div>
              ) : urls?.length === 0 ? (
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No URLs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first shortened URL to see it here
                  </p>
                  <Button asChild>
                    <Link to="/shorten">Create URL</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                          Short URL
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                          Original URL
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                          Clicks
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                          Created
                        </th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {urls?.map((url) => (
                        <tr
                          key={url.id}
                          className="border-b hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {url.short_code}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className="max-w-xs truncate"
                              title={url.long_url}
                            >
                              {url.long_url}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {url.clicks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(url.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleCopy(
                                    api.getFullShortUrl(url.short_code)
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  window.open(url.long_url, '_blank')
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/analytics/${url.short_code}`}>
                                  <BarChart className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
  )
}

export default UrlTable
