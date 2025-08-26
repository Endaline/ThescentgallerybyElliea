"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  MapPin,
  Edit,
  Trash2,
  Home,
  Building,
  Check,
} from "lucide-react";

const addresses = [
  {
    id: "1",
    type: "Home",
    isDefault: true,
    name: "Jane Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    type: "Work",
    isDefault: false,
    name: "Jane Doe",
    street: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    phone: "+1 (555) 987-6543",
  },
];

export default function AddressesPage() {
  const [addressList, setAddressList] = useState(addresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      ...formData,
      isDefault: addressList.length === 0 ? true : formData.isDefault,
    };

    let updatedAddresses = [...addressList, newAddress];

    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === newAddress.id ? addr : { ...addr, isDefault: false }
      );
    }

    setAddressList(updatedAddresses);
    setIsAddingAddress(false);
    resetForm();
  };

  const handleEditAddress = (id: string) => {
    const address = addressList.find((addr) => addr.id === id);
    if (address) {
      setFormData(address);
      setEditingAddress(id);
    }
  };

  const handleUpdateAddress = () => {
    let updatedAddresses = addressList.map((addr) =>
      addr.id === editingAddress ? { ...formData, id: editingAddress } : addr
    );

    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === editingAddress ? addr : { ...addr, isDefault: false }
      );
    }

    setAddressList(updatedAddresses);
    setEditingAddress(null);
    resetForm();
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addressList.filter((addr) => addr.id !== id);
    setAddressList(updatedAddresses);
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addressList.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    setAddressList(updatedAddresses);
  };

  const resetForm = () => {
    setFormData({
      type: "Home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
  };

  const AddressForm = ({
    onSubmit,
    onCancel,
    submitText,
  }: {
    onSubmit: () => void;
    onCancel: () => void;
    submitText: string;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Address Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="street">Street Address</Label>
        <Textarea
          id="street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          placeholder="Enter street address"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            placeholder="Enter state"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            placeholder="Enter ZIP code"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) =>
            setFormData({ ...formData, isDefault: e.target.checked })
          }
          className="rounded border-gray-300"
        />
        <Label htmlFor="isDefault">Set as default address</Label>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button onClick={onSubmit} className="flex-1">
          {submitText}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              My Addresses
            </h1>
            <p className="text-gray-600">
              Manage your shipping and billing addresses
            </p>
          </div>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddingAddress(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddressForm
                onSubmit={handleAddAddress}
                onCancel={() => {
                  setIsAddingAddress(false);
                  resetForm();
                }}
                submitText="Add Address"
              />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addressList.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {address.type === "Home" ? (
                      <Home className="h-5 w-5 text-burgundy-600" />
                    ) : (
                      <Building className="h-5 w-5 text-burgundy-600" />
                    )}
                    <CardTitle className="text-lg">{address.type}</CardTitle>
                    {address.isDefault && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Dialog
                      open={editingAddress === address.id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingAddress(null);
                          resetForm();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAddress(address.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Address</DialogTitle>
                        </DialogHeader>
                        <AddressForm
                          onSubmit={handleUpdateAddress}
                          onCancel={() => {
                            setEditingAddress(null);
                            resetForm();
                          }}
                          submitText="Update Address"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-4 w-full"
                  >
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {addressList.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No addresses saved
          </h3>
          <p className="text-gray-600 mb-4">
            Add your first address to get started
          </p>
          <Button onClick={() => setIsAddingAddress(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </motion.div>
      )}
    </div>
  );
}
