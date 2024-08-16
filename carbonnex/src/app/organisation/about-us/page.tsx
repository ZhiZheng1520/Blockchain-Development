import { OrganisationHeader } from "@/components/OrganisationHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div>
      <OrganisationHeader />
      <div className="flex flex-col gap-12">
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="text-muted-foreground mb-6">
               CarbonNex is a decentralized carbon credit exchange platform dedicated to revolutionizing how individuals, businesses, and organizations engage in the fight against climate change.
               By leveraging blockchain technology, we offer a transparent, secure, and efficient marketplace for trading carbon credits, free from intermediaries.
               Every transaction on CarbonNex is traceable and verifiable, ensuring the highest level of trust and integrity while reducing costs and maximizing the environmental impact.
              </p>
              <p className="text-muted-foreground mb-6">
               Our mission is to democratize access to carbon credits, empowering everyone to make meaningful contributions to a sustainable, low-carbon future.
               Whether you’re looking to offset your carbon footprint, meet corporate sustainability goals, or monetize environmental projects,
               CarbonNex provides a seamless and user-friendly platform to achieve your objectives.
               Together, we can redefine the carbon market and accelerate the global transition to a greener, more sustainable world.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="/img.png" alt="Pang Wai Hong" />

                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Pang Wai Hong</h3>
                  <p className="text-muted-foreground">CEO</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="/img.png" alt="Jane Smith" />

                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Low Siu Hui</h3>
                  <p className="text-muted-foreground">CTO</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="/img.png" alt="Tan Zhi Zheng" />

                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Tan Zhi Zheng</h3>
                  <p className="text-muted-foreground">Head of Computing</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="/img.png" alt="Dayna Chan" />

                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Dayna Chan</h3>
                  <p className="text-muted-foreground">Head of Design</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <MapPinIcon className="w-5 h-5 inline-block mr-2" />
                    Jalan Teknologi 5, Taman Teknologi Malaysia, 57000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur
                  </p>
                  <p>
                    <PhoneIcon className="w-5 h-5 inline-block mr-2" />
                    (60) 12 927-2729
                  </p>
                  <p>
                    <MailIcon className="w-5 h-5 inline-block mr-2" />
                    info@carbonnex.com
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex gap-4 text-muted-foreground">
                  <Link href="#" className="hover:text-primary" prefetch={false}>
                    <TwitterIcon className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-primary" prefetch={false}>
                    <FacebookIcon className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-primary" prefetch={false}>
                    <InstagramIcon className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-primary" prefetch={false}>
                    <LinkedinIcon className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}