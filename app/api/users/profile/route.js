import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectToDB } from '@/utils/database';
import jwt from 'jsonwebtoken';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  const headersList = headers();
  try {
    await connectToDB();
    const token = headersList.get('authorization');
    console.log('token', token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken._id });
    return NextResponse.json({ profile: user }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
