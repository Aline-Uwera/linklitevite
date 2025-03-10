import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string;
  value: string | number;
  isLoading: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, isLoading }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-3xl font-bold">
            {isLoading ? (
              <span className="animate-pulse-light">...</span>
            ) : (
              value
            )}
          </h2>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard
