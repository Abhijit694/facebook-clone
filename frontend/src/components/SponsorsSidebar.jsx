import { Link } from "react-router-dom"


const sponsors = [
  {
    id: 1,
    title: 'Ad title 1',
    image: './tinyfish-ai-ad-picture.jpg',
    description: "Your Agent's Web Bill : $0",
    url: "agent.tinyfish.ai"
  },
  {
    id: 2,
    title: 'Ad title 2',
    image: './tuskcentral-ai-ad-picture.jpg',
    description: "Free AI that doesn't run out",
    url: "tuskcentral.ai"
  }
]

const SponsorsSidebar = () => {
  return (
    <aside className="w-75 mt-16 fixed right-0 top-0 p-4 hidden md:block">
      <div className="text-base font-medium mb-4 text-gray-600 dark:text-gray-300">Sponsored</div>
      <div className="space-y-4">
        {
          sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              to={sponsor.url}
              target="_blank"
              className="flex items-center space-x-4 hover:bg-gray-200 dark:hover:bg-[#242829] p-2 rounded-md transition"
            >
              <img src={sponsor.image} className="size-29 object-cover rounded-md" />
              <div className="flex flex-col">
                <span className="text-black text-base font-medium">{sponsor.description}</span>
                <span className="text-xs text-gray-500">{sponsor.url}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </aside>
  )
}

export default SponsorsSidebar