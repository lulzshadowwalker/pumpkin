-- CreateTable
CREATE TABLE "Creation" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Creation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Creation" ADD CONSTRAINT "Creation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
