import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

import ContactForm from "@/components/forms/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Have questions? We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we&apos;ll respond as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@jobi.com" className="text-primary hover:underline">
                  support@jobsfiesta.com
                </a>
                <p className="text-muted-foreground mt-2 text-sm">We typically respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="tel:+8801938056537" className="text-primary hover:underline">
                  +8801938056537
                </Link>
                <p className="text-muted-foreground mt-2 text-sm">Monday - Friday, 9 AM - 5 PM EST</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>1347 Gazipur</p>
                <p>Gazipur City Corporation, Bangladesh</p>
                <p className="text-muted-foreground mt-2 text-sm">Bangladesh</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
