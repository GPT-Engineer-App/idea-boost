import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddProject, useAddUserScore, useUpdateUserScore, useUserScores, supabase, useAddFile } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const CreateProject = () => {
  const { register, handleSubmit, reset } = useForm();
  const addProject = useAddProject();
  const { data: userScores } = useUserScores();
  const updateUserScore = useUpdateUserScore();
  const addUserScore = useAddUserScore();
  const addFile = useAddFile();

  const onSubmit = async (data) => {
    try {
      const project = await addProject.mutateAsync({
        project_name: data.title,
        description: data.description,
        start_date: new Date().toISOString(),
      });

      const userId = supabase.auth.user().id;
      const userScore = userScores.find(score => score.user_id === userId);

      if (userScore) {
        await updateUserScore.mutateAsync({
          user_id: userId,
          score: userScore.score + 10, // Increment score by 10 for creating a project
        });
      } else {
        await addUserScore.mutateAsync({
          user_id: userId,
          score: 10,
        });
      }

      if (data.file[0]) {
        const file = data.file[0];
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(`${project[0].project_id}/${file.name}`, file);

        if (uploadError) {
          throw uploadError;
        }

        await addFile.mutateAsync({
          uploader_id: userId,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          upload_date: new Date().toISOString(),
          project_id: project[0].project_id,
        });
      }

      toast.success("Project created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create project: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <Input id="title" type="text" {...register("title")} required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <Input id="description" type="text" {...register("description")} required />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <Input id="file" type="file" {...register("file")} />
            </div>
            <Button type="submit" className="w-full">Create Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;