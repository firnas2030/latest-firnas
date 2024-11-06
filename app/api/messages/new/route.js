import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Message from '@/models/message';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const { firstName, lastName, email, phone, message } = await req.json();

  try {
    await connectToDB();
    const item = new Message({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    await item.save();

    return NextResponse.json(
      { message: 'Message Send Successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
