import { BarChart, Globe, LinkIcon } from "lucide-react"

export const FeaturesSection = () => {
  const features = [
    {
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      title: 'Custom Short Links',
      description: 'Create branded links with our easy-to-use link shortener.',
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: 'Detailed Analytics',
      description:
        'Track and measure link performance with our comprehensive analytics.',
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: 'Global Reach',
      description: 'Reliable link shortening for clicks around the world.',
    },
  ]
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Features for Your Links
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to track, manage and optimize your links.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}