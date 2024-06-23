import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ProjectDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Urban Green Roof Initiative</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Urban Green Roof Initiative</CardTitle>
            <CardDescription>Greening Urban Skies</CardDescription>
          </CardHeader>
          <CardContent>
            <img src="/images/project1.jpg" alt="Urban Green Roof Initiative" className="w-full h-48 object-cover rounded-md" />
            <p className="mt-4">Transform concrete jungles into lush, green sanctuaries. Join our mission to convert city rooftops into vibrant gardens, combating urban heat and enhancing air quality.</p>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Impact</h3>
              <ul className="list-disc list-inside">
                <li>Cleaning Air</li>
                <li>Providing Food</li>
                <li>Isolation</li>
                <li>CO2 Absorption</li>
              </ul>
            </div>
            <Button className="mt-4" variant="outline">Vote Here</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;