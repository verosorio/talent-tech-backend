import { PrismaClient } from '@prisma/client';

export async function seedDepartments(prisma: PrismaClient) {
  console.log('🌱 Seed de Departments...');
  const companies = await prisma.company.findMany();

  if (companies.length === 0) {
    console.log('⚠️ No hay empresas para asignar departamentos');
    return;
  }
  
  const departmentTemplates = [
    { name: 'Recursos Humanos', description: 'Gestiona el talento humano' },
    { name: 'IT', description: 'Tecnología e infraestructura' },
    { name: 'Marketing', description: 'Estrategia de marketing' },
  ];

  for (const company of companies) {
    for (const dep of departmentTemplates) {
      const exists = await prisma.department.findFirst({
        where: { companyId: company.id, name: dep.name },
      });

      if (exists) {
        console.log(`⚠️ Department ya existe: ${dep.name} para ${company.name}`);
        continue;
      }

      await prisma.department.create({
        data: {
          name: dep.name,
          description: dep.description,
          companyId: company.id,
        },
      });

      console.log(`✅ Department creado: ${dep.name} para ${company.name}`);
    }
  }
}
