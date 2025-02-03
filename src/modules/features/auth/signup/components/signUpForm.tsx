import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import axios from "@/api/axios.config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for form validation
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(50),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(50),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    fullName: z.string().min(1, "Full Name is required").max(50),
    phoneNumer: z.string().min(1, "Phone Number is required").max(50),
    //NOTE: maybe add admin later on
    type: z.enum(["Company", "Student"]),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Custom input field component

type BaseProps = {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  control: any; // Replace 'any' with the appropriate react-hook-form type (e.g., Control<FieldValues>)
  toggle?: boolean;
};

type TextOrPasswordInputProps = BaseProps & {
  type?: "text" | "password";
};

type OptionsInputProps = BaseProps & {
  type: "options";
  items: string[];
};

type CustomInputFieldProps = TextOrPasswordInputProps | OptionsInputProps;

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,
  placeholder,
  icon,
  control,
  type = "text",
  toggle = false,
  ...rest
}) => {
  // Local state only used when toggle is enabled (for password fields)
  const [show, setShow] = useState(false);
  const inputType = toggle ? (show ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              {type !== "options" ? (
                <Input
                  type={inputType}
                  placeholder={placeholder}
                  {...field}
                  className="h-12 p-7 pl-10 text-lg focus:outline-none rounded-xl opacity-50 w-full"
                />
              ) : (
                <Select
  value={field.value}
  onValueChange={field.onChange}
  defaultValue={field.value}
  {...rest}
>
  <SelectTrigger className="bg-white hover:bg-black">
    <SelectValue placeholder="Type" />
  </SelectTrigger>
  <SelectContent className="text-blue-500">
    {"items" in rest &&
      rest.items.map((val: string, idx: number) => (
        <SelectItem
          className="bg-black hover:bg-gray-800"
          value={val}
          key={idx}
        >
          {val}
        </SelectItem>
      ))}
  </SelectContent>
</Select>      )}{" "}
              {/* Left icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {icon}
              </span>
              {/* Toggle icon for password fields */}
              {toggle && (
                <span
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 bg-transparent hover:opacity-45 cursor-pointer"
                >
                  {!show ? (
                    <EyeOff size={24} className="opacity-50" />
                  ) : (
                    <Eye size={24} className="opacity-50" />
                  )}
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumer: "",
      type: "Student",
    },
  });

  // Array of field definitions
  const fields: CustomInputFieldProps[] = [
    {
      name: "fullName",
      placeholder: "Full Name",
      icon: <User className="h-5 w-auto opacity-45" />,
      control: form.control,
      type: "text",
      toggle: false,
    },
    {
      name: "phoneNumber",
      placeholder: "Phone Number",
      icon: <Phone className="h-5 w-auto opacity-45" />,
      control: form.control,
      type: "text",
      toggle: false,
    },
    {
      name: "password",
      placeholder: "Password",
      icon: <Lock className="h-5 w-5 opacity-45" />,
      control: form.control,
      toggle: true,
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      icon: <Lock className="h-5 w-5 opacity-45" />,
      control: form.control,
      toggle: true,
    },
    {
      name: "type",
      type: "options",
      placeholder: "Type",
      icon: <User className="h-5 w-auto opacity-45" />,
      control: form.control,
      toggle: false,
      items: ["Student", "Company"],
    },
    {
      name: "email",
      placeholder: "E-mail",
      icon: <Mail className="h-5 w-auto opacity-45" />,
      control: form.control,
      type: "text",
      toggle: false,
    },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // You can add your axios POST request here
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-5 sm:p-10 md:p-12 rounded-lg shadow-lg h-md mx-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Map over the fields array to render each input */}
            {fields.map((field) => (
              <CustomInputField key={field.name} {...field} />
            ))}

            <button
              type="submit"
              className="w-full bg-primary rounded-full py-4 text-white hover:opacity-85 hover:ease-in-out"
            >
              Sign In
            </button>
            <FormLabel className="text-center justify-center flex">
              <Link to="auth/password/forgot" className="text-primary hover:underline">
                forgot password ?
              </Link>
            </FormLabel>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
