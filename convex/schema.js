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
            city:v.string(),
            state:v.string(),
            country:v.string(),
        })
        ),
        interests:v.optional(v.array(v.string())),//min 3 interests

        freeEventsCreated: v.number(),
createdAt: v.date(),
updatedAt: v.date(),
    }).index("by_token",["tokenIdentifier"]),
    });
