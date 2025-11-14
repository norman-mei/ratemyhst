-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "district" TEXT,
    "ratingOverall" REAL NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "ratingLocation" REAL NOT NULL DEFAULT 0,
    "ratingSafety" REAL NOT NULL DEFAULT 0,
    "ratingReputation" REAL NOT NULL DEFAULT 0,
    "ratingOpportunities" REAL NOT NULL DEFAULT 0,
    "ratingHappiness" REAL NOT NULL DEFAULT 0,
    "ratingClubs" REAL NOT NULL DEFAULT 0,
    "ratingInternet" REAL NOT NULL DEFAULT 0,
    "ratingFacilities" REAL NOT NULL DEFAULT 0,
    "ratingSocial" REAL NOT NULL DEFAULT 0,
    "ratingFood" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_School" ("city", "createdAt", "district", "id", "name", "slug", "state", "updatedAt", "zipCode") SELECT "city", "createdAt", "district", "id", "name", "slug", "state", "updatedAt", "zipCode" FROM "School";
DROP TABLE "School";
ALTER TABLE "new_School" RENAME TO "School";
CREATE UNIQUE INDEX "School_slug_key" ON "School"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
