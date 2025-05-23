import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCreateTeam } from '../hooks/useCreateTeam';

// Validation schema using Zod
const createTeamSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Team name must be at least 3 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
  skills: z.array(z.string()).min(1, { message: 'Select at least one skill' }),
  members: z.array(z.string().email({ message: 'Invalid email address' })),
});

// Type definition for form
type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

// Available skills and categories
const AVAILABLE_SKILLS = [
  'Code',
  'Design',
  'Problem Solving',
  'Web Dev',
  'Editing',
  'Analytics',
];
const TEAM_CATEGORIES = ['project', 'study', 'research', 'hackathon', 'other'];

const CreateTeamCard = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      skills: [],
      members: [],
    },
  });

  const { createTeam, isLoading, error } = useCreateTeam();

  const onSubmit = async (data: CreateTeamFormValues) => {
    if (data.members.length === 0) {
      toast.error('Please add at least one team member.');
      return;
    }

    try {
      console.log(data);
      await createTeam({
        name: data.name,
        emails: data.members,
        description: data.description,
        category: data.category.toLowerCase(),
      });
      navigate('/teams');
    } catch (err) {
      toast.error(error?.message || 'Failed to create team');
    }
  };

  // Skill selection handler
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      const updated = selectedSkills.filter((s) => s !== skill);
      setSelectedSkills(updated);
      form.setValue('skills', updated);
    } else {
      const updated = [...selectedSkills, skill];
      setSelectedSkills(updated);
      form.setValue('skills', updated);
    }
  };

  // Handler for adding custom skills
  const handleAddCustomSkill = () => {
    const skillToAdd = customSkillInput.trim();
    if (skillToAdd && !selectedSkills.includes(skillToAdd)) {
      const updated = [...selectedSkills, skillToAdd];
      setSelectedSkills(updated);
      form.setValue('skills', updated);
      setCustomSkillInput('');
    } else if (selectedSkills.includes(skillToAdd)) {
      toast.info('Skill already added.');
    } else {
      toast.error('Please enter a skill name.');
    }
  };

  const handleAddMember = () => {
    if (emailInput) {
      const emails = emailInput
        .split(/[,;]/)
        .map((email) => email.trim())
        .filter((email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email) {
            toast.error('cant send to empty email');
          } else if (!emailRegex.test(email)) {
            toast.error('some emails are in the wrong format');
          } else if (memberEmails.includes(email)) {
            toast.error('email alrady added');
          }
          return (
            email && emailRegex.test(email) && !memberEmails.includes(email)
          );
        });
      if (emails.length > 0) {
        const updated = [...memberEmails, ...emails];
        setMemberEmails(updated);
        form.setValue('members', updated);
        setEmailInput('');
      }
    }
  };

  const handleRemoveMember = (email: string) => {
    const updated = memberEmails.filter((e) => e !== email);
    setMemberEmails(updated);
    form.setValue('members', updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMember();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-3xl font-extrabold">
        Create <span className="text-primary">New Team</span>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
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
                    className="focus:border-primary h-12 border-none px-4 transition-all duration-200 focus:ring-2 focus:ring-emerald-100"
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
                <FormLabel className="text-base font-semibold">
                  Team Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="focus:border-primary h-12 border-none px-4 !text-black/50 transition-all duration-200 focus:ring-2 focus:ring-emerald-100">
                      <SelectValue
                        placeholder="Select a category"
                        className=""
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-none !bg-white !text-black">
                    {TEAM_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="hover:!bg-primary/10 !bg-white !text-black/50 default:!border-gray-200"
                      >
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
                <FormLabel className="text-base font-bold">
                  Team Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your Team's goals and purpose."
                    className="focus:border-primary min-h-32 resize-none border-none px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-emerald-100"
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
                <FormLabel className="text-base font-semibold">
                  Team Skills
                </FormLabel>
                <div className="mb-4 flex gap-3">
                  <Input
                    placeholder="Add a custom skill"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomSkill();
                      }
                    }}
                    className="focus:border-primary h-12 border-none px-4 transition-all duration-200 focus:ring-2 focus:ring-emerald-100"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomSkill}
                    className="hover:!bg-primary h-12 border-none !bg-gray-400 px-6 !text-white"
                  >
                    Add Skill
                  </Button>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {AVAILABLE_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={
                        selectedSkills.includes(skill) ? 'default' : 'outline'
                      }
                      className={`flex h-10 cursor-pointer items-center justify-center rounded-full border-none px-4 py-2 text-sm !text-black/50 transition-all duration-200 ${
                        selectedSkills.includes(skill)
                          ? '!bg-primary !text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {selectedSkills
                    .filter((skill) => !AVAILABLE_SKILLS.includes(skill))
                    .map((skill) => (
                      <Badge
                        key={skill}
                        variant="default"
                        className="!bg-primary flex h-10 cursor-pointer items-center justify-center rounded-full border-none px-4 py-2 text-sm !text-white transition-all duration-200"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                        <X
                          className="ml-1.5 h-3.5 w-3.5 cursor-pointer text-white/80 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSkill(skill);
                          }}
                        />
                      </Badge>
                    ))}
                </div>
                {form.formState.errors.skills && (
                  <p className="text-destructive mt-2 text-sm font-medium">
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
                <FormLabel className="text-base font-semibold">
                  Invite members
                </FormLabel>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Input
                    type="email"
                    placeholder="Enter E-mail addresses separated by commas"
                    className="focus:border-primary h-12 w-full border-none px-4 transition-all duration-200 focus:ring-2 focus:ring-emerald-100"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddMember}
                    className="hover:!bg-primary h-12 border-none !bg-gray-400 px-6 !text-white"
                  >
                    Add
                  </Button>
                </div>
                {memberEmails.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {memberEmails.map((email) => (
                      <Badge
                        key={email}
                        variant="secondary"
                        className="flex items-center gap-1 !bg-gray-50 px-3 py-1.5 !text-black/50"
                      >
                        {email}
                        <X
                          className="ml-1 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveMember(email)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                {form.formState.errors.members && (
                  <p className="text-destructive mt-2 text-sm font-medium">
                    {form.formState.errors.members.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="!bg-primary hover:!bg-primary/70 h-12 rounded-full px-8 font-medium !text-white transition-all duration-300"
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

