import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const Tasks = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await addTask.mutateAsync({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        due_date: data.due_date,
        project_id: data.project_id,
      });
      toast.success("Task created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create task: " + error.message);
    }
  };

  const handleUpdate = async (taskId, data) => {
    try {
      await updateTask.mutateAsync({
        task_id: taskId,
        ...data,
      });
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task: " + error.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask.mutateAsync({ task_id: taskId });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task: " + error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <Card key={task.task_id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
              <Button variant="outline" onClick={() => handleUpdate(task.task_id, { status: "completed" })}>Mark as Completed</Button>
              <Button variant="outline" onClick={() => handleDelete(task.task_id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Add a Task</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input id="title" type="text" {...register("title")} required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input id="description" type="text" {...register("description")} required />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Input id="status" type="text" {...register("status")} required />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <Input id="priority" type="text" {...register("priority")} required />
          </div>
          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <Input id="due_date" type="date" {...register("due_date")} required />
          </div>
          <div>
            <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
              Project ID
            </label>
            <Input id="project_id" type="text" {...register("project_id")} required />
          </div>
          <Button type="submit" className="w-full">Add Task</Button>
        </form>
      </div>
    </div>
  );
};

export default Tasks;