import React from "react";
import Tab from "./_components/tab";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#770a10]">Settings</h1>
        <p className="text-gray-600">
          Manage your store configuration and preferences
        </p>
      </div>
      <div>
        <Tab />
      </div>
      {children}
    </div>
  );
};

export default layout;
