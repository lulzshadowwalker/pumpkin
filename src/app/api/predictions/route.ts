import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";

type Options = {
  model: string; 
  input: { prompt: string };
  webhook?: string;
  webhook_events_filter?: string[];
}
 
// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;
 
export async function POST(request: NextRequest) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }
 
  const { prompt } = await request.json();
  if (! prompt) {
    return NextResponse.json({ detail: 'prompt is required' }, { status: 400 });
  }
 
  const options: Options = {
    model: 'black-forest-labs/flux-schnell',
    input: { prompt }
  }
 
  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}/api/webhooks`
    options.webhook_events_filter = ["start", "completed"]
  }
 
  // A prediction is the result you get when you run a model, including the input, output, and other details
  const prediction = await replicate.predictions.create(options as any);
 
  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }
 
  return NextResponse.json(prediction, { status: 201 });
}
