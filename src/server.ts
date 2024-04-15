
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import {z} from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.get('/contact', async () => {
    const contact = await prisma.contact.findMany()

    return { contact }
})

app.post('/contact', async (request, reply) => {
    const createContactSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
    })
    const { name, email, phone} = createContactSchema.parse(request.body)

    await prisma.contact.create({
        data:{
            name,
            email,
            phone,
        }
    })
    return reply.status(200).send()
})

app.get('/doenca',async () => {
    const doenca = prisma.doencas.findMany()

    ret
})

app.listen({
    host: '0.0.0.0',
    port:process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('HTTP Server Running')
})