import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // Get file from FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert Buffer to Base64
    const imageBase64 = buffer.toString("base64");

    // Send image to Roboflow API
    const response = await axios.post(
      "https://detect.roboflow.com/tattoo-localization-and-recognition/39",
      imageBase64,
      {
        params: { api_key: "yPCypAvD9TLv0rgdqjHg" },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
