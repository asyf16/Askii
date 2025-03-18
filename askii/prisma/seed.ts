import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    auth0_id: 'test1',
    sessions: {
      create: [
        {
          date: new Date('2025-03-18T15:00:00.000Z'),
          question: { // Use "question" here instead of "questions"
            create: [
              {
                category: 'Resume',
                prompt: 'What is your greatest achievement?',
                response: 'I improved efficiency by 20% at my last job.',
                rating: 'GOOD',
              }
            ]
          }
        },
        {
          date: new Date('2025-03-19T15:00:00.000Z'),
          question: { // Use "question" here instead of "questions"
            create: [
              {
                category: 'Resume',
                prompt: 'What is your greatest achievement?',
                response: 'I improved efficiency by 20% at my last job.',
                rating: 'GOOD',
              }
            ]
          }
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    auth0_id: 'test2',
    sessions: {
      create: [
        {
          date: new Date('2025-03-20T15:00:00.000Z'),
          question: { // Use "question" here instead of "questions"
            create: [
              {
                category: 'Technical',
                prompt: 'How would you describe polymorphism?',
                response: 'Polymorphism allows for methods to do different things based on the object it is acting on.',
                rating: 'GOOD',
              }
            ]
          }
        },
      ],
    },
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }

  console.log('Dummy users, sessions, and questions have been created.')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
