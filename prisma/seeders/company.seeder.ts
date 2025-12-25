import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedCompanies(prisma: PrismaClient) {
  console.log('🌱 Seed de Companies...');

  const passwordHash = await bcrypt.hash('Admin123!', 10);

  const companies = [
    {
      name: 'Acme Corp',
      email: 'admin@acme.com',
      password: passwordHash,
    },
    {
      name: 'Globex Corporation',
      email: 'admin@globex.com',
      password: passwordHash,
    },
  ];

  for (const company of companies) {
    const exists = await prisma.company.findUnique({
      where: { email: company.email },
    });

    if (exists) {
      console.log(`⚠️ Company ya existe: ${company.email}`);
      continue;
    }

    await prisma.company.create({ data: company });
    console.log(`✅ Company creada: ${company.name}`);
  }
}
