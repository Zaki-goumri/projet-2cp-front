import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  proposal: z.string().min(1, { message: "Proposal is required" }),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <Card className="p-6 space-y-6 mt-6 !bg-white !text-black !border-none h-fit shadow" id="apply">
      <h3 className="font-semibold text-xl">Contact the Organisers</h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter your email"
              className="p-3 border-none rounded-md"
              {...register("email")}
            />
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Proposal Submission</h4>
            <p className="text-muted-foreground text-base">
              If you have any proposals or suggestions, feel free to share them
              with us.
            </p>
            <Textarea
              placeholder="Enter your proposal"
              className="min-h-72 p-3 border-none shadow rounded-md !field-sizing-content"
              {...register("proposal")}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="flex items-center gap-3 place-self-center bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md"
        >
          <Send className="w-5 h-5" />
          Apply
        </Button>
      </form>
    </Card>
  );
};

export default Contact;
