"use client";

import React, { useEffect } from "react";
import AnnouncementContainer from "@/feature/_admin/annoucement/container/AnnouncementContainer";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect role_id 3, 4, 5 to team-list since they can only access team list
    if (user?.role_id && [3, 4, 5].includes(user.role_id)) {
      router.replace("/mangujo/admin/team-list");
    }
  }, [user?.role_id, router]);

  // Don't render announcement for role_id 3, 4, 5
  if (user?.role_id && [3, 4, 5].includes(user.role_id)) {
    return null;
  }

  return (
    <main>
      <AnnouncementContainer />
    </main>
  );
};

export default Page;
