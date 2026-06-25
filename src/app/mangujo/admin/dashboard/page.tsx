"use client";

import DashboardContainer from "@/feature/_admin/dashboard/container/DashboardContainer";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect role_id 3, 4, 5 to team-list since they can only access team list
    if (user?.role_id && [3, 4, 5].includes(user.role_id)) {
      router.replace("/mangujo/admin/team-list");
    }
  }, [user?.role_id, router]);

  // Don't render dashboard for role_id 3, 4, 5
  if (user?.role_id && [3, 4, 5].includes(user.role_id)) {
    return null;
  }

  return (
    <main>
      <DashboardContainer />
    </main>
  );
};

export default Page;
