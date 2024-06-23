import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddUser } from "@/integrations/supabase/index.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase, User } from "@/integrations/supabase/index.js"; // Add this import

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const addUser = useAddUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      const { data: user, error: userError } = await supabase
        .from('profiles')
        .insert([
          { id: supabase.auth.user().id, username: data.username, email: data.email, created_at: new Date().toISOString() },
        ]);

      if (userError) {
        throw userError;
      }

      toast.success("User registered successfully!");
      reset();
      navigate("/login");
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