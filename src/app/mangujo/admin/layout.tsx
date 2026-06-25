import { AdminContainer } from "@/shared/_admin/container/AdminContainer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminContainer>{children}</AdminContainer>;
}
