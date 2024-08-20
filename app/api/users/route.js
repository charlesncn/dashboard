import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
   log: ['query', 'info', 'warn', 'error'],
});

// Handler for the POST request
export async function POST(req, res) {
   const { username, division, tribe, password } = await req.json(); // Since it's an async request

   try {
      const newUser = await prisma.sms_system_user.create({
         data: {
            username,
            division,
            tribe,
            password,
         },
      });
      return new Response(JSON.stringify(newUser), { status: 201 });
   } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
   }
}

// Handler for the GET request
export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get("page")) || 1;
   const pageSize = parseInt(searchParams.get("pageSize")) || 5;

   try {
      const offset = (page - 1) * pageSize;
      const users = await prisma.sms_system_user.findMany({
         skip: offset,
         take: pageSize,
      });

      const totalUsers = await prisma.sms_system_user.count();

      // Convert BigInt fields to string
      const usersWithStringId = users.map(user => ({
         ...user,
         id: user.id.toString(), // Convert BigInt to string
      }));

      const totalPages = Math.ceil(totalUsers / pageSize);

      return new Response(
         JSON.stringify({
            users: usersWithStringId,
            currentPage: page,
            totalPages: totalPages,
            pageSize: pageSize,
            totalUsers: totalUsers,
         }),
         { status: 200 }
      );
   } catch (error) {
      console.error('Error fetching users:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
   }
}

