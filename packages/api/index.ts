import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.findMany({

})
  .then(e => {
    console.log(e)
  })
  .catch(e => {
    console.error(e)
  })
  .finally(() => {
    console.log('end query')
  })
