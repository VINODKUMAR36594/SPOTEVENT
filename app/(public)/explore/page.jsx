"use client";

import React from "react";
import { useConvexQuery } from "./../../../hooks/use-convex-query";
import { api } from "../../../convex/_generated/api"; // ✅ missing import
import { useConvex } from "convex/react";

const ExplorePage = () => {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const { data: featureEvents, isLoading: loadingFeatured } = useConvexQuery(
    api.events.getFeaturedEvents,
    { limit: 3 },
  );

  const { data: locationEvents, isLoading: loadingLocal } = useConvexQuery(
    api.events.getEventsByLocation,
    {
      city: currentUser?.location?.city,
      state: currentUser?.location?.state,
      limit: 4,
    },
  );
  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.events.getPopularEvents,
    {
      limit: 4,
    },
  );

  //   console.log("featured events", data);

  return <div>Explore Page</div>;
};

export default ExplorePage;
