"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate password reset process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  if (isSubmitted) {
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
              <Link href="/" className="flex items-center space-x-2">
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
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-600">
                We&apos;ve sent a password reset link to {email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Please check your email and click on the link to reset your
                  password. If you don&apos;t see the email, check your spam
                  folder.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full h-12"
                >
                  Try Different Email
                </Button>

                <Link href="/auth/login" className="block">
                  <Button className="w-full h-12 bg-burgundy hover:bg-burgundy/90 text-white">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
                src="/images/Logo.svg"
                alt="logo"
                className="h-20 w-auto"
              />
              <span className="text-2xl font-semibold text-[#512260] ">
                ThescentgallerybyElliea
              </span>
            </Link>
            {/* <CardTitle className="text-2xl font-serif text-charcoal">
              Reset Password
            </CardTitle> */}
            <CardDescription className="text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#512260] hover:bg-[#512260]/80 text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-[#512260] hover:underline"
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
