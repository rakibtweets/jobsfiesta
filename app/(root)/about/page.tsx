import { Briefcase, Users, Zap, Globe } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">About Jobsfiesta</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Connecting talented professionals with meaningful opportunities and helping employers find the right fit.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At Jobsfiesta, we believe that the right job match can transform careers and lives. Our mission is to
              create a platform that makes it easy for talented professionals to find opportunities that match their
              skills and aspirations, while helping employers discover the talent they need to grow.
            </p>
            <p>
              We are committed to breaking down barriers in the job market and creating a more transparent, efficient,
              and human-centered hiring experience for everyone.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Briefcase className="mb-2 h-8 w-8" />
                <CardTitle className="text-lg">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We believe in clear communication and honest information to build trust.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8" />
                <CardTitle className="text-lg">Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Everyone deserves access to great opportunities regardless of background.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="mb-2 h-8 w-8" />
                <CardTitle className="text-lg">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We continuously improve our platform to serve users better.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="mb-2 h-8 w-8" />
                <CardTitle className="text-lg">Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We measure success by the positive impact we have on careers and businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>
              Built by professionals passionate about connecting people with opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our diverse team brings together expertise in technology, human resources, design, and business to create
              a platform that truly serves the needs of both job seekers and employers. We are constantly learning,
              evolving, and improving our platform based on user feedback.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
