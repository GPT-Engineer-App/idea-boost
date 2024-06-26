import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useComments, useAddComment, useVotes, useAddVote, supabase, useTags } from "@/integrations/supabase/index.js";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ProjectDetails = () => {
  const { data: comments, isLoading, error } = useComments();
  const { data: votes, isLoading: votesLoading, error: votesError } = useVotes();
  const addVote = useAddVote();
  const addComment = useAddComment();
  const { register, handleSubmit, reset } = useForm();
  const [userId, setUserId] = useState(null);
  const { data: tags, isLoading: tagsLoading, error: tagsError } = useTags();

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = supabase.auth.user();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const handleVote = async () => {
    try {
      await addVote.mutateAsync({
        project_id: "project-id-placeholder", // Replace with actual project ID
        user_id: userId,
        created_at: new Date().toISOString(),
      });
      toast.success("Vote recorded successfully!");
    } catch (error) {
      toast.error("Failed to record vote: " + error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      await addComment.mutateAsync({
        task_id: "project-id-placeholder", // Replace with actual project ID
        user_id: userId,
        content: data.comment,
        created_at: new Date().toISOString(),
      });
      toast.success("Comment added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add comment: " + error.message);
    }
  };

  if (isLoading || votesLoading || tagsLoading) return <div>Loading...</div>;
  if (error || votesError || tagsError) return <div>Error loading data</div>;

  console.log("Project details data fetched successfully:", { comments, votes, tags });

  const voteCount = votes.filter(vote => vote.project_id === "project-id-placeholder").length; // Replace with actual project ID

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
            <Button className="mt-4" variant="outline" onClick={handleVote}>Vote Here</Button>
            <p className="mt-2">Votes: {voteCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.comment_id} className="mb-4">
            <Card>
              <CardContent>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">Posted by {comment.user_id} on {new Date(comment.created_at).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Add a Comment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Textarea id="comment" {...register("comment")} required />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            {tags && (
              <Select {...register("tags")} multiple>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select tags" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(tag => (
                    <SelectItem key={tag.tag_id} value={tag.name}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button type="submit" className="w-full">Submit Comment</Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;