import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ProjectDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Project Detailed View</CardTitle>
          <CardDescription>Zoomed-in view of the selected project</CardDescription>
        </CardHeader>
        <CardContent>
          <img src="/images/urban_green_roof.jpg" alt="Detailed View" className="w-full h-96 object-cover rounded-md" />
          <p className="mt-4">This is a detailed view of the selected project. Here you can provide more information about the project, its goals, progress, and any other relevant details.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;