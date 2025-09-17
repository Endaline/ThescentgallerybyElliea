"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Lock, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestPasswordReset } from "@/app/actions/user.actions";
import { redirect } from "next/navigation";

export default function ForgotPasswordPage() {
  const [data, action] = useActionState(requestPasswordReset, {
    success: false,
    message: "",
  });

  const ForgotPasswordButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className="w-full h-12 bg-[#770a10] hover:bg-[#770a10]/90 text-white cursor-pointer"
      >
        {pending ? "Submitting..." : "Submit"}
      </Button>
    );
  };

  data?.success && redirect("/login");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-slate-100 text-slate-700 ">
          <CardHeader className="text-center pb-6">
            <Link href="/" className="flex flex-col items-center space-x-2">
              <Image
                width={1000}
                height={1000}
                src="/images/logo-3.png"
                alt="logo"
                className="h-20 w-auto"
              />
              <span className="text-2xl font-semibold text-[#770a10] ">
                ThescentgallerybyElliea
              </span>
            </Link>
            <CardDescription className="text-gray-600">
              Enter your email address an email was sent to your email address
              with a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form action={action} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="password"
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?
                      <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div> */}
              <ForgotPasswordButton />
              {data && !data.success ?
                <div className="text-center text-destructive">
                  {data.message}
                </div>
              : <div className="text-center text-green-500">{data.message}</div>
              }
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-[#770a10] hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
