import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";


const run = async () => {
    await connect();
}

run();

export async function POST(request: NextRequest) {
  try {

    //fetching data from frontend
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.table(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists!" }, { status: 400 });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log("user created:", savedUser);

    return NextResponse.json(
      {
        message: "User created successfully...",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
