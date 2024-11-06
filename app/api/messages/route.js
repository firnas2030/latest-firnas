import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Message from '@/models/message';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    await connectToDB();
    const items = await Message.find({});
    return NextResponse.json({ messages: items }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
