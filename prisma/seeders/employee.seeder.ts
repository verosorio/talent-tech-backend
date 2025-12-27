import { PrismaClient } from '@prisma/client';

export async function seedEmployees(prisma: PrismaClient) {
  console.log('🌱 Seed de Employees...');

  const companies = await prisma.company.findMany({
    include: { departments: true },
  });

  if (companies.length === 0) {
    console.log('⚠️ No hay empresas para asignar empleados');
    return;
  }

  for (const company of companies) {
    const departments = company.departments;
    if (departments.length === 0) {
      console.log(`⚠️ No hay departamentos para ${company.name}, saltando...`);
      continue;
    }

    for (let i = 1; i <= 5; i++) {
      const firstName = `Empleado${i}`;
      const lastName = `${company.name.replace(/\s+/g, '')}`;
      const email = `employee${i}@${company.name.replace(/\s+/g, '').toLowerCase()}.com`;

      const department = departments[Math.floor(Math.random() * departments.length)];

      const hiredAt = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));

      const exists = await prisma.employee.findFirst({
        where: { companyId: company.id, email },
      });

      if (exists) {
        console.log(`⚠️ Employee ya existe: ${email}`);
        continue;
      }

      await prisma.employee.create({
        data: {
          firstName,
          lastName,
          email,
          companyId: company.id,
          departmentId: department.id,
          isActive: true,
          hiredAt,
        },
      });

      console.log(`✅ Employee creado: ${firstName} ${lastName} (${email})`);
    }
  }
}
