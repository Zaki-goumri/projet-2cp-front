import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  proposal: z.string().min(1, { message: 'Proposal is required' }),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card
      className="mt-6 h-fit space-y-6 !border-none !bg-white p-6 !text-black shadow"
      id="apply"
    >
      <h3 className="text-xl font-semibold">Contact the Organisers</h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter your email"
              className="rounded-md border-none p-3"
              {...register('email')}
            />
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Proposal Submission</h4>
            <p className="text-muted-foreground text-base">
              If you have any proposals or suggestions, feel free to share them
              with us.
            </p>
            <Textarea
              placeholder="Enter your proposal"
              className="!field-sizing-content min-h-72 rounded-md border-none p-3 shadow"
              {...register('proposal')}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary-dark flex items-center gap-3 place-self-center rounded-md px-4 py-2 text-white"
        >
          <Send className="h-5 w-5" />
          Apply
        </Button>
      </form>
    </Card>
  );
};

export default Contact;
