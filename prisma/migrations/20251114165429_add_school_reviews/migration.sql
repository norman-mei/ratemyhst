-- CreateTable
CREATE TABLE "SchoolReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schoolId" TEXT NOT NULL,
    "overall" REAL NOT NULL,
    "location" REAL NOT NULL,
    "safety" REAL NOT NULL,
    "reputation" REAL NOT NULL,
    "opportunities" REAL NOT NULL,
    "happiness" REAL NOT NULL,
    "clubs" REAL NOT NULL,
    "internet" REAL NOT NULL,
    "facilities" REAL NOT NULL,
    "social" REAL NOT NULL,
    "food" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SchoolReview_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
