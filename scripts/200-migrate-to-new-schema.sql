-- Drop old tables if they exist
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS entity_technologies CASCADE;
DROP TABLE IF EXISTS technologies CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS resume_skills CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS educations CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS about_stats CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS page_status CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS stats CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS social_media CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS blog CASCADE;

-- Colors table (must be created first as FK target)
CREATE TABLE "colors" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"code" char(7)
);

-- Admins
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY,
	"email" varchar(255) NOT NULL CONSTRAINT "admins_email_key" UNIQUE,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Admin sessions
CREATE TABLE "admin_sessions" (
	"id" serial PRIMARY KEY,
	"admin_id" integer NOT NULL,
	"token" varchar(255) NOT NULL CONSTRAINT "admin_sessions_token_key" UNIQUE,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "admin_sessions_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE
);

-- Profile
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY,
	"name" text,
	"job_title_1" text,
	"job_title_2" text,
	"email" varchar(100),
	"phone_number" varchar(20),
	"location" text,
	"hero_description" text,
	"description" text,
	"special_description" text,
	"quote" varchar(150),
	"resume_url" varchar,
	"calendly_url" varchar,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Page status
CREATE TABLE "page_status" (
	"id" serial PRIMARY KEY,
	"key" text NOT NULL CONSTRAINT "page_status_key_key" UNIQUE,
	"name" text,
	"status" boolean DEFAULT true,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Categories (for projects and skills)
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "categories_name_key" UNIQUE,
	"slug" text NOT NULL CONSTRAINT "categories_slug_key" UNIQUE,
	"description" text,
	"sort_order" integer CONSTRAINT "categories_sort_order_key" UNIQUE,
	"status" boolean DEFAULT true,
	"color_id" integer DEFAULT 1,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "categories_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Technologies
CREATE TABLE "technologies" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL CONSTRAINT "technologies_name_key" UNIQUE,
	"slug" text CONSTRAINT "technologies_slug_key" UNIQUE,
	"icon" text,
	"color_id" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "technologies_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Projects
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL CONSTRAINT "projects_slug_key" UNIQUE,
	"description" text NOT NULL,
	"hero_description" text,
	"category_id" integer NOT NULL,
	"project_url" text,
	"linkedin_url" text,
	"project_date" date,
	"featured" boolean DEFAULT false,
	"sort_order" integer CONSTRAINT "projects_sort_order_key" UNIQUE,
	"image_url" text,
	"presentation_url" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "projects_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);

-- Entity technologies (link technologies to projects, services, etc)
CREATE TABLE "entity_technologies" (
	"id" serial PRIMARY KEY,
	"entity_type" text NOT NULL,
	"entity_id" integer NOT NULL,
	"technology_id" integer NOT NULL,
	CONSTRAINT "entity_technologies_unique" UNIQUE("entity_type","entity_id","technology_id"),
	CONSTRAINT "entity_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE CASCADE
);

-- Services
CREATE TABLE "services" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"description" text,
	"icon" varchar(100),
	"color_id" integer DEFAULT 1,
	"features" text[],
	"status" boolean DEFAULT true,
	"sort_order" integer CONSTRAINT "services_sort_order_key" UNIQUE,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "services_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Skills
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text,
	"category_id" integer,
	"color_id" integer DEFAULT 1,
	"icon" text,
	"status" boolean DEFAULT true,
	"sort_order" integer CONSTRAINT "skills_sort_order_key" UNIQUE,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "skills_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id"),
	CONSTRAINT "skills_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Experience
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY,
	"job_title" text NOT NULL,
	"company" text NOT NULL,
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date,
	"logo" text,
	"status" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Education
CREATE TABLE "education" (
	"id" serial PRIMARY KEY,
	"title" text,
	"university" text,
	"degree" varchar(50),
	"start_date" date NOT NULL,
	"end_date" date,
	"status" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Certifications
CREATE TABLE "certifications" (
	"id" serial PRIMARY KEY,
	"title" text,
	"issuer" text,
	"issuer_date" date,
	"url" text,
	"description" text,
	"status" boolean DEFAULT true,
	"sort_order" integer CONSTRAINT "certifications_sort_order_key" UNIQUE,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Clients
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY,
	"name" text,
	"website" text,
	"rating" integer DEFAULT 5,
	"logo" text,
	"description" text,
	"status" boolean DEFAULT true
);

-- Stats
CREATE TABLE "stats" (
	"id" serial PRIMARY KEY,
	"title" text,
	"value" integer,
	"description" text,
	"icon" text,
	"color_id" integer DEFAULT 1,
	"sort_order" integer CONSTRAINT "stats_sort_order_key" UNIQUE,
	"status" boolean DEFAULT true,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "stats_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Social media
CREATE TABLE "social_media" (
	"id" serial PRIMARY KEY,
	"platform" text NOT NULL,
	"url" text,
	"color_id" integer DEFAULT 1,
	"sort_order" integer CONSTRAINT "social_media_sort_order_key" UNIQUE,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "social_media_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Blog
CREATE TABLE "blog" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"hero_description" varchar(200),
	"description" text,
	"background" text,
	"color_id" integer DEFAULT 1,
	"status" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "blog_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id")
);

-- Settings
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY,
	"admin_limit" integer DEFAULT 2,
	"dashboard_status" boolean DEFAULT true,
	"open_to_work" boolean DEFAULT true,
	"official_color_id" integer DEFAULT 1,
	"notifications" jsonb,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "settings_color_id_fkey" FOREIGN KEY ("official_color_id") REFERENCES "colors"("id")
);

-- Create additional indexes for performance
CREATE INDEX IF NOT EXISTS "idx_entity_technologies_lookup" ON "entity_technologies" ("entity_type","entity_id");
CREATE INDEX IF NOT EXISTS "idx_entity_technologies_technology" ON "entity_technologies" ("technology_id");
CREATE INDEX IF NOT EXISTS "idx_projects_category_id" ON "projects" ("category_id");
CREATE INDEX IF NOT EXISTS "idx_skills_status" ON "skills" ("status");
CREATE INDEX IF NOT EXISTS "idx_admin_sessions_admin_id" ON "admin_sessions" ("admin_id");

-- Insert default colors
INSERT INTO colors (name, code) VALUES 
('Blue', '#3B82F6'),
('Red', '#EF4444'),
('Green', '#10B981'),
('Purple', '#A855F7'),
('Yellow', '#F59E0B'),
('Pink', '#EC4899'),
('Cyan', '#06B6D4'),
('Gray', '#6B7280');

-- Insert initial settings
INSERT INTO settings (admin_limit, dashboard_status, open_to_work, official_color_id) VALUES (2, true, true, 1);

-- Insert initial page status
INSERT INTO page_status (key, name, status) VALUES
('about_page', 'About Page', true),
('projects_page', 'Projects Page', true),
('services_page', 'Services Page', true),
('contact_page', 'Contact Page', true),
('blog_section', 'Blog Section', false);
