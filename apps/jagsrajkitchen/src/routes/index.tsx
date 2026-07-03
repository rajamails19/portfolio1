import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

const ORDER_URL = "https://cash.app/$rajakitchen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raja Kitchen — Indian Bar and Restaurant" },
      { name: "description", content: "Fine-casual Indian dining experience in Atlanta, GA." },
      { property: "og:title", content: "Raja Kitchen" },
      { property: "og:description", content: "Global • Fine Dining Experience" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState<{ email?: boolean; msg?: boolean }>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async () => {
    const newErrs: typeof errs = {};
    if (!email.trim()) newErrs.email = true;
    else if (!validateEmail(email)) newErrs.email = true;
    if (!msg.trim()) newErrs.msg = true;

    setErrs(newErrs);
    if (Object.keys(newErrs).length === 0) {
      setLoading(true);
      // TODO: Send to backend API
      console.log("Contact form submitted:", { name: first, email, message: msg });

      // Simulate API call
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setFirst("");
        setEmail("");
        setMsg("");
        // Auto-hide success message after 4 seconds
        setTimeout(() => setSuccess(false), 4000);
      }, 800);
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">RAJA KITCHEN</h1>
          <p className="hero-sub">Global • Fine Dining Experience</p>
          <div className="hero-buttons">
            <button className="btn-white" onClick={() => navigate({ to: "/raja-kitchen-menu" })}>View Our Menu</button>
            <a className="btn-olive" href={ORDER_URL} target="_blank" rel="noopener noreferrer">Order Online</a>
          </div>
        </div>
      </section>

      <section className="journey">
        <h1>Discover Raja Kitchen's Culinary Journey</h1>
        <div className="journey-cols">
          <div>
            <h3>A Global Culinary Experience</h3>
            <p>At Raja Kitchen, we offer a fine-casual dining experience that celebrates the vibrant flavors of India blended with global influences. From bold spices to delicate presentations, our menu transforms timeless traditions into modern plates.</p>
          </div>
          <div>
            <h3>Quality Ingredients, Exceptional Taste</h3>
            <p>At Raja Kitchen, you'll never find MSG, preservatives, or artificial colors in your meal. Every dish is crafted from scratch with locally sourced produce, and freshly ground spices. From grilled-to-order proteins to handmade sauces.</p>
          </div>
        </div>
        <img className="journey-img" src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400" alt="Indian food spread" loading="lazy" />
      </section>

      <section className="testimonials">
        <h2>What Our Guests Are Saying</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"The flavors are incredible! Every dish was a masterpiece. Can't wait to come back."</p>
            <p className="author">— Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Fresh ingredients, authentic taste, and exceptional service. This is fine dining done right."</p>
            <p className="author">— James T.</p>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Raja Kitchen has spoiled me for other Indian restaurants. Simply outstanding!"</p>
            <p className="author">— Priya P.</p>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="contact-bg" />
        <div className="contact-overlay" />
        <div className="contact-inner">
          <p className="contact-tag">We'd love to hear from you about your experience.</p>
          <div className="contact-card">
            <label>Your First Name</label>
            <input type="text" placeholder="Enter your first name" value={first} onChange={(e) => setFirst(e.target.value)} />

            <label>Your Email Address*</label>
            <input className={errs.email ? "error-input" : ""} type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errs.email && <span className="error-msg">{errs.email && email && !validateEmail(email) ? "Please enter a valid email" : "Email is required"}</span>}

            <label>Your Message*</label>
            <textarea className={errs.msg ? "error-input" : ""} placeholder="Type your message here" value={msg} onChange={(e) => setMsg(e.target.value)} />
            {errs.msg && <span className="error-msg">Message is required</span>}

            <button className="submit" onClick={submit} disabled={loading} style={{opacity: loading ? 0.7 : 1}}>
              {loading ? "Sending..." : "Submit Your Inquiry"}
            </button>
            {success && <p className="success-msg">✓ Thank you! We received your message and will get back to you within 24 hours.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
