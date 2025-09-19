"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Clock,
  ArrowLeft,
  Reply,
  Forward,
  Archive,
  Trash2,
  User,
  MessageSquare,
  Calendar,
  Tag,
} from "lucide-react";

interface ContactDetailsProps {
  contactId: number;
  onBack: () => void;
}

const ContactDetails = ({ contactId, onBack }: ContactDetailsProps) => {
  // Mock data - in real app, this would be fetched based on contactId
  const contact = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    subject: "Product Inquiry - Amber Mystique",
    message:
      "I'm interested in learning more about the Amber Mystique perfume. Could you provide more details about the scent notes? I've been looking for a warm, sophisticated fragrance for evening wear and this seems like it might be perfect. I'd also like to know about the longevity and projection of this particular scent. Additionally, do you offer sample sizes so I can try it before purchasing the full bottle? I'm particularly interested in understanding the base notes and how they develop over time. Thank you for your time and I look forward to hearing from you soon.",
    date: "2024-01-15 14:30",
    type: "Product Inquiry",
    status: "New",
    priority: "Medium",
    customerSince: "2023-08-15",
    previousOrders: 3,
    totalSpent: "$245.00",
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Product Inquiry":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Order Support":
        return "bg-green-100 text-green-800 border-green-200";
      case "Custom Service":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Returns":
        return "bg-red-100 text-red-800 border-red-200";
      case "Business":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#770a10]">
                Contact Details
              </h1>
              <p className="text-muted-foreground">
                View and manage contact inquiry
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Card */}
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{contact.subject}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(contact.type)}>
                        <Tag className="h-3 w-3 mr-1" />
                        {contact.type}
                      </Badge>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                      <Badge className={getPriorityColor(contact.priority)}>
                        {contact.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {contact.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">
                      Customer Message
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {contact.message}
                  </p>
                </div>

                <Separator />

                {/* Reply Section */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Reply to Customer
                  </h3>
                  <Textarea
                    placeholder="Type your response here..."
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2">
                    <Button className="bg-[#770a10] hover:bg-[#5a0810]">
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                    <Button variant="outline">
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer since {contact.customerSince}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#770a10]">
                      {contact.previousOrders}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Previous Orders
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#770a10]">
                      {contact.totalSpent}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Inquiry
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
