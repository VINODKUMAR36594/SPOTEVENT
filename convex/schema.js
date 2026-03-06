import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // USERS
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),

    hasCompletedOnboarding: v.boolean(),

    location: v.optional(
      v.object({
        city: v.string(),
        state: v.string(),
        country: v.string(),
      })
    ),

    interests: v.optional(v.array(v.string())),

    freeEventsCreated: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),

  // EVENTS
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),

    organizerId: v.id("users"),
    organizerName: v.string(),

    category: v.string(),
    tags: v.array(v.string()),

    startDate: v.number(),
    endDate: v.number(),

    // fast fix
    timeZone: v.optional(v.string()),

    locationType: v.union(
      v.literal("physical"),
      v.literal("online")
    ),

    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    country: v.optional(v.string()),

    capacity: v.number(),

    ticketType: v.union(
      v.literal("free"),
      v.literal("paid")
    ),

    ticketPrice: v.optional(v.number()),
    registrationCount: v.number(),

    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organizer", ["organizerId"])
    .index("by_category", ["category"])
    .index("by_startDate", ["startDate"])
    .index("by_tags", ["tags"])
    .index("by_slug", ["slug"], { unique: true })
    .searchIndex("search", {
      searchField: "title",
      filterFields: ["category"],
    }),

  // REGISTRATIONS
  registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),

    attendeeName: v.string(),
    attendeeEmail: v.string(),

    qrCode: v.string(),

    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    status: v.union(
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("pending")
    ),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_qrCode", ["qrCode"], { unique: true })
    .index("by_event_user", ["eventId", "userId"], { unique: true }),
});