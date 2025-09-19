import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  Clock,
  Search,
  Eye,
  Reply,
  Trash2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactsDashboard = () => {
  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Product Inquiry - Amber Mystique",
      message:
        "I'm interested in learning more about the Amber Mystique perfume. Could you provide more details about the scent notes?",
      date: "2024-01-15 14:30",
      type: "Product Inquiry",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@company.com",
      phone: "+1 (555) 987-6543",
      subject: "Order Status Question",
      message:
        "Hello, I placed an order last week (#3421) and haven't received a shipping confirmation yet. Could you please check the status?",
      date: "2024-01-15 11:22",
      type: "Order Support",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@gmail.com",
      phone: "+1 (555) 456-7890",
      subject: "Custom Perfume Request",
      message:
        "I'm looking for a custom fragrance for my wedding. Do you offer personalized scent creation services?",
      date: "2024-01-14 16:45",
      type: "Custom Service",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 321-0987",
      subject: "Return Request",
      message:
        "I received my order but the fragrance doesn't match what I expected. I'd like to return it and get a refund.",
      date: "2024-01-14 09:15",
      type: "Returns",
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa.garcia@company.org",
      phone: "+1 (555) 654-3210",
      subject: "Wholesale Partnership",
      message:
        "We're a boutique chain interested in carrying your products. Could we discuss wholesale opportunities?",
      date: "2024-01-13 13:20",
      type: "Business",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#770a10]">
                Contacts Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage customer inquiries and messages
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Contacts Table */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>Contact Messages</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground">
                          {contact.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                          {contact.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {contact.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span>{contact.phone}</span>
                    </TableCell>
                    <TableCell>
                      <span>{contact.email}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {contact.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactsDashboard;
