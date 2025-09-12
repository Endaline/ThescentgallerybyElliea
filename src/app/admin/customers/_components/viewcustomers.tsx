/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  CheckCircle,
  XCircle,
  User as UserIcon,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";

interface CustomerProfileViewProps {
  user: User | null;
}

export default function CustomerProfileView({
  user,
}: CustomerProfileViewProps) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const getStatusColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "premium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatAddress = (address: any) => {
    if (!address || typeof address !== "object") return "Not provided";

    const addressParts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country,
    ].filter(Boolean);

    return addressParts.length > 0 ? addressParts.join(", ") : "Not provided";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Eye className="w-5 h-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-[#A76BCF]" />
            Customer Profile
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-[#A76BCF]/10 to-[#9155B8]/10 rounded-lg">
            {user.name && (
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-lg bg-[#A76BCF] text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge className={getStatusColor(user.role)}>{user.role}</Badge>
                <Badge
                  variant={user.emailVerified ? "default" : "secondary"}
                  className={
                    user.emailVerified
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {user.emailVerified ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Unverified
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#A76BCF]" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Email</span>
                </div>
                <p className="text-gray-900 break-all">{user.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Phone</span>
                </div>
                <p className="text-gray-900">{user.phone || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A76BCF]" />
              Address Information
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{formatAddress(user.address)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#A76BCF]" />
              Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Role</span>
                </div>
                <Badge className={getStatusColor(user.role)}>{user.role}</Badge>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">
                    Payment Method
                  </span>
                </div>
                <p className="text-gray-900 capitalize">
                  {user.paymentMethod || "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A76BCF]" />
              Verification Status
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {user.emailVerified ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">
                      Email Verified
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">
                      Email Not Verified
                    </span>
                  </>
                )}
              </div>
              {user.emailVerified && (
                <p className="text-sm text-gray-600 mt-1">
                  Verified on {formatDate(user.emailVerified)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A76BCF]" />
              Account Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-blue-900">Account Created</p>
                  <p className="text-sm text-blue-700">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-green-900">Last Updated</p>
                  <p className="text-sm text-green-700">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              className="bg-[#A76BCF] hover:bg-[#9155B8] flex items-center gap-2"
              onClick={() => {
                window.location.href = `mailto:${user.email}`;
              }}
            >
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
