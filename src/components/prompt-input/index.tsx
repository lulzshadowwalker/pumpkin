'use client';

import { LoaderCircle, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { useCreations } from "@/context/creations-context";
import { creationConverter } from "@/lib/converters/creation-converter";
import { Prediction } from "replicate";

export function PromptInput() {
  const [loading, setLoading] = useState(false);
  const { addCreation } = useCreations();

  async function handleSubmit(e: FormEvent) {
    try {
      setLoading(true);

      e.preventDefault();

      const form = new FormData(e.target as HTMLFormElement);

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: form.get("prompt"),
        }),
      });
      const prediction: Prediction = await response.json();
      if (response.status !== 201) {
        console.error("failed to create creation", prediction);
      }

      addCreation(creationConverter.fromPrediction(prediction));
    } catch (e) {
      console.error("failed to create creation", e);
    } finally {
      setLoading(false);
    }
  };

  return <form
    className="mb-6 flex w-full items-center space-x-2"
    onSubmit={handleSubmit}
  >
    <Input
      type="prompt"
      name="prompt"
      placeholder="a horse with a really long nick"
    />
    <Button type="submit" disabled={loading}>
      Generate
      {
        loading ? <LoaderCircle size={16} className="animate-spin" /> :
          <Send size={16} />
      }
    </Button>
  </form>
}
