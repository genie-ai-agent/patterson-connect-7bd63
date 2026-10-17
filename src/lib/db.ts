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

export type VoteRow = { slug: string; loser: string };

/** Every vote ever cast: winner plus who it beat, so a matchup can be scored. */
export async function loadVotes(): Promise<VoteRow[]> {
  const { data, error } = await db
    .from("votes")
    .select("slug,loser")
    .order("id", { ascending: false })
    .limit(5000);

  if (error) throw new Error(error.message || "could not read the votes");
  return (data ?? []) as VoteRow[];
}

/** One tap = one row. */
export async function castVote(slug: string, loser: string): Promise<void> {
  const { error } = await db.from("votes").insert({ slug, loser }).select();
  if (error) throw new Error(error.message || "your vote did not save");
}
