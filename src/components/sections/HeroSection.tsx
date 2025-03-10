import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import {
  ChevronRight,
} from 'lucide-react'

interface HeroSectionProps {
  url: string;
  setUrl: (url: string) => void;
  handleShorten: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ url, setUrl, handleShorten}) => {
  const { isAuthenticated } = useAuth()
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent" />
      </div>
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            More than just <span className="text-primary">shorter links</span>
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Build your brand's recognition and get detailed insights on how your
            links are performing with our advanced URL shortening platform.
          </p>
          <div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                className="flex-grow"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleShorten} className="shrink-0">
                Shorten <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            {isAuthenticated ? (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
