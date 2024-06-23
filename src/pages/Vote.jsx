import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Vote = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
};

export default Vote;