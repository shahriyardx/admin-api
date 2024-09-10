CREATE TABLE IF NOT EXISTS "admin_slashblogs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(512) NOT NULL,
	"slug" varchar(512) NOT NULL,
	"content" text NOT NULL,
	"status" "status" DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "admin_slashblogs_slug_unique" UNIQUE("slug")
);
