import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/db';
import Page from '../../../../../models/page';
import { verifyToken } from '../../../../../lib/auth';
import { generateSEO } from '../../../../../lib/openai';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token); // You can skip this if it's an internal tool

    await connectToDatabase();

    const { id } = context.params;
    const page = await Page.findById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const seo = await generateSEO({
      title: page.title,
      content: page.content,
      category: page.category
    });

    page.meta_title = seo.meta_title;
    page.meta_description = seo.meta_description;
    page.keywords = seo.keywords;

    await page.save();

    return NextResponse.json({ message: 'SEO metadata generated', seo });
  } catch (error: any) {
    console.error('❌ SEO generation error:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
