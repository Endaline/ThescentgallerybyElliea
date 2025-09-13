"use client";

import type React from "react";

import { useActionState, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { signUpDefaultValues } from "@/lib/constants";
import { signUpUser } from "@/app/actions/user.actions";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className="w-full h-12 bg-[#512260] hover:bg-[#512260]/90 text-white cursor-pointer"
      >
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
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
            <CardTitle className="text-2xl font-serif text-charcoal">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join us to discover your perfect fragrance
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form action={action} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">FullName</Label>
                <div className="relative">
                  <User className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Fullname"
                    autoComplete="name"
                    defaultValue={signUpDefaultValues.name}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

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
                    defaultValue={signUpDefaultValues.email}
                    className="pl-10 h-12"
                    required
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
                    placeholder="Create a password"
                    autoComplete="password"
                    defaultValue={signUpDefaultValues.password}
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

              <div className="space-y-2"></div>
              <SignUpButton />
              {data && !data.success && (
                <div className="text-center text-destructive">
                  {data.message}
                </div>
              )}
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link
                  href="/login"
                  className="text-[#512260] hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
