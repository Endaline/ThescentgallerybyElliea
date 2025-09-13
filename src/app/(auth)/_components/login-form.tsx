"use client";

import type React from "react";

import { useActionState, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signInDefaultValues } from "@/lib/constants";
import { signInWithCredentials } from "@/app/actions/user.actions";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className="w-full h-12 bg-[#512260] hover:bg-[#512260]/90 text-white cursor-pointer"
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <div className="min-h-screen flex  items-center justify-center p-4">
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
                src="/images/Logo.svg"
                alt="logo"
                className="h-20 w-auto"
              />
              <span className="text-2xl font-semibold text-[#512260] ">
                ThescentgallerybyElliea
              </span>
            </Link>

            <CardDescription className="text-gray-600">
              Sign in to your account to continue shopping
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email/Password Form */}
            <form action={action} className="space-y-4">
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={signInDefaultValues.email}
                    className="pl-10 pr-10 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="password"
                    defaultValue={signInDefaultValues.password}
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
              </div>

              <div className="flex items-end justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#512260] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <SignInButton />
              {data && !data.success && (
                <div className="text-center text-destructive">
                  {data.message}
                </div>
              )}
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="text-[#512260] hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;
