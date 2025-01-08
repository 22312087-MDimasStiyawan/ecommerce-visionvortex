import {PrismaClient} from "@prisma/client"

// Mendeklarasikan variabel global bernama `prisma`
declare global{
    var prisma: PrismaClient | undefined
}

// Membuat instans PrismaClient
const db = global.globalThis.prisma || new PrismaClient();
// Menyimpan instans PrismaClient ke `globalThis.prisma` 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db

export default db;
