"use client";

import { useState } from "react";
import ContactDetails from "../contactdetails";

export default function ContactPage() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );

  if (selectedContactId) {
    return (
      <ContactDetails
        contactId={selectedContactId}
        onBack={() => setSelectedContactId(null)}
      />
    );
  }
}
