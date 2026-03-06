import { query } from "./_generated/server";
import { v } from "convex/values";

export const getFeaturedEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_startDate")
      .filter((event) => event.gte(event.field("startDate"), now))
      .order("desc")
      .collect();

    //sort by registration count for featured
    const featured = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 5);

    return featured;
  },
});

//get events by location (city/state)
export const getEventsByLocation = query({
  args: {
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let events = await ctx.db
      .query("events")
      .withIndex("by_startDate")
      .filter((event) => event.gte(event.field("startDate"), now))
      .order("desc")
      .collect();

    if (args.city) {
      events = events.filter(
        (e) => e.city?.toLowerCase() == args.city.toLowerCase()
      );
    } else if (args.state) {
      events = events.filter(
        (e) => e.state?.toLowerCase() == args.state.toLowerCase()
      );
    }

    return events.slice(0, args.limit ?? 4);
  },
});

export const getPopularEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_startDate")
      .filter((event) => event.gte(event.field("startDate"), now))
      .order("desc")
      .collect();

    // Sort by registration count for popular events
    const popular = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 6);

    return popular;
  },
});

export const getEventsByCategory = query({
  args: {
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((event) => event.gte(event.field("startDate"), now))
      .order("desc")
      .collect();

    // Sort by registration count
    const popular = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 12);

    return popular;
  },
});

export const getCategoryCounts = query({
  handler: async (ctx) => {
    const now = Date.now();
    const events = await ctx.db
      .query("events")
      .withIndex("by_startDate")
      .filter((event) => event.gte(event.field("startDate"), now))
      .order("desc")
      .collect();

    const categoryCounts = {};
    events.forEach((event) => {
      categoryCounts[event.category] =
        (categoryCounts[event.category] || 0) + 1;
    });

    return categoryCounts;
  },
});