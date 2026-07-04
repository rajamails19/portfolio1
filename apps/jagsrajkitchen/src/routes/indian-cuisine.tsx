import { createFileRoute, useNavigate } from "@tanstack/react-router";

const ORDER_URL = "https://cash.app/$rajakitchen";

export const Route = createFileRoute("/indian-cuisine")({
  head: () => ({
    meta: [
      { title: "Our Stories — Raja Kitchen" },
      { name: "description", content: "How Raja Kitchen began — where India meets the world in Atlanta, GA." },
      { property: "og:title", content: "Our Stories — Raja Kitchen" },
      { property: "og:description", content: "Where India meets the world." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const navigate = useNavigate();
  return (
    <main className="story">
      <div className="story-hero">
        <h1>Our Stories</h1>
        <p>Where India Meets the World</p>
      </div>

      <div className="story-cols">
        <div>
          <h3>How Raja Kitchen Began</h3>
          <p>A passion for sharing India's rich culinary heritage led to the creation of Raja Kitchen. Founded in Atlanta, Georgia, we set out to create a space where bold Indian flavors meet global sensibilities in a warm, welcoming environment.</p>
        </div>
        <div>
          <h3>Our Philosophy</h3>
          <p>We believe great food starts with integrity. Every ingredient is sourced locally when possible, every spice is freshly ground, and every dish is made from scratch. No shortcuts. No MSG. No artificial preservatives.</p>
        </div>
      </div>

      <img className="story-img" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400" alt="Raja Kitchen interior" loading="lazy" />

      <div className="story-cols">
        <div>
          <h3>The Experience</h3>
          <p>Raja Kitchen is more than a restaurant — it's a celebration. Whether you're joining us for a weekday dinner or a special occasion, our team ensures every visit feels personal and memorable.</p>
        </div>
        <div>
          <h3>Locally Rooted, Globally Inspired</h3>
          <p>Atlanta's diverse community deserves a dining destination that reflects its spirit. We draw from classic Indian recipes while embracing the culinary curiosity of our guests.</p>
        </div>
      </div>

      <div className="special-services">
        <h2>Special Services & Events</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🥂</div>
            <h3>Private Dining</h3>
            <p>Celebrate special moments in our intimate private dining spaces. Perfect for intimate gatherings.</p>
            <button className="service-link" onClick={() => alert("Contact us at (404) 892-5731 to reserve your private event!")}>Learn More →</button>
          </div>
          <div className="service-card">
            <div className="service-icon">🤝</div>
            <h3>Special Service</h3>
            <p>Bring the authentic flavors of Raja Kitchen to your event with our professional catering services.</p>
            <button className="service-link" onClick={() => alert("Call (404) 892-5731 or email rajakitchen.ga@gmail.com for catering inquiries!")}>Get Details →</button>
          </div>
          <div className="service-card">
            <div className="service-icon">📅</div>
            <h3>Group Reservations</h3>
            <p>Plan your group dinner or celebration with us. We accommodate groups of all sizes.</p>
            <button className="service-link" onClick={() => alert("Reserve your table: (404) 892-5731 or visit us online!")}>Book Now →</button>
          </div>
        </div>
      </div>

      <div className="story-cta">
        <h2>Ready to Experience Raja Kitchen?</h2>
        <div className="story-cta-buttons">
          <button className="btn-dark" onClick={() => navigate({ to: "/raja-kitchen-menu" })}>View Our Menu</button>
          <a className="btn-olive" href={ORDER_URL} target="_blank" rel="noopener noreferrer">Order Online</a>
        </div>
      </div>
    </main>
  );
}
