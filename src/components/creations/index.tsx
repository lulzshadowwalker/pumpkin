'use client';

import { useCreations } from "@/context/creations-context";
import { Skeleton } from "../ui/skeleton";
import { Creation } from "@/types";
import { useEffect } from "react";
import { creationConverter } from "@/lib/converters/creation-converter";
import { Prediction } from "replicate";
import Image from 'next/image';
import { LoaderCircle } from "lucide-react";

export function Creations() {
  const { creations, loading } = useCreations();

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
    {
      loading ? (
        Array(12).fill(null).map((_, i) => <Skeleton key={i} className="aspect-square" />)
      ) : creations.map((creation) => <CreationCard key={creation.id} creation={creation} />)
    }
  </div>
}

export function CreationCard({ creation }: { creation: Creation }) {
  const { updateCreation } = useCreations();

  useEffect(() => {
    if (creation.status !== 'pending') return;

    const interval = setInterval(async () => {
      const response = await fetch("/api/predictions/" + creation.id);
      const prediction: Prediction = await response.json();
      if (response.status !== 200) {
        updateCreation(creationConverter.fromPrediction(prediction));
        console.error('failed to fetch prediction', prediction);
        return;
      }

      updateCreation(creationConverter.fromPrediction(prediction));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (creation.status === 'pending') {
    return <Skeleton className="aspect-square grid place-items-center">
      <LoaderCircle size={32} className="animate-spin text-black dark:text-white" />
    </Skeleton>
  }

  if (creation.status === 'failed' || creation.status === 'unknown') {
    return (
      <div
        className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100 flex flex-col items-center justify-center"
      >
        <p className="text-sm tracking-wide">😔 Failed to create image</p>
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
    >
      <Image
        src={creation.url ?? null}
        alt=""
        fill
      />
    </div>
  );
}
