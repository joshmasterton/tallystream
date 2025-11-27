import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientsContent } from "./ClientsContent";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <ClientsContent clients={clients} />
  );
}
