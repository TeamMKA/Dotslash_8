"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportFoundPerson() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitStatus('success')
    // Redirect after 3 seconds
    setTimeout(() => router.push('/'), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 py-12">
      <Card className="w-4/5 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-yellow-600">Report a Found Person</CardTitle>
          <CardDescription className="text-center">
            Please provide as much information as possible about the person you've found.
            Your report can help reunite them with their loved ones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reporter-name">Your Name</Label>
                  <Input id="reporter-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reporter-contact">Your Contact Number</Label>
                  <Input id="reporter-contact" type="tel" placeholder="+1 (555) 123-4567" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Found Person's Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="found-name">Name (if known)</Label>
                  <Input id="found-name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="found-age">Approximate Age</Label>
                  <Input id="found-age" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="found-gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="found-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="found-location">Location Found</Label>
                  <Input id="found-location" placeholder="City, State" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="found-description">Physical Description</Label>
                <Textarea 
                  id="found-description" 
                  placeholder="Please provide details about height, weight, hair color, distinguishing features, etc."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="found-condition">Person's Current Condition</Label>
                <Textarea 
                  id="found-condition" 
                  placeholder="Describe the person's physical and mental state, any immediate needs, etc."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea 
                  id="additional-info" 
                  placeholder="Any other details that might help identify the person or contact their family"
                  rows={3}
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your report has been submitted successfully. Thank you for your help.
                  You will be redirected to the home page shortly.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem submitting your report. Please try again later.
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
