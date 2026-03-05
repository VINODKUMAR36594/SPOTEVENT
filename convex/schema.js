import { defineSchema, defineTable } from "convex/server";
// import { de } from "date-fns/locale";
import { v } from "convex/values";

export default defineSchema({
  //user table
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(), //for clerk integration
    email: v.string(),
    imageUrl: v.optional(v.string()), //for clerk integration

    //oboaaridng
    hasCompletedOnboarding: v.boolean(),
    //location
    location: v.optional(
      v.object({
        city: v.string(),
        state: v.string(),
        country: v.string(),
      }),
    ),
    interests: v.optional(v.array(v.string())), //min 3 interests

    freeEventsCreated: v.number(),
    createdAt: v.date(),
    updatedAt: v.date(),
  }).index("by_token", ["tokenIdentifier"]),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    //orgainzer
    organizerId: v.id("users"),
    organizerName: v.string(),

    //event details
    category: v.string(),
    tags: v.array(v.string()),

    //date
    startDate: v.number(),
    endDate: v.number(),
    timeZone: v.string(),
    //location
    locationType: v.union(v.literal("physical"), v.literal("online")),
    venune: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    country: v.optional(v.string()),
    //capacity
    capacity: v.number(),
    ticketType: v.union(v.literal("free"), v.literal("paid")),
    ticketPrice: v.optional(v.number()),
    registerationCount: v.number(),
    //customaiztions
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    //  timestamps
    createdAt: v.date(),
    updatedAt: v.date(),
    //ticketing
  })
    .index("by_organizer", ["organizerId"])
    .index("by_category", ["category"])
    .index("by_startDate", ["startDate"])
    .index("by_tags", ["tags"])
    .index("by_slug", ["slug"], { unique: true })
    .searchIndex("search", ["title", "description"]),

  registerations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),
    //attendedn info
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    //qr code
    qrCode: v.string(), //unqie
    // chekcin
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    //status
    status: v.union(
      v.literal("confrimed"),
      v.literal("cancelled"),
      v.literal("pending"),
    ),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_qrCode", ["qrCode"], { unique: true })
    .index("by_event_user", ["eventId", "userId"], { unique: true }),

});
