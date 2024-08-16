import { prisma } from '../../../prisma/schema.prisma'

export default async function handler(req, res) {
   switch (req.method) {
      case "POST":
         const {username, division, tribe, password} = req.body;
         try {
            const newUser = await prisma.sms_system_user.create({
               data: {
                  username,
                  division,
                  tribe,
                  password,
               },
            });
            res.status(201).json(newUser)
         } catch (error) {
            console.error('Error creating user:', error)
            res.status(200).json({error: 'Failed to craate users'})
         }
         break;
      case "GET":
         const {page = 1, pageSize = 5} = req.query

         try {
            const offset = (page - 1) * pageSize;
            const users = await prisma.sms_system_user.findMany({
               skip: offset,
               take: pageSize
            });

            const totalUsers = await prisma.user.count();

            const totalPages = Math.ceil(totalUsers / pageSize);

            res.status(200).json({
               users,
               currentPage: page,
               totalPages: totalPages,
               pageSize: pageSize,
               totalUsers: totalUsers
            })
         } catch (error) {
            console.error('Error creating user:', error)
            res.status(200).json({error: 'Failed to fetch users'})
         }
         break;
      default:
         res.status(405).json({error: 'Method Not Allowed'})
   }
}