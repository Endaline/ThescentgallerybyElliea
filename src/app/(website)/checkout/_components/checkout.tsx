"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cart, User } from "@prisma/client";

export default function CheckoutPage({
  cart,
  userInfo,
}: {
  cart: Cart | undefined;
  userInfo: User;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
    newsletter: false,
  });

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Midnight Rose",
      brand: "Luxe Parfum",
      price: 189,
      size: "50ml",
      quantity: 2,
      image: "/placeholder.svg?height=100&width=75",
    },
    {
      id: 2,
      name: "Golden Amber",
      brand: "Luxe Parfum",
      price: 165,
      size: "100ml",
      quantity: 1,
      image: "/placeholder.svg?height=100&width=75",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      window.location.href = "/order-confirmation";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-charcoal hover:text-[#A76BCF]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-charcoal">
              Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-[#A76BCF] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      step >= stepNumber ? "text-[#A76BCF]" : "text-gray-500"
                    }`}
                  >
                    {stepNumber === 1 && "Information"}
                    {stepNumber === 2 && "Shipping"}
                    {stepNumber === 3 && "Payment"}
                  </span>
                  {stepNumber < 3 && (
                    <div className="w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#A76BCF] text-white rounded-full flex items-center justify-center text-sm">
                            1
                          </span>
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) =>
                                handleInputChange("city", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={formData.state}
                              onChange={(e) =>
                                handleInputChange("state", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) =>
                              handleInputChange(
                                "newsletter",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="newsletter" className="text-sm">
                            Subscribe to our newsletter for exclusive offers
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Shipping Method */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-[#A76BCF]" />
                          Shipping Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={formData.shippingMethod}
                          onValueChange={(value) =>
                            handleInputChange("shippingMethod", value)
                          }
                        >
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="standard" id="standard" />
                            <div className="flex-1">
                              <Label htmlFor="standard" className="font-medium">
                                Standard Shipping
                              </Label>
                              <p className="text-sm text-gray-600">
                                5-7 business days
                              </p>
                            </div>
                            <span className="font-medium text-green-600">
                              Free
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="express" id="express" />
                            <div className="flex-1">
                              <Label htmlFor="express" className="font-medium">
                                Express Shipping
                              </Label>
                              <p className="text-sm text-gray-600">
                                2-3 business days
                              </p>
                            </div>
                            <span className="font-medium">₦15.00</span>
                          </div>

                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="overnight" id="overnight" />
                            <div className="flex-1">
                              <Label
                                htmlFor="overnight"
                                className="font-medium"
                              >
                                Overnight Shipping
                              </Label>
                              <p className="text-sm text-gray-600">
                                Next business day
                              </p>
                            </div>
                            <span className="font-medium">₦25.00</span>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-[#A76BCF]" />
                          Payment Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              handleInputChange("cardNumber", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) =>
                                handleInputChange("expiryDate", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) =>
                                handleInputChange("cvv", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={(e) =>
                              handleInputChange("nameOnCard", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveInfo"
                            checked={formData.saveInfo}
                            onCheckedChange={(checked) =>
                              handleInputChange("saveInfo", checked as boolean)
                            }
                          />
                          <Label htmlFor="saveInfo" className="text-sm">
                            Save payment information for future purchases
                          </Label>
                        </div>

                        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                          <Shield className="h-5 w-5 text-green-600" />
                          <p className="text-sm text-green-800">
                            Your payment information is encrypted and secure
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white ml-auto"
                    size="lg"
                  >
                    {step === 3 ? "Complete Order" : "Continue"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {item.brand} • {item.size}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₦{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₦{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
