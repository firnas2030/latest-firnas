import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Ticket from '@/models/ticket';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    await connectToDB();
    const items = await Ticket.find({});
    return NextResponse.json({ tickets: items }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
