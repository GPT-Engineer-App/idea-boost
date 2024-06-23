import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { supabase } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const Profile = () => {
  const { session } = useSupabaseAuth();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        toast.error("Failed to fetch profile: " + error.message);
      } else {
        console.log("Fetched profile data:", data);
        setProfile(data);
        if (data) {
          setValue("bio", data.bio);
          setValue("avatar_url", data.avatar_url);
          setValue("name", session.user.user_metadata.full_name);
          setValue("email", session.user.email);
        }
      }
      setLoading(false);
    };

    if (session) {
      fetchProfile();
    }
  }, [session, setValue]);

  const onSubmit = async (data) => {
    try {
      const updates = {
        user_id: session.user.id,
        bio: data.bio,
        avatar_url: data.avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={profile?.avatar_url || "/placeholder-user.jpg"} alt="Avatar" />
                <AvatarFallback>{session.user.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700">
                  Avatar URL
                </label>
                <Input id="avatar_url" type="text" {...register("avatar_url")} />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input id="name" type="text" {...register("name")} disabled />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" {...register("email")} disabled />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <Input id="bio" type="text" {...register("bio")} />
            </div>
            <Button type="submit" className="w-full">Save</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;