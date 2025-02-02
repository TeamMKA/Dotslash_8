import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Gift, Search, Shield, UserCheck } from "lucide-react"
import Link from "next/link"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-600 mb-8">
          Rewards for Finding Missing Persons
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Your help can make a difference. We offer rewards for verified information that leads to reuniting missing
          individuals with their loved ones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Search className="h-10 w-10 text-yellow-500" />,
              title: "Search",
              description: "Look for missing persons in your area",
            },
            {
              icon: <Shield className="h-10 w-10 text-yellow-500" />,
              title: "Verify",
              description: "Ensure your information is accurate and current",
            },
            {
              icon: <UserCheck className="h-10 w-10 text-yellow-500" />,
              title: "Report",
              description: "Submit your findings through our secure system",
            },
            {
              icon: <Gift className="h-10 w-10 text-yellow-500" />,
              title: "Reward",
              description: "Receive compensation for valuable information",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit Information</CardTitle>
            <CardDescription>
              Provide details about a missing person you've found. All information will be verified before any reward is
              issued.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="missing-person" className="block text-sm font-medium text-gray-700 mb-1">
                  Missing Person's Name
                </label>
                <Input id="missing-person" placeholder="Jane Smith" />
              </div>
              <div>
                <label htmlFor="information" className="block text-sm font-medium text-gray-700 mb-1">
                  Information
                </label>
                <Textarea
                  id="information"
                  placeholder="Provide detailed information about the missing person's whereabouts or condition"
                />
              </div>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                Submit Information
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            For more information about our reward program and terms, please visit our FAQ page.
          </p>
          <Link href="/faq" passHref>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              View FAQ
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

