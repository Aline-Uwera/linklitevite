import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from 'sonner'

export const useShortenUrl = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const shortenMutation = useMutation({
    mutationFn: api.shortenUrl,
    onSuccess: (data) => {
      setShortenedUrl(api.getFullShortUrl(data.short_code))
      toast.success('URL shortened successfully!')
    },
    onError: () => {
      toast.error('Failed to shorten URL')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!longUrl) return toast.error('Please enter a URL')
    try {
      new URL(longUrl)
      shortenMutation.mutate(longUrl)
    } catch {
      toast.error('Please enter a valid URL')
    }
  }

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl)
      setCopied(true)
      toast.success('URL copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return {
    longUrl,
    setLongUrl,
    shortenedUrl,
    copied,
    handleSubmit,
    handleCopy,
    shortenMutation,
  }
}
