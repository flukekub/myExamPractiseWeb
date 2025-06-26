import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await client.connect();
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  if (!user) return NextResponse.json({ error: "Email not found" }, { status: 401 });

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ token , role: user.role});
}