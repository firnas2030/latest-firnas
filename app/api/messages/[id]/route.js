import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Message from '@/models/message';

export const dynamic = 'force-dynamic';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const item = await Message.findById(params.id);
    if (!item)
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    return NextResponse.json({ message: item }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { firstName, lastName, email, phone, message } = await req.json();
  try {
    await connectToDB();
    // Find the existing prompt by ID
    const item = await Message.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    }
    // Update the Item with new data
    item.firstName = firstName;
    item.lastName = lastName;
    item.email = email;
    item.phone = phone;
    item.message = message;
    await item.save();
    return NextResponse.json(
      { message: 'Successfully updated the Item', message: item },
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
    await Message.findByIdAndRemove(params.id);
    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
