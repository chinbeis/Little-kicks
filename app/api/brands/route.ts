import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { brands } from '@/db/schema';

export async function GET() {
  try {
    const allBrands = await db.select().from(brands);
    return NextResponse.json(allBrands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
