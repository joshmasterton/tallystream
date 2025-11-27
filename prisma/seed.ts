import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const user = await prisma.user.create({
    data: {
      email: "demo@tallystream.com",
      name: "Demo User",
      role: "ADMIN",
    },
  });

  const client = await prisma.client.create({
    data: {
      userId: user.id,
      company: "Acme Corp",
      contactName: "John Doe",
      email: "john@acme.com",
      phone: "+1-555-0100",
      address: "123 Main St, San Francisco, CA 94101",
      currency: "USD",
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      clientId: client.id,
      invoiceNumber: "INV-001",
      status: "DRAFT",
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      currency: "USD",
      subtotalCents: 100000, // $1000
      taxCents: 10000, // $100
      discountCents: 0,
      totalCents: 110000, // $1100
      notes: "Thank you for your business!",
      items: {
        create: [
          {
            description: "Web design services",
            quantity: 10,
            unitPriceCents: 10000, // $100/hr
            taxCents: 10000,
            totalCents: 100000,
          },
        ],
      },
    },
  });

  console.log("✅ Seed complete!");
  console.log(`  User: ${user.email}`);
  console.log(`  Client: ${client.company}`);
  console.log(`  Invoice: ${invoice.invoiceNumber}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });