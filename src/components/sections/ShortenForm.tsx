import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Link as LinkIcon, Loader } from 'lucide-react'

interface ShortenFormProps {
  longUrl: string;
  setLongUrl: (url: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ longUrl, setLongUrl, handleSubmit, isLoading }) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="longUrl">Enter your long URL</Label>
      <div className="flex items-center space-x-2">
        <LinkIcon className="w-5 h-5 text-muted-foreground" />
        <Input
          id="longUrl"
          type="url"
          placeholder="https://example.com/your-long-url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-grow"
        />
      </div>
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        'Shorten URL'
      )}
    </Button>
  </form>
)

export default ShortenForm
