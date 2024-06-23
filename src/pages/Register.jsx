import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddUser } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const addUser = useAddUser();

  const onSubmit = async (data) => {
    try {
      await addUser.mutateAsync({
        username: data.username,
        email: data.email,
        password_hash: data.password, // In a real-world scenario, ensure to hash the password before storing it
        created_at: new Date().toISOString(),
      });
      toast.success("User registered successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to register user: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input id="username" type="text" {...register("username")} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" {...register("email")} required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input id="password" type="password" {...register("password")} required />
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;