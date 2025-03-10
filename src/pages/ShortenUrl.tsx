import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useShortenUrl } from '@/hooks/useShortenUrl'
import ShortenForm from '@/components/sections/ShortenForm'
import ShortenedResult from '@/components/sections/ShortenedResult'

const ShortenUrl = () => {
  const {
    longUrl,
    setLongUrl,
    shortenedUrl,
    copied,
    handleSubmit,
    handleCopy,
    shortenMutation,
  } = useShortenUrl()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16">
        <div className="container px-4 sm:px-6 max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Create a Short Link
            </h1>
            <p className="text-muted-foreground">
              Transform your long URLs into short, memorable links
            </p>
          </div>

          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle>URL Shortener</CardTitle>
              <CardDescription>
                Enter your long URL to generate a shortened version
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ShortenForm
                longUrl={longUrl}
                setLongUrl={setLongUrl}
                handleSubmit={handleSubmit}
                isLoading={shortenMutation.isPending}
              />
              <ShortenedResult
                shortenedUrl={shortenedUrl}
                copied={copied}
                handleCopy={handleCopy}
              />
            </CardContent>
            <CardFooter className="bg-muted/30 px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Note: All shortened URLs are public. Do not share sensitive
                information.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ShortenUrl
