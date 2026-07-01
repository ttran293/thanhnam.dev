export type Filter = "web-app" | "art" | "rock-climb" | "school";

export type ShowcaseItem = {
  id: string;
  name: string;
  meta: string;
  tag: string;
  filter: Filter;
  createdAt: string;
  status?: "in-progress" | "done";
  starred?: boolean;
  archived?: boolean;
};

export const filterLabels: Record<Filter, string> = {
  "web-app": "Web Apps",
  art: "Sketches",
  "rock-climb": "Hiking/Climbing",
  school: "School Projects",
};

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "sticker-vending-machine",
    name: "Sticker Vending Machine",
    meta: "Sticker shop",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2026-06-14",
    status: "in-progress",
    starred: true,
  },
  {
    id: "style-guide-demo",
    name: "A Company UX/UI Style Guide Template",
    meta: "Design system",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2026-05-27",
    status: "done",
  },
  {
    id: "vision-gnn-sar-iceberg",
    name: "Adapting Vision GNN SAR Iceberg Imagery Classification",
    meta: "Graph neural networks",
    tag: "School Project",
    filter: "school",
    createdAt: "2026-05-15",
    status: "done",
    starred: true,
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
    id: "tictactoe-nasmx86-64",
    name: "Tic Tac Toe NASM x86-64",
    meta: "Assembly game",
    tag: "School Project",
    filter: "school",
    createdAt: "2020-12-19",
  },
  {
    id: "skew-heap-priority-queue",
    name: "Skew Heap Priority Queue",
    meta: "C++ data structures",
    tag: "School Project",
    filter: "school",
    createdAt: "2020-12-16",
  },
  {
    id: "adjacency-lists",
    name: "Adjacency Lists",
    meta: "Graph representation",
    tag: "School Project",
    filter: "school",
    createdAt: "2020-12-16",
  },
  {
    id: "wsrylt-v2",
    name: "What's song are you listening to? Version 2",
    meta: "Music sharing",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2026-05-24",
    starred: true,
  },
  {
    id: "mount-rainier",
    name: "Mount Rainier",
    meta: "National park",
    tag: "Hiking",
    filter: "rock-climb",
    createdAt: "2026-06-29",
  },
  {
    id: "wsrylt",
    name: "What's song are you listening to?",
    meta: "Music sharing",
    tag: "Web App",
    filter: "web-app",
    createdAt: "2022-02-21",
    archived: true,
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
