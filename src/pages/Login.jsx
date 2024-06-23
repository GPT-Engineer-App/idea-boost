import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "sonner";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { session, loading, login } = useSupabaseAuth();

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to log in: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;