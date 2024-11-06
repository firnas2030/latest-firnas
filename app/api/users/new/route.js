import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const { name, email, password, role, status, city } = await req.json();

  console.log({
    name,
    email,
    password,
    role,
    status,
    city,
  });

  try {
    await connectToDB();
    const user = await User.findOne({ email: email }).select('-password');
    if (!user) {
      const item = new User({
        name,
        email,
        password,
        role,
        status,
        city,
      });

      await item.save();

      return NextResponse.json(
        { message: 'User created successfully', user: item },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: 'User already exist with this email.' },
      { status: 409 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
