import { createClient } from "@neondatabase/neon-js";

// Both URLs are public by design: Postgres row-level security decides what a
// visitor may read and write, not a secret kept in the page.
export const db = createClient({
  auth: {
    url: "https://ep-cold-forest-b8iqwlk6.neonauth.c-14.us-east-1.aws.neon.tech/neondb/auth",
    allowAnonymous: true,
  },
  dataApi: {
    url: "https://ep-cold-forest-b8iqwlk6.apirest.c-14.us-east-1.aws.neon.tech/neondb/rest/v1",
  },
});

export type Tallies = Record<string, number>;

/** Every vote ever cast, folded into a count per opportunity. */
export async function loadTallies(): Promise<Tallies> {
  const { data, error } = await db
    .from("votes")
    .select("slug")
    .order("id", { ascending: false })
    .limit(5000);

  if (error) throw new Error(error.message || "could not read the standings");

  const tallies: Tallies = {};
  for (const row of (data ?? []) as { slug: string }[]) {
    tallies[row.slug] = (tallies[row.slug] ?? 0) + 1;
  }
  return tallies;
}

/** One tap = one row. `loser` records who it beat, for the matchup log. */
export async function castVote(slug: string, loser: string): Promise<void> {
  const { error } = await db.from("votes").insert({ slug, loser }).select();
  if (error) throw new Error(error.message || "your vote did not save");
}
