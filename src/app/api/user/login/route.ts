import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const run = async () => {
    await connect();
}

run();

export async function POST(request: NextRequest) {

    try {

        //fetching data from frontend
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if the user exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        //validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', validPassword);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password!" }, { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        });

        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error: any) {
        console.log("Error logging user: ", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }

}
