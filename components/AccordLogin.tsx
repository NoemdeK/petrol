"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ArrowUpRight, Eye, EyeOff, Github } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import useLoading from "@/lib/useLoading";
import axios from "axios";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .trim(),
  password: z.string(),
});

const AccordLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loading = useLoading();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const response = await signIn("credentials", {values, redirect: false});
    // console.log(response)
    loading.onOpen();
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      const res = await axios.post(
        `https://petrodata.zainnovations.com/api/v1/auth/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const role = res.data.data.role;
      // window.open()z
      // switch (role) {
      //   case 'rwx_data_entry_user':
      //     router.replace('/data-entry');
      //     break;
      //   case 'rwx_admin':
      //     router.replace('/dashboard/analytics/PMS');
      //     break;
      //   case 'rwx_user':
      //     router.replace('/dashboard/analytics/PMS');
      //     break;
      //     case 'rwx_data_entry_analyst':
      //     router.replace('/dashboard/analytics/PMS');
      //     break;
      //   default:
      //     router.replace('/dashboard/analytics/PMS');
      //     break;
      // }
      const newTab = window.open("", "_blank");

      switch (role) {
        case "rwx_data_entry_user":
          if (newTab) {
            newTab.location.href = "/data-entry"; // Change this URL to your desired location
          }
          break;
        case "rwx_admin":
        case "rwx_user":
        case "rwx_data_entry_analyst":
          // Open a new tab upon successful authentication
          if (newTab) {
            newTab.location.href = "/dashboard/analytics/PMS"; // Change this URL to your desired location
          }
          break;
        default:
          router.replace("/dashboard/analytics/PMS");
          break;
      }

      if (response?.error) {
        // Handle authentication error
        console.error("Authentication error:", response.error);
        toast({
          title: "User cannot login",
          description: "Cannot login, Check details",
          variant: "destructive",
        });
      } else if (response?.ok) {
        // Authentication succeeded
        toast({
          title: "User Logged in",
          description: "Welcome back to Petrodata",
        });

        // Redirect the user to the desired location
        // router.push('/dashboard/analytics/PMS');
      }
    } catch (error: any) {
      // Handle unexpected errors
      toast({
        title: "User cannot login",
        description: `${error?.message || "Cannot login, Check details"}`,
        variant: "destructive",
      });
    } finally {
      loading.onClose();
    }
    // router.push('/dashboard/analytics')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 mb-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <span
                          className={`password-toggle ${
                            showPassword ? "visible" : ""
                          } cursor-pointer absolute top-3 right-1`}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <p>Don&apos;t have an account?</p>
            <a
              href="mailto:petro@diophalytics.io"
              className="border-2 w-40 text-xs px-4 py-2 bg-gray-200 rounded-lg flex justify-between items-center"
            >
              <span>Get in touch</span> <ArrowUpRight size={14} />
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccordLogin;
