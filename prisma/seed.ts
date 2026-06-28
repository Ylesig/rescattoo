import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {

  await prisma.gato.deleteMany();

  await prisma.gato.createMany({
    data: [
      {
        nome_gato: "Luna",
        idade: "3 meses",
        sexo: "F",
        cor: "Branco",
        porte: "Pequeno",
        temperamento: "Calma",
        status: "Disponivel",
        historico_tratamento: "Vacinada"
      },
      {
        nome_gato: "Simba",
        idade: "5 meses",
        sexo: "M",
        cor: "Laranja",
        porte: "Médio",
        temperamento: "Brincalhão",
        status: "Disponivel",
        historico_tratamento: "Saudável"
      },
      {
        nome_gato: "Mimi",
        idade: "2 meses",
        sexo: "F",
        cor: "Cinza",
        porte: "Pequeno",
        temperamento: "Carinhosa",
        status: "Disponivel",
        historico_tratamento: "Vermifugada"
      }
    ]
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });