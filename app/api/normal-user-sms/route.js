import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
   const {pathParams} = new URL(req.url);
   const id = BigInt(pathParams.get("id"));
   const page = parseInt(pathParams.get("page")) || 1;
   const pageSize = parseInt(pathParams.get("pageSize")) || 5;

   try {
      const offset = (page - 1) * pageSize;

      const smsRecords = await prisma.smpp_client_table.findMany({
         where: {
            created_by: id,
         },
         skip: offset,
         take: pageSize,
      });

      const totalSmsRecords = await prisma.smpp_client_table.count({
         where: {
            created_by: id,
         },
      });

      const smsRecordsWithStringId = smsRecords.map(sms => ({
         ...sms,
         id: sms.id.toString(),
      }));

      const totalPages = Math.ceil(totalSmsRecords / pageSize);

      return new Response(
         JSON.stringify({
            sms: smsRecordsWithStringId,
            pagination: {
               currentPage: page,
               totalPages: totalPages,
               pageSize: pageSize,
               totalSmsRecords: totalSmsRecords,
            },
         }),
         {status: 200}
      );
   } catch (error) {
      console.error('Error fetching SMS records:', error);
      return new Response(JSON.stringify({error: 'Failed to fetch SMS records'}), {status: 500});
   }

}