import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (!email.trim()) { setErr(true); return; }
    setErr(false);
    // TODO: Send email to backend for storage
    console.log("Newsletter signup:", email);
    setEmail("");
    // Show success state briefly
    setTimeout(() => {
      alert("Welcome! Check your email for updates.");
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <button className="footer-link" onClick={() => alert("FAQ page coming soon!")}>FAQ</button>
          <Link to="/indian-cuisine" className="footer-link">Our Stories</Link>
        </div>
        <div className="footer-col">
          <span className="heading">Contact:</span>
          <a className="small" href="mailto:rajakitchen.ga@gmail.com">rajakitchen.ga@gmail.com</a>
          <a className="small" href="tel:4048925731">404-892-5731</a>
        </div>
        <div className="footer-col">
          <span className="heading">Address:</span>
          <a className="small" href="https://maps.google.com/?q=2847+Peachtree+Rd+NE+Atlanta+GA+30305" target="_blank" rel="noopener noreferrer" style={{display:'block'}}>2847 Peachtree Rd NE,</a>
          <a className="small" href="https://maps.google.com/?q=2847+Peachtree+Rd+NE+Atlanta+GA+30305" target="_blank" rel="noopener noreferrer" style={{display:'block', marginBottom: 16}}>Atlanta, GA 30305</a>
          <button className="privacy" onClick={() => alert("Privacy Policy:\n\nWe respect your privacy and never share your information. For details, contact us at rajakitchen.ga@gmail.com")}>Privacy Policy</button>
        </div>
        <div className="footer-col">
          <label className="footer-email-label">Enter your email address here</label>
          <input
            className="footer-email-input"
            style={err ? { borderColor: '#D0453A' } : undefined}
            type="email"
            placeholder="Your email for updates"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {err && <span style={{ color: '#D0453A', fontSize: 13, marginTop: 4, display: 'block' }}>Email address is required</span>}
          <button className="footer-email-btn" onClick={submit}>Join us at Raja Kitchen</button>
        </div>
      </div>
    </footer>
  );
}
