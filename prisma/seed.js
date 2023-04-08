import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main () {
    // Criação dos Cargos
    for (let nome of ['assessor', 'coordenador'])
        for (let nucleo of ['NDP', 'NIP', 'NOE', 'NAV', 'NUT'])
            prisma.cargo.create({
                data: {
                    nome,
                    nucleo,
                }
            })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })