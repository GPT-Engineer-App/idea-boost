import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  return (
    <div className="space-y-8">
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold">Shape the Future with Your Ideas</h1>
          <p className="mt-4 text-xl">Faving: Where Your Vision Becomes Action</p>
          <Button className="mt-6" variant="primary">Donate Here</Button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Urban Green Roof Initiative</CardTitle>
              <CardDescription>Greening Urban Skies</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/images/project1.jpg" alt="Urban Green Roof Initiative" className="w-full h-48 object-cover rounded-md" />
              <Button className="mt-4" variant="outline">Read More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community Plastic Recycling Workshop</CardTitle>
              <CardDescription>Recycle, Rebuild, Reimagine</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/images/project2.jpg" alt="Community Plastic Recycling Workshop" className="w-full h-48 object-cover rounded-md" />
              <Button className="mt-4" variant="outline">Read More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Solar-Powered Water Purification System</CardTitle>
              <CardDescription>Sunlight to Safe Water</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/images/project3.jpg" alt="Solar-Powered Water Purification System" className="w-full h-48 object-cover rounded-md" />
              <Button className="mt-4" variant="outline">Read More</Button>
            </CardContent>
          </Card>
        </div>
        <Button className="mt-6" variant="secondary">See More Projects</Button>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Individual Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Avatar className="mx-auto">
              <AvatarImage src="/images/member1.jpg" alt="Vita" />
              <AvatarFallback>V</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Vita</h3>
            <p className="text-gray-500">Score: 165300</p>
            <Button className="mt-2" variant="outline">See Profile</Button>
          </div>
          <div className="text-center">
            <Avatar className="mx-auto">
              <AvatarImage src="/images/member2.jpg" alt="Anna" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Anna</h3>
            <p className="text-gray-500">Score: 120932</p>
            <Button className="mt-2" variant="outline">See Profile</Button>
          </div>
          <div className="text-center">
            <Avatar className="mx-auto">
              <AvatarImage src="/images/member3.jpg" alt="Saleh" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Saleh</h3>
            <p className="text-gray-500">Score: 93204</p>
            <Button className="mt-2" variant="outline">See Profile</Button>
          </div>
          <div className="text-center">
            <Avatar className="mx-auto">
              <AvatarImage src="/images/member4.jpg" alt="Mona" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-bold">Mona</h3>
            <p className="text-gray-500">Score: 88605</p>
            <Button className="mt-2" variant="outline">See Profile</Button>
          </div>
        </div>
        <Button className="mt-6" variant="secondary">See More Members</Button>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Vote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Vote Shapes Our Future</CardTitle>
              <CardDescription>Prioritize Urgencies, Propel Solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="/images/vote.jpg" alt="Vote" className="w-full h-48 object-cover rounded-md" />
              <Button className="mt-4" variant="outline">Vote Here</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Register and create your account.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explore and vote on projects.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Donate and gain score.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;