import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import useUrls from '@/hooks/useUrls'
import StatsCard from '@/components/sections/StatsCard'
import { formatDate } from '@/utils/formatDate'
import UrlTable from '@/components/sections/UrlTable'

const Dashboard = () => {
  const { data: urls, isLoading, isError, refetch } = useUrls()
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 items-center justify-center flex flex-col">
        <div className="container px-4 sm:px-6 animate-fade-in">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground mb-6">
              Manage and track all your shortened URLs
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/shorten">Create New Short URL</Link>
              </Button>
              <Button variant="outline" onClick={() => refetch()}>
                Refresh Data
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Links"
              value={urls?.length || 0}
              isLoading={isLoading}
            />
            <StatsCard
              title="Total Clicks"
              value={urls?.reduce((sum, url) => sum + url.clicks, 0) || 0}
              isLoading={isLoading}
            />
            <StatsCard
              title="Average Clicks"
              value={
                urls?.length
                  ? Math.round(
                      urls.reduce((sum, url) => sum + url.clicks, 0) /
                        urls.length
                    )
                  : 0
              }
              isLoading={isLoading}
            />
            <StatsCard
              title="Last Created"
              value={
                urls?.length
                  ? formatDate(
                      urls.sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )[0].created_at
                    )
                  : 'No URLs yet'
              }
              isLoading={isLoading}
            />
          </div>
          <UrlTable
            urls={urls || []}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
