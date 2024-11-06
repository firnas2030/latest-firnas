import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id).select('-password');

    if (!user)
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { name, email, password, role, status, city } = await req.json();
  try {
    await connectToDB();
    // Find the existing prompt by ID
    const item = await User.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    }
    // Update the Item with new data
    item.name = name;
    item.email = email;
    if (password) {
      item.password = password;
    }
    item.role = role;
    item.status = status;
    item.city = city;
    await item.save();
    return NextResponse.json(
      { message: 'Successfully updated the Item', user: item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    // Find the item by ID and remove it
    await User.findByIdAndRemove(params.id);
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
