import { formatDateTime } from "@/lib/utils";
import { ShippingAddressSchema } from "@/lib/validators";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const UserProfile = ({ user }: { user: User }) => {
  const address = user.address as ShippingAddressSchema;
  return (
    <div className="grid lg:grid-cols-2 gap-4 my-20">
      <div className="bg-white p-4 w-full rounded dark:bg-ligth-main">
        <div className="flex-between pb-0.5 flex-col md:flex-row">
          <p className="text-sm font-semibold">Your Profile</p>

          <p className="text-xs">
            Joined {formatDateTime(user.createdAt).dateOnly}
          </p>
        </div>

        <div className="py-3 border-b  flex justify-center lg:justify-start">
          <Image
            src={user.image ?? "/avatar.png"}
            alt=" User Logo"
            width={6000}
            height={6000}
            className="w-20 rounded-full"
          />
        </div>

        <div className="flex-between pt-2 flex-col md:flex-row">
          <p className="text-sm font-semibold">{user.name}</p>

          {/* <Button className="h-6">
            <PencilLineIcon className="w-4 h-4" /> Edit
          </Button> */}
        </div>
      </div>
      <div className="bg-white p-4 w-full rounded dark:bg-ligth-main">
        <p className="text-sm font-semibold">Address</p>

        <div className="flex mt-3">
          <div className="text-[10px] px-2 py-0.5 bg-sec-main/20 text-sec-main font-semibold rounded-full">
            Primary
          </div>
        </div>

        <p className="text-xs mt-3 lg:w-1/2 font-semibold">
          {address?.streetAddress} {address?.city}, {address?.postalCode}{" "}
          {address?.lga} {address?.country}{" "}
        </p>
      </div>

      <div className="bg-white p-4 w-full rounded dark:bg-ligth-main">
        <p className="text-sm font-semibold">Emails</p>

        <div className="flex mt-3">
          <div className="text-[10px] px-2 py-0.5 bg-sec-main/20 text-sec-main font-semibold rounded-full">
            Primary
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold">{user.email}</p>
        </div>
      </div>

      <div className="bg-white p-4 w-full rounded dark:bg-ligth-main">
        <p className="text-sm font-semibold">Phone Number</p>

        <div className="flex mt-3">
          <div className="text-[10px] px-2 py-0.5 bg-sec-main/20 text-sec-main font-semibold rounded-full">
            Primary
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold">{user.phone}</p>
        </div>
        {/* <div className="mt-2">
          <p className="text-xs font-semibold">09998878776</p>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
