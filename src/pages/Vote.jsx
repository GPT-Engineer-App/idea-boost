import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAddUserScore, useUpdateUserScore, useUserScores, useVotes, useAddVote, Vote } from "@/integrations/supabase/index.js";
import { supabase } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const Vote = () => {
  const { data: votes, isLoading, error } = useVotes();
  const addVote = useAddVote();
  const { data: userScores } = useUserScores();
  const updateUserScore = useUpdateUserScore();
  const addUserScore = useAddUserScore();

  const handleVote = async () => {
    try {
      const userId = supabase.auth.user().id;
      const userScore = userScores.find(score => score.user_id === userId);

      await Vote.create({
        project_id: "project-id-placeholder", // Replace with actual project ID
        user_id: userId,
        created_at: new Date().toISOString(),
      });

      if (userScore) {
        await updateUserScore.mutateAsync({
          user_id: userId,
          score: userScore.score + 2, // Increment score by 2 for voting
        });
      } else {
        await addUserScore.mutateAsync({
          user_id: userId,
          score: 2,
        });
      }

      toast.success("Vote successful!");
    } catch (error) {
      toast.error("Failed to vote: " + error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading votes</div>;

  const voteCount = votes.filter(vote => vote.project_id === "project-id-placeholder").length; // Replace with actual project ID

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
            <Button className="mt-4" variant="outline" onClick={handleVote}>Vote Here</Button>
            <p className="mt-2">Votes: {voteCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vote;