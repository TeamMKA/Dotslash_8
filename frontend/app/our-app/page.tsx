import { AppleCardsCarouselDemo } from "@/components/CarouselComp"
import { Button } from "@/components/ui/button"
import { AppleIcon, ArrowRight, CheckCircle, PlayIcon } from "lucide-react"

export default function ExploreFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Explore Amazing Features</h1>
          <p className="text-xl text-gray-600 mb-8">
            Download our app to access exclusive features and enhance your experience
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              {/* <Image src="/app-store.svg" alt="App Store" width={24} height={24} className="mr-2" /> */}
              <AppleIcon width={24} height={24} />
              App Store
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
{/*               <Image src="/google-play.svg" alt="Google Play" width={24} height={24} className="mr-2" /> */}
                <PlayIcon width={24} height={24} />
              Google Play
            </Button>
          </div>
        </div>

        <AppleCardsCarouselDemo   />

        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* <div className="md:w-1/2 mb-8 md:mb-0">
            <Image src="/app-mockup.png" alt="App Mockup" width={400} height={800} className="mx-auto" />
          </div> */}
          <div className="md:w-1/2 w-full mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why You&apos;ll Love Our App</h2>
            <ul className="space-y-4">
              {[
                "Access exclusive features",
                "Seamless user experience",
                "Regular updates and improvements",
                "24/7 customer support",
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-yellow-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 bg-yellow-500 text-white hover:bg-yellow-600">
              Learn More <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

