import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useComments, useAddComment, useVotes, useAddVote, supabase, useTags, Comment } from "@/integrations/supabase/index.js";
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
      await Comment.create({
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

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Contextual Information</h3>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Urban Green Roof Initiative: Greening Urban Skies</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Context:</strong> Urban Green Roof Initiative</p>
              <p><strong>Overview:</strong> The Urban Green Roof Initiative aims to transform city rooftops into green, sustainable spaces that enhance urban biodiversity, reduce heat islands, and improve air quality. This initiative encourages building owners and residents to install green roofs, which are layers of vegetation planted over waterproofing systems on top of flat or slightly-sloped roofs.</p>
              <p><strong>Key Objectives:</strong></p>
              <ul className="list-disc list-inside">
                <li>Promote urban biodiversity by providing habitats for birds, insects, and other wildlife.</li>
                <li>Reduce urban heat islands by cooling the air and providing shade.</li>
                <li>Improve air quality by absorbing pollutants and carbon dioxide.</li>
                <li>Enhance stormwater management by absorbing rainwater and reducing runoff.</li>
                <li>Provide aesthetic and recreational spaces for urban residents.</li>
              </ul>
              <p><strong>Implementation Strategy:</strong></p>
              <ul className="list-disc list-inside">
                <li><strong>Phase 1: Awareness and Education</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Conduct workshops and seminars to educate building owners and residents about the benefits of green roofs.</li>
                    <li>Distribute informational materials and resources on green roof installation and maintenance.</li>
                  </ul>
                </li>
                <li><strong>Phase 2: Pilot Projects</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Identify and partner with willing building owners to implement pilot green roof projects.</li>
                    <li>Monitor and evaluate the performance and benefits of these pilot projects.</li>
                  </ul>
                </li>
                <li><strong>Phase 3: Incentives and Support</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Develop incentive programs, such as grants or tax rebates, to encourage more building owners to install green roofs.</li>
                    <li>Provide technical support and resources to assist with green roof installation and maintenance.</li>
                  </ul>
                </li>
                <li><strong>Phase 4: Expansion and Advocacy</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Expand the initiative to include more buildings and communities.</li>
                    <li>Advocate for policies and regulations that support the implementation of green roofs in urban areas.</li>
                  </ul>
                </li>
              </ul>
              <p><strong>Expected Outcomes:</strong></p>
              <ul className="list-disc list-inside">
                <li>Increased urban biodiversity and improved environmental quality.</li>
                <li>Reduced urban temperatures and energy consumption.</li>
                <li>Enhanced stormwater management and reduced flood risks.</li>
                <li>Improved well-being and quality of life for urban residents.</li>
              </ul>
              <p><strong>Read More:</strong> <a href="#">Link to detailed article, case studies, and resources on green roof implementation</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Plastic Recycling Workshop: Recycle, Rebuild, Reimagine</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Context:</strong> Community Plastic Recycling Workshop</p>
              <p><strong>Overview:</strong> The Community Plastic Recycling Workshop aims to educate and empower community members to recycle plastic waste effectively. The workshop focuses on the importance of plastic recycling, the environmental impact of plastic waste, and practical ways to repurpose plastic materials into useful products.</p>
              <p><strong>Key Objectives:</strong></p>
              <ul className="list-disc list-inside">
                <li>Raise awareness about the environmental impact of plastic waste.</li>
                <li>Educate community members on proper plastic recycling techniques.</li>
                <li>Encourage the repurposing of plastic waste into useful and creative products.</li>
                <li>Foster a sense of community involvement and responsibility towards waste management.</li>
              </ul>
              <p><strong>Implementation Strategy:</strong></p>
              <ul className="list-disc list-inside">
                <li><strong>Phase 1: Outreach and Recruitment</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Promote the workshop through community centers, schools, and local media.</li>
                    <li>Encourage community members of all ages to participate in the workshop.</li>
                  </ul>
                </li>
                <li><strong>Phase 2: Workshop Sessions</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Conduct interactive sessions on the importance of plastic recycling and its environmental benefits.</li>
                    <li>Demonstrate practical recycling techniques and repurposing ideas for plastic waste.</li>
                  </ul>
                </li>
                <li><strong>Phase 3: Hands-On Activities</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Organize hands-on activities where participants can create useful products from recycled plastic, such as planters, containers, and decorative items.</li>
                    <li>Provide necessary tools and materials for the activities.</li>
                  </ul>
                </li>
                <li><strong>Phase 4: Follow-Up and Support</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Establish a community recycling program to continue the efforts beyond the workshop.</li>
                    <li>Provide ongoing support and resources to participants for their recycling projects.</li>
                  </ul>
                </li>
              </ul>
              <p><strong>Expected Outcomes:</strong></p>
              <ul className="list-disc list-inside">
                <li>Increased awareness and knowledge about plastic recycling among community members.</li>
                <li>Reduced plastic waste in the community and improved environmental quality.</li>
                <li>Creative and practical use of recycled plastic materials.</li>
                <li>Strengthened community engagement and collaboration in waste management efforts.</li>
              </ul>
              <p><strong>Read More:</strong> <a href="#">Link to detailed article, success stories, and additional recycling resources</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solar-Powered Water Purification System: Sunlight to Safe Water</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Context:</strong> Solar-Powered Water Purification System</p>
              <p><strong>Overview:</strong> The Solar-Powered Water Purification System initiative focuses on providing clean and safe drinking water to communities using renewable solar energy. This system utilizes solar panels to power water purification units, making it a sustainable and eco-friendly solution for water scarcity and contamination issues.</p>
              <p><strong>Key Objectives:</strong></p>
              <ul className="list-disc list-inside">
                <li>Provide access to clean and safe drinking water in communities facing water scarcity and contamination.</li>
                <li>Promote the use of renewable solar energy for sustainable water purification.</li>
                <li>Educate communities on the benefits and maintenance of solar-powered water purification systems.</li>
                <li>Reduce reliance on non-renewable energy sources and minimize environmental impact.</li>
              </ul>
              <p><strong>Implementation Strategy:</strong></p>
              <ul className="list-disc list-inside">
                <li><strong>Phase 1: Site Assessment and Planning</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Identify communities in need of clean water solutions and assess suitable sites for installation.</li>
                    <li>Plan the installation process, including the selection of appropriate solar panels and purification units.</li>
                  </ul>
                </li>
                <li><strong>Phase 2: Installation and Setup</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Install solar panels and water purification units at selected sites.</li>
                    <li>Ensure proper setup and functionality of the systems, including necessary water storage and distribution infrastructure.</li>
                  </ul>
                </li>
                <li><strong>Phase 3: Community Training and Education</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Conduct training sessions for community members on the operation and maintenance of the systems.</li>
                    <li>Educate communities on the health benefits of clean water and the importance of using renewable energy.</li>
                  </ul>
                </li>
                <li><strong>Phase 4: Monitoring and Maintenance</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Regularly monitor the performance of the systems to ensure efficient operation.</li>
                    <li>Provide ongoing maintenance and support to address any technical issues.</li>
                  </ul>
                </li>
              </ul>
              <p><strong>Expected Outcomes:</strong></p>
              <ul className="list-disc list-inside">
                <li>Improved access to clean and safe drinking water in target communities.</li>
                <li>Increased use of renewable solar energy for sustainable development.</li>
                <li>Enhanced health and well-being of community members.</li>
                <li>Reduced environmental impact and reliance on non-renewable energy sources.</li>
              </ul>
              <p><strong>Read More:</strong> <a href="#">Link to detailed article, technical specifications, and case studies on solar-powered water purification systems</a></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;