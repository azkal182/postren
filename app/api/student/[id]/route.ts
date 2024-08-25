import { db } from '../../../../lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id; // 'a', 'b', or 'c'
    if (!id) {
        return Response.json({ error: 'field id required!' });
    }
    const student = await db.master.findMany({
        where: {
            studentId: id,
        },
        include: {
            keluhans: true,
        },
    });

    return Response.json({ id, data: student });
}
