"use server";

import { revalidateTag } from "next/cache";

export async function revalidateAll() {
  const tags = ["banner", "portfolio", "blog", "gig", "admin", "resume"];
  tags.forEach((tag) => revalidateTag(tag));

  /**
    revalidateTag("tag1");
    revalidateTag("tag2");
    revalidateTag("tag3");
   */
}
