import { Creation } from "@/types";
import { Prediction, Status } from "replicate";

export const creationConverter = {
  fromPrediction(prediction: Prediction): Creation {
    return {
      id: prediction.id,
      url: prediction?.output?.[prediction.output.length - 1] ?? '',
      status: match(prediction.status),
      createdAt: prediction.created_at,
      error: prediction.error as string,
    };
  }
};

function match(status: Status): Creation['status']
{
  switch(status) {
    case 'succeeded':
      return 'completed';
    case 'failed':
      return 'failed';
    case 'processing': case 'starting':
      return 'pending';
    default:
      console.error("unknown perdiction status", status);
      return 'unknown';
  }
}
