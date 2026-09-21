-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");

-- Supabase auto-exposes every public table over PostgREST. Enabling RLS with no
-- policies makes the table unreachable via the anon/authenticated API keys.
-- Prisma connects as the database owner and bypasses RLS, so the route handler
-- is unaffected. Without this, contact submissions would be world-readable.
ALTER TABLE "ContactSubmission" ENABLE ROW LEVEL SECURITY;
