import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const { email, password } = await req.json();
  try {
    await connectToDB();
    var user = await User.findOne({email}).exec();
    console.log(user+'user-------');
    // var user = await User.findUserByCredentials(email, password);

  
 
    if (!user) {
      return NextResponse.json(
        { message: 'Email or password is incorrect' },
        { status: 401 }
      );
    } else {

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log(password+'password--------------')
        console.log(user.password+'user.password--------------')
        if(!isPasswordMatched){
            return NextResponse.json(
                { message: 'password Does not match ' },
                { status: 422 }
              );
        }
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
              expiresIn: '30d',
            }
          );   

      return NextResponse.json(
        { message: 'Login successfull' ,token},
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
