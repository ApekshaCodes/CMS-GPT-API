import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import Page from '../../../models/page';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const pages = [
      {
        title: "Top 10 Things to Do in Bali",
        content: "Bali offers a mix of adventure, beaches, temples, and nightlife...",
        category: "Travel"
      },
      {
        title: "How to Build a React App",
        content: "This guide walks through the basics of setting up and deploying a React application...",
        category: "Tech"
      },
      {
        title: "Healthy Meal Plans for Busy People",
        content: "Balancing nutrition and a tight schedule? Here's a guide to simple healthy meals...",
        category: "Health"
      }
    ];

    const inserted = await Page.insertMany(pages);
    return NextResponse.json({ message: 'Pages seeded', ids: inserted.map(p => p._id) });
  } catch (error) {
    console.error('❌ Error seeding pages:', error);
    return NextResponse.json({ error: 'Failed to seed pages' }, { status: 500 });
  }
}
