import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import Page from '../../../models/page';
import { verifyToken } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    await connectToDatabase();

    const { updates } = await req.json();
    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Invalid format. Expected an array of updates.' }, { status: 400 });
    }

    const updatedPages = [];

    for (const update of updates) {
      const { id, ...fields } = update;
      if (!id) continue;

      const updated = await Page.findByIdAndUpdate(id, fields, { new: true });
      if (updated) {
        updatedPages.push(updated._id);
      }
    }

    return NextResponse.json({
      message: 'Bulk update complete',
      updatedPages
    });
  } catch (error: any) {
    console.error('❌ Bulk Edit Error:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
