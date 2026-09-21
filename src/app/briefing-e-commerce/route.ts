import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "briefing_feltec_e_commerce.html");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(fileContents, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    return new NextResponse("Briefing HTML file not found", { status: 404 });
  }
}
