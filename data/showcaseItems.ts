export type Filter = "web-app" | "art" | "rock-climb" | "school";

export type ShowcaseItem = {
  id: string;
  name: string;
  meta: string;
  tag: string;
  filter: Filter;
  createdAt: string;
};

export const filterLabels: Record<Filter, string> = {
  "web-app": "Web Apps",
  art: "Sketches",
  "rock-climb": "Climbing",
  school: "School Projects",
};

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "vision-gnn-sar-iceberg",
    name: "Adapting Vision GNN SAR Iceberg Imagery Classification",
    meta: "Graph neural networks",
    tag: "School Project",
    filter: "school",
    createdAt: "2026-05-15",
  },
  {
    id: "pronunciation-app",
    name: "Did I pronounce that right?",
    meta: "Automatic Speech Recognition",
    tag: "School Project",
    filter: "school",
    createdAt: "2026-04-15",
  },
  {
    id: "movie-recommendation",
    name: "MiniBERT4Rec + MF",
    meta: "Recommender systems",
    tag: "School Project",
    filter: "school",
    createdAt: "2025-05-18",
  },
  {
    id: "wsrylt",
    name: "What's song are you listening to?",
    meta: "Music sharing",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2022-02-21",
  },
  {
    id: "15-puzzle",
    name: "15 Puzzle",
    meta: "Sliding puzzle",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2025-12-31",
  },
  {
    id: "mr-nobody",
    name: "Mr. Nobody",
    meta: "Interactive fiction",
    tag: "School Project",
    filter: "school",
    createdAt: "2025-10-16",
  },
  {
    id: "drawings",
    name: "Sketches",
    meta: "Pencil",
    tag: "Art",
    filter: "art",
    createdAt: "2023-03-11",
  },
  {
    id: "first-v6",
    name: "First V6",
    meta: "Indoor bouldering",
    tag: "Rock Climb",
    filter: "rock-climb",
    createdAt: "2025-09-15",
  },
  {
    id: "northwest-branch",
    name: "Northwest Branch",
    meta: "Outdoor bouldering",
    tag: "Rock Climb",
    filter: "rock-climb",
    createdAt: "2025-08-30",
  },
  {
    id: "v5-indoor",
    name: "V5 Indoor",
    meta: "Indoor bouldering",
    tag: "Rock Climb",
    filter: "rock-climb",
    createdAt: "2025-10-14",
  },
];

export function getItemHref(id: string): string {
  return `/items/${id}`;
}

export function getSortedShowcaseItems(
  filter: Filter | "all" = "all"
): ShowcaseItem[] {
  const items =
    filter === "all"
      ? [...showcaseItems]
      : showcaseItems.filter((item) => item.filter === filter);

  return items.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}

export function getShowcaseItem(id: string): ShowcaseItem | undefined {
  return showcaseItems.find((item) => item.id === id);
}

export function formatShowcaseDate(createdAt: string): string {
  return createdAt.replaceAll("-", ".");
}

export type ItemNeighbors = {
  prev: ShowcaseItem | null;
  next: ShowcaseItem | null;
};

export function getItemNeighbors(id: string): ItemNeighbors {
  const sorted = getSortedShowcaseItems("all");
  const index = sorted.findIndex((item) => item.id === id);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getRelatedItems(id: string, limit = 2): ShowcaseItem[] {
  const item = getShowcaseItem(id);
  if (!item) return [];

  return getSortedShowcaseItems("all")
    .filter((entry) => entry.filter === item.filter && entry.id !== id)
    .slice(0, limit);
}

export const itemTitleClassName =
  "display-font poster-blue text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] mb-6";
