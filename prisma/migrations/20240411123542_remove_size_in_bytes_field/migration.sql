/*
  Warnings:

  - You are about to drop the column `sizeInBytes` on the `uploads` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_uploads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    CONSTRAINT "uploads_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_uploads" ("fileUrl", "id", "pet_id", "storageKey", "title") SELECT "fileUrl", "id", "pet_id", "storageKey", "title" FROM "uploads";
DROP TABLE "uploads";
ALTER TABLE "new_uploads" RENAME TO "uploads";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
