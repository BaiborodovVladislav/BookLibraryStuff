CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."route_enum" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('PENDING', 'APPOVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullname" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"university_id" integer NOT NULL,
	"university_card" varchar NOT NULL,
	"status" "status_enum" DEFAULT 'PENDING' NOT NULL,
	"role" "route_enum" DEFAULT 'USER' NOT NULL,
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_university_id_unique" UNIQUE("university_id"),
	CONSTRAINT "users_university_card_unique" UNIQUE("university_card")
);
