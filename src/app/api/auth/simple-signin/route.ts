import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import userLogin from "@/libs/api/userLogin";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await client.connect();
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  if (!user) return NextResponse.json({ error: "Email not found" }, { status: 401 });

  const loginResponse = await userLogin(email);
  const token = loginResponse.token;


  return NextResponse.json({ token , role: user.role});
}