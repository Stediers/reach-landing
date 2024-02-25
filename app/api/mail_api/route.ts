import { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "helper_functions/mailService";
import { FormContent } from "@data/types";
import { NextRequest, NextResponse as Response } from "next/server";

// This is an example of how to send a server-side email
export async function POST(req: NextRequest) {
  //@ts-ignore
  const body = await req.json();
  try {
    if (!body) {
      throw new Error("Request body is undefined");
    }
    await sendMail({ content: body as FormContent });
    return Response.json({ message: "Email sent successfully" });
  } catch (err: any) {
    return Response.json({ error_code: 500, error_message: err.message });
  }
}
