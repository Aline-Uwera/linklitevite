import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { CTASection } from '@/components/sections/CTASection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Index = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [url, setUrl] = useState('')

  const isValidUrl = (input: string) => {
    try {
      new URL(input)
      return true
    } catch {
      return false
    }
  }

  const handleShorten = async () => {
    if (!url) {
      toast('Please enter a URL')
      return
    }
    if (!isValidUrl(url)) {
      toast('Please enter a valid URL')
      return
    }
    if (!isAuthenticated) {
      toast('Please sign in to shorten URLs')
      navigate('/login')
      return
    }
    navigate('/shorten')
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <HeroSection url={url} setUrl={setUrl} handleShorten={handleShorten} />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default Index
