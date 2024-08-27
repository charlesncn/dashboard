import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
   try {
      // Fetch the last 10 created users
      const last10Users = await prisma.sms_system_user.findMany({
         orderBy: {
            created_at: 'desc',
         },
         take: 10,
      });

      // Fetch SMS counts grouped by created_by (user IDs)
      const smsCounts = await prisma.smpp_client_table.groupBy({
         by: ['created_by'],
         _count: {
            created_by: true,
         },
      });

      // Create a map of user IDs to SMS counts
      const smsCountMap = smsCounts.reduce((map, item) => {
         map[item.created_by] = item._count.created_by;
         return map;
      }, {});

      // Combine user data with SMS counts
      const data = last10Users.map(user => ({
         username: user.username,
         created_at: user.created_at,
         role: user.role,
         sms_sent: smsCountMap[user.id] || 0,
      }));

      // Respond with the combined data
      return new Response(JSON.stringify({data}), {status: 200});
   } catch (error) {
      console.error('Error fetching users:', error);
      return new Response(JSON.stringify({error: 'Failed to fetch users'}), {status: 500});
   }
}
