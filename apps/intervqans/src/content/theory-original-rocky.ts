import msFabricRaw from "./raw/ms-fabric-seminar.txt?raw";
import powerBiRaw from "./raw/power-bi-seminar.txt?raw";

export type OriginalTopicText = { id: string; title: string; content: string };

// Verbatim source text, keyed by DAnalyst topic tab. Basics was drafted
// directly by Claude (no separate pasted source), and Tableau has no
// content yet — both are intentionally empty here.
export const rockyOriginalByTopic: Record<string, OriginalTopicText[]> = {
  Basics: [],
  PowerBI: [{ id: "power-bi-seminar", title: "Power BI — full seminar", content: powerBiRaw }],
  Tableau: [],
  "MS Fabric": [{ id: "ms-fabric-seminar", title: "Microsoft Fabric — full seminar", content: msFabricRaw }],
};
