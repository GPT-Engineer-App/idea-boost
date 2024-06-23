import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddUserScore, useUpdateUserScore, useUserScores } from "@/integrations/supabase/index.js";
import { supabase } from "@/integrations/supabase/index.js"; // Add this import
import { toast } from "sonner"; // Add this import

const Donate = () => {
  const { register, handleSubmit } = useForm();
  const { data: userScores } = useUserScores();
  const updateUserScore = useUpdateUserScore();

  const addUserScore = useAddUserScore(); // Add this line

  const onSubmit = async (data) => {
    try {
      // Assuming donation logic here

      const userId = supabase.auth.user().id;
      const userScore = userScores.find(score => score.user_id === userId);

      if (userScore) {
        await updateUserScore.mutateAsync({
          user_id: userId,
          score: userScore.score + 5, // Increment score by 5 for donating
        });
      } else {
        await addUserScore.mutateAsync({
          user_id: userId,
          score: 5,
        });
      }

      toast.success("Donation successful!");
    } catch (error) {
      toast.error("Failed to donate: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Donate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <Input id="amount" type="number" {...register("amount")} required />
            </div>
            <Button type="submit" className="w-full">Donate</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donate;