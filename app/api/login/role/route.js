import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const { token } = await req.json();

    try {
        // const response = await axios.post('https://stgapp.leadergroup.com/FirnasAPI/Login', null, {
        // const response = await axios.post('https://amanati.amana-md.gov.sa/FirnasAPI/Login', null, {
        //     headers: {
        //         Token: token,
        //     },
        // });

        // if (response.status === 200) {
        //     const userid = response.headers['userid']; // Replace with actual header name
        //     const token = response.headers['token']; // Replace with actual header name
        //     const tokenexpiry = response.headers['tokenexpiry']; // Replace with actual header name

        //     return NextResponse.json(
        //         { message: 'Login successful', userid, token, tokenexpiry },
        //         { status: 200 }
        //     );
        // } else {
        //     return NextResponse.json(
        //         { message: 'Login failed' },
        //         { status: 401 }
        //     );
        // }
            return NextResponse.json(
                { role:'Admin' },
                { status: 200 }
            );
    } catch (error) {
        return NextResponse.error(error.message, { status: 500 });
    }
};

