"use server";

import { Creation } from "@/types";
import { db } from "../db";
import { auth } from "../auth";

export async function createCreation(creation: Creation) {
  const session = await auth();

  try {
    const newCreation = await db.creation.create({
      data: {
        id: creation.id,
        url: creation.url,
        status: creation.status,
        createdAt: new Date(creation.createdAt),
        error: creation.error,
        userId: session!.user.id,
      },
    });
    return { success: true, data: newCreation };
  } catch (error) {
    return { success: false, error: "Failed to create creation" };
  }
}

export async function updateCreation(creation: Creation) {
  try {
    const updatedCreation = await db.creation.update({
      where: { id: creation.id },
      data: {
        url: creation.url,
        status: creation.status,
        createdAt: new Date(creation.createdAt),
        error: creation.error,
      },
    });
    return { success: true, data: updatedCreation };
  } catch (error) {
    return { success: false, error: "Failed to update creation" };
  }
}

export async function getCreationsByUser(userId: string) {
  try {
    const creations = await db.creation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, 
    });

    return { success: true, data: creations };
  } catch (error) {
    return { success: false, error: "Failed to fetch creations" };
  }
}
