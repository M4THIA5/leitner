/*
  Warnings:

  - You are about to drop the `Flashcard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FlashcardToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE');

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_FlashcardToTag" DROP CONSTRAINT "_FlashcardToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_FlashcardToTag" DROP CONSTRAINT "_FlashcardToTag_B_fkey";

-- DropTable
DROP TABLE "Flashcard";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_FlashcardToTag";

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tag" TEXT,
    "category" "Category" NOT NULL DEFAULT 'FIRST',
    "lastAnsweredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
