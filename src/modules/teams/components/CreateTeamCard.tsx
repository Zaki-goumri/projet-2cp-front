import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { teamsService } from "../services/teams.service";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "react-toastify";


// Validation schema using Zod
const createTeamSchema = z.object({
  name: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  skills: z.array(z.string()).min(1, { message: "Select at least one skill" }),
  members: z.array(z.string().email({ message: "Invalid email address" }))
});

// Type definition for form
type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

// Available skills and categories
const AVAILABLE_SKILLS = ["Code", "Design", "Problem Solving", "Web Dev", "Editing", "Analytics"];
const TEAM_CATEGORIES = ["Project", "Study", "Research", "Hackathon", "Other"];

const CreateTeamCard = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      skills: [],
      members: []
    }
  });

  // Setup React Query mutation
  // const createTeamMutation = useMutation({
  //   mutationFn: (data: CreateTeamFormValues) => {
  //     return teamsService.createTeam({
  //       name: data.name,
  //       description: data.description,
  //       // Include other required fields from Team interface
  //       status: 'ACTIVE',
  //       members: 1, // Start with 1 member (creator)
  //       projects: 0
  //     });
  //   },
  //   onSuccess: async (createdTeam) => {
  //     // If there are members to invite, use the invite members endpoint
  //     if (form.getValues().members.length > 0) {
  //       await teamsService.inviteMembers(
  //         createdTeam.id, 
  //         form.getValues().members
  //       );
  //     }
  //     navigate("/teams");
  //   }
  // });

  // Form submission handler
  const onSubmit = (data: CreateTeamFormValues) => {
    // createTeamMutation.mutate(data);
    console.log(data);
  };

  // Skill selection handler
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      const updated = selectedSkills.filter(s => s !== skill);
      setSelectedSkills(updated);
      form.setValue("skills", updated);
    } else {
      const updated = [...selectedSkills, skill];
      setSelectedSkills(updated);
      form.setValue("skills", updated);
    }
  };

  

  const handleAddMember = () => {
    if (emailInput) {
      const emails = emailInput
        .split(/[,;]/) 
        .map(email => email.trim())
        .filter(email => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email){
            toast.error('cant send to empty email')
          }else if (!emailRegex.test(email)){
            toast.error('some emails are in the wrong format')
          } else if (memberEmails.includes(email)){
            toast.error('email alrady added')
          } 
          return email && 
            emailRegex.test(email) && 
            !memberEmails.includes(email);
        });
      if (emails.length > 0) {
        const updated = [...memberEmails, ...emails];
        setMemberEmails(updated);
        form.setValue("members", updated);
        setEmailInput("");
      }
    }
  };

  const handleRemoveMember = (email: string) => {
    const updated = memberEmails.filter(e => e !== email);
    setMemberEmails(updated);
    form.setValue("members", updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleAddMember();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-extrabold mb-2">Create <span className="text-primary">New Team</span></h1>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          {/* Team Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-bold">Team Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The Hackers"
                    className="h-12 px-4  focus:border-primary focus:ring-2 focus:ring-emerald-100 transition-all duration-200 border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Team Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-semibold">Team Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 border-none focus:border-primary focus:ring-2 focus:ring-emerald-100 transition-all duration-200 !text-black/50 ">
                      <SelectValue placeholder="Select a category" className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="!bg-white !text-black border-none " >
                    {TEAM_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category} className="hover:!bg-primary/10 !text-black/50 default:!border-gray-200  !bg-white" >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Team Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-bold">Team Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your Team's goals and purpose."
                    className="min-h-32 resize-none px-4 py-3 focus:border-primary focus:ring-2 focus:ring-emerald-100 transition-all duration-200 border-none shadow-sm "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Team Skills Field */}
          <FormField
            control={form.control}
            name="skills"
            render={() => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-semibold">Team Skills</FormLabel>
                <div>
                  <Input
                    placeholder="Search Icons"
                    className="h-12 px-4 mb-4 border-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {AVAILABLE_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`px-4 py-2 text-sm rounded-full cursor-pointer flex items-center justify-center h-10 transition-all duration-200 border-none !text-black/50 ${selectedSkills.includes(skill)
                          ? "!text-white !bg-primary"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 "
                        }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.skills && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.skills.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Invite Members Field */}
          <FormField
            control={form.control}
            name="members"
            render={() => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-semibold">Invite members</FormLabel>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Input
                    type="email"
                    placeholder="Enter E-mail addresses separated by commas"
                    className="h-12 px-4 border-none focus:border-primary focus:ring-2 focus:ring-emerald-100 transition-all duration-200 w-full"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddMember}
                    className="h-12 px-6 border-none hover:!bg-primary !text-white !bg-gray-400  "
                  >
                    Add
                  </Button>
                </div>
                {memberEmails.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {memberEmails.map((email) => (
                      <Badge
                        key={email}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1.5 !bg-gray-50 !text-black/50"
                      >
                        {email }
                        <X
                          className="h-3.5 w-3.5 cursor-pointer ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveMember(email)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                {form.formState.errors.members && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.members.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              className="h-12 px-8 !bg-primary hover:!bg-primary/70 !text-white font-medium rounded-full transition-all duration-300"
            >
              Create New Team
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeamCard;