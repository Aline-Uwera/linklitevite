import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export const CTASection = () => (
  <section className="py-16 md:py-20 bg-primary/5">
    <div className="container px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Boost your links today
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get started with LinkLite and take control of your links. Sign up for
          free and start shortening your URLs in seconds.
        </p>
        <Button asChild size="lg">
          <Link to="/register">Sign Up For Free</Link>
        </Button>
      </div>
    </div>
  </section>
)
