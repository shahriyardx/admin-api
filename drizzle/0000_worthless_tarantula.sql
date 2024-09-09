DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('published', 'draft', 'unlisted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_portfolioblogs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(512) NOT NULL,
	"slug" varchar(512) NOT NULL,
	"content" text NOT NULL,
	"status" "status" DEFAULT 'published' NOT NULL,
	"categories" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "admin_portfolioblogs_slug_unique" UNIQUE("slug")
);
