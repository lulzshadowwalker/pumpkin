import { NextRequest, NextResponse } from "next/server";
import { replicate } from '@/lib/replicate';

export async function GET(request: NextRequest, context: any) {
  const { id } = await context.params;
  const prediction = await replicate.predictions.get(id);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}
