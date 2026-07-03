import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { menuCategories, menuData } from "@/data/menu";
import { Search } from "lucide-react";

export const Route = createFileRoute("/raja-kitchen-menu")({
  head: () => ({
    meta: [
      { title: "Menu — Raja Kitchen" },
      { name: "description", content: "Explore the full menu at Raja Kitchen — appetizers, tandoori, biryanis, and more." },
      { property: "og:title", content: "Menu — Raja Kitchen" },
      { property: "og:description", content: "Indian flavors with global flair." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState("soups_and_salads");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "veg" | "non-veg">("all");

  const items = menuData[active] || [];

  // Filter and search items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const isVeg = item.name.toLowerCase().includes("veg") ||
                    item.name.includes("Paneer") ||
                    item.name.includes("Dal") ||
                    item.name.includes("Chana") ||
                    item.name.includes("Aloo") ||
                    item.name.includes("Gobi") ||
                    item.name.includes("Naan") ||
                    item.name.includes("Samosa") ||
                    item.name.includes("Kheer") ||
                    item.name.includes("Gulab") ||
                    item.name.includes("Rasgulla") ||
                    item.name.includes("Kulfi") ||
                    item.name.includes("Mac & Cheese") ||
                    active === "desserts" ||
                    active === "breads";

      if (filter === "veg") return matchesSearch && isVeg;
      if (filter === "non-veg") return matchesSearch && !isVeg;
      return matchesSearch;
    });
  }, [searchQuery, filter, items, active]);

  const itemCount = items.length;
  const vegCount = items.filter((i) => i.name.includes("Veg") || i.name.includes("Paneer") || active === "desserts" || active === "breads").length;

  return (
    <main>
      <div className="menu-header">
        <button className="menu-pill">MENU</button>
        <h1 className="menu-title">RAJA KITCHEN</h1>
        <p className="menu-subtitle">Global • Fine Dining Experience</p>

        {/* Search Bar */}
        <div className="menu-search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="menu-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="menu-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({itemCount})
          </button>
          <button
            className={`filter-btn ${filter === "veg" ? "active" : ""}`}
            onClick={() => setFilter("veg")}
          >
            Vegetarian ({vegCount})
          </button>
          <button
            className={`filter-btn ${filter === "non-veg" ? "active" : ""}`}
            onClick={() => setFilter("non-veg")}
          >
            Non-Veg ({itemCount - vegCount})
          </button>
        </div>

        <div className="menu-tabs">
          {menuCategories.map((c) => (
            <button
              key={c.key}
              className={`menu-tab ${active === c.key ? "active" : "inactive"}`}
              onClick={() => {
                setActive(c.key);
                setSearchQuery("");
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", fontSize: 18, color: "#9B8B5A" }}>
          No items found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div className="menu-card" key={item.name}>
              <div style={{ flex: 1 }}>
                <div className="name">{item.name}</div>
                <div className="desc">{item.desc}</div>
              </div>
              <span className="price">{item.price}</span>
            </div>
          ))}
        </div>
      )}

      {filteredItems.length > 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#9B8B5A", fontSize: 14 }}>
          Showing {filteredItems.length} of {itemCount} items in {active.replace(/_/g, " ")}
        </div>
      )}
    </main>
  );
}
