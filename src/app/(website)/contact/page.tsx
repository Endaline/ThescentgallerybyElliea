"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { submitContact } from "@/app/actions/contact.action";
import { contactFormSchema, ContactFormValues } from "@/lib/validators";

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState({
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      // newsletter: false,
    },
  });

  const [state, formAction, pending] = useActionState(submitContact, {
    success: false,
    message: "",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      const result = await submitContact(null, formData); // call action directly
      setResult(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  if (result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 border border-purple-100 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            Message Sent!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. We&apos;ll get back to you within 24
            hours.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setResult({ success: false, message: "" })}
            className="bg-gradient-to-r from-[#770a10] to-purple-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl"></div>

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-[#770a10] to-purple-600 bg-clip-text text-transparent"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re here to help you find your perfect scent. Reach out and
            we&apos;ll make magic happen.
          </motion.p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-light text-gray-800 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Visit Us At
                    </h3>
                    <p className="text-gray-600">
                      No 2 geodetic road Rumuobiakani beside shell IA
                      <br />
                      Port harcourt, Rivers State
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Call Us
                    </h3>
                    <p className="text-gray-600">+2349069521083</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <Link href="mailto:Thescentgallerybyelliea@gmail.com">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Email Us
                    </h3>
                    <p className="text-gray-600">
                      Thescentgallerybyelliea@gmail.com
                    </p>
                  </Link>
                </motion.div>

                {/* Hours */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Business Hours
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Mon - Fri</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>12:00 PM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-light text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, color: "hover:text-pink-600" },
                  { icon: Facebook, color: "hover:text-blue-600" },
                  { icon: Twitter, color: "hover:text-blue-400" },
                  { icon: MessageCircle, color: "hover:text-green-500" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 transition-colors duration-300 border border-white/20"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-[#770a10] to-purple-600 rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-light text-gray-800">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#770a10] focus:border-[#770a10] outline-none ${
                    errors.fullName ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#770a10] focus:border-[#770a10] outline-none ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-300 focus:ring-2 focus:ring-[#770a10] focus:border-[#770a10] outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register("subject")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#770a10] focus:border-[#770a10] outline-none ${
                    errors.subject ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  {...register("message")}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-[#770a10] focus:border-[#770a10] outline-none resize-none ${
                    errors.message ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Newsletter Checkbox */}
              {/* <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("newsletter")}
                  className="w-5 h-5 rounded border-gray-300 text-[#770a10] focus:ring-[#770a10] mt-1"
                  id="newsletter"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Subscribe to our newsletter for exclusive fragrance releases
                  and special offers
                </label>
              </div> */}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#770a10] to-purple-600 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {state.message && (
                <p
                  className={`text-center ${state.success ? "text-green-600" : "text-red-500"}`}
                >
                  {state.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-10 right-10 opacity-10">
        <Heart className="w-24 h-24 text-[#770a10]" />
      </div>
    </div>
  );
}
