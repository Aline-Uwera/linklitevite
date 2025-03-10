import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Copy,
  ExternalLink,
  Loader,
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'

const Analytics: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['url-analytics', shortCode],
    queryFn: () =>
      shortCode
        ? api.getUrlAnalytics(shortCode)
        : Promise.reject('No short code provided'),
    enabled: !!shortCode,
  })

  const handleCopy = () => {
    if (shortCode) {
      navigator.clipboard.writeText(api.getFullShortUrl(shortCode))
      toast.success('URL copied to clipboard')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16">
        <div className="container px-4 sm:px-6 animate-fade-in">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                URL Analytics
              </h1>
              <p className="text-muted-foreground">
                Detailed statistics for your shortened URL
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline">
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-destructive mb-4">
                  Failed to load analytics data
                </p>
                <Button asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ) : data ? (
            <>
              <Card className="mb-8">
                <CardHeader className="bg-muted/30">
                  <CardTitle>URL Information</CardTitle>
                  <CardDescription>
                    Details about your shortened URL
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Short URL
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">
                          {api.getFullShortUrl(shortCode || '')}
                        </p>
                        <Button variant="ghost" size="sm" onClick={handleCopy}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Original URL
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="truncate">{data.long_url}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(data.long_url, '_blank')
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Created On
                      </h3>
                      <p>{formatDate(data.created_at)}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Total Clicks
                      </h3>
                      <p className="text-2xl font-bold">{data.clicks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Analytics
