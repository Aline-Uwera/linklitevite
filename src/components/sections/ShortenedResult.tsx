import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface ShortenedResultProps {
  shortenedUrl: string | null;
  copied: boolean;
  handleCopy: () => void;
}

const ShortenedResult: React.FC<ShortenedResultProps> = ({ shortenedUrl, copied, handleCopy }) =>
  shortenedUrl && (
    <div className="mt-8 border rounded-lg p-4 animate-fade-in">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        Your shortened URL:
      </h3>
      <div className="flex items-center space-x-2">
        <div className="flex-grow bg-muted/30 p-3 rounded-md font-medium text-primary">
          {shortenedUrl}
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        This link will redirect to your original URL when visited.
      </p>
    </div>
  )

export default ShortenedResult
