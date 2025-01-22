
import { integer, varchar, date, text, pgTable, uuid, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status_enum', ['PENDING', 'APPOVED', 'REJECTED'])
export const ROLE_ENUM = pgEnum('route_enum', ['USER', 'ADMIN'])
export const BORROW_STATUS= pgEnum('borrow_status', ['BORROWED', 'RETURNED']) 

export const users = pgTable("users", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar('fullname', {length: 255}).notNull(),
  email:text('email').notNull().unique(),
  password: text('password').notNull(),
  universityId: integer('university_id').notNull().unique(),
  universityCard: text('university_card').notNull().unique(),
  status: STATUS_ENUM('status').default('PENDING'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
created: timestamp('created_at' , {withTimezone: true}).defaultNow(),



});
