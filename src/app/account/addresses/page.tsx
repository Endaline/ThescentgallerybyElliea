"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MapPin, Edit, Trash2 } from "lucide-react";
import { CreateAddressForm } from "./components/addressform";
import { Address } from "./components/schema";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      firstName: "John",
      lastName: "Doe",
      company: "",
      phone: "+1 (555) 123-4567",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "US",
    },
  ]);

  return (
    <div className="py-20 max-content padding-x">
      <div className="flex items-center gap-60 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-balance">My Addresses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your saved addresses for faster checkout
          </p>
        </div>
        <CreateAddressForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {addresses.map((address) => (
          <Card key={address.id} className="relative bg-slate-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {address.label}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Edit className="h-4 w-4 mr-2" />

                  <Trash2 className="h-4 w-4 mr-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && (
                  <p className="text-muted-foreground">{address.company}</p>
                )}
                <p className="text-muted-foreground">{address.phone}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
