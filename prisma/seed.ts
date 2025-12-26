import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { seedCompanies } from './seeders/company.seeder';
import { seedDepartments } from './seeders/department.seeder';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Iniciando proceso de seed...\n');

  try {
    await seedCompanies(prisma);
    await seedDepartments(prisma);

    console.log('\n✅ Proceso de seed completado exitosamente');
  } catch (error) {
    console.error('\n❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Conexión a la base de datos cerrada');
  }
}

main();
