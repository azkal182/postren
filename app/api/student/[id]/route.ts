import { db } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id; // 'a', 'b', or 'c'
    if (!id) {
        return NextResponse.json({ error: 'field id required!' });
    }
    const student = await db.master.findMany({
        where: {
            studentId: id,
        },
        include: {
            keluhans: true,
        },
    });

    return NextResponse.json({ id, data: student });
}
