"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong.",
        variant: "destructive",
      });
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-red-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <div>
            <label className="text-white block text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...form.register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
            {form.formState.errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-white block text-sm font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
            {form.formState.errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
