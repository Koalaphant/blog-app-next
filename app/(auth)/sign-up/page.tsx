"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 mb-40 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            placeholder="johndoe"
            {...form.register("username")}
            className={`mt-1 block w-full px-3 py-2 border ${
              form.formState.errors.username
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.username?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="mail@example.com"
            {...form.register("email")}
            className={`mt-1 block w-full px-3 py-2 border ${
              form.formState.errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...form.register("password")}
            className={`mt-1 block w-full px-3 py-2 border ${
              form.formState.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.password?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter your password"
            {...form.register("confirmPassword")}
            className={`mt-1 block w-full px-3 py-2 border ${
              form.formState.errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.confirmPassword?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
