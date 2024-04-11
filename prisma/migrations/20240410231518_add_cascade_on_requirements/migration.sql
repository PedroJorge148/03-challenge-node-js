-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_requirements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_requirements" ("id", "pet_id", "requirement") SELECT "id", "pet_id", "requirement" FROM "requirements";
DROP TABLE "requirements";
ALTER TABLE "new_requirements" RENAME TO "requirements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
