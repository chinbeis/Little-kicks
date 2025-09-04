import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sizes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allSizes = await db.select().from(sizes);
    return NextResponse.json(allSizes);
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
