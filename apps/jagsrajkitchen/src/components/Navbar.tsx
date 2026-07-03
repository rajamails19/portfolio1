import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const ORDER_URL = "https://cash.app/$rajakitchen";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLocations = () => {
    alert("📍 RAJA KITCHEN LOCATIONS\n\n🏢 Main Location:\n2847 Peachtree Rd NE\nAtlanta, GA 30305\n\n📞 (404) 892-5731\n📧 rajakitchen.ga@gmail.com\n\nOpen: Tue-Sun 11am-10pm\nClosed Mondays\n\nView on Google Maps →");
  };

  const socials = (
    <>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
      <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="Google"><span style={{fontWeight:700,fontSize:16}}>G</span></a>
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><span style={{fontWeight:700,fontSize:14}}>TT</span></a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
    </>
  );

  return (
    <>
      <div className="header-banner" style={{background:'#5C6B3A', color:'white', textAlign:'center', padding:'8px 0', fontSize:'14px', fontWeight:'500', letterSpacing:'1px'}}>
        ✨ NEW THINGS ✨
      </div>
      <header className="nav">
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        <Logo />
        <nav className="nav-center">
          <Link to="/raja-kitchen-menu">Items</Link>
          <Link to="/indian-cuisine">Our Stories</Link>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Online Order</a>
        </nav>
        <div className="nav-right">
          <div className="nav-socials">{socials}</div>
          <button className="nav-locations" onClick={handleLocations} style={{background:'none', border:'none', cursor:'pointer', padding:0}}>Locations</button>
        </div>
      </header>

      {open && (
        <div className="mobile-overlay">
          <button className="close" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          <div className="m-logo"><Logo /></div>
          <nav>
            <Link to="/raja-kitchen-menu" onClick={() => setOpen(false)}>Items</Link>
            <Link to="/indian-cuisine" onClick={() => setOpen(false)}>Our Stories</Link>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Online Order</a>
          </nav>
          <div className="m-socials">{socials}</div>
          <button className="m-locations" onClick={() => { handleLocations(); setOpen(false); }} style={{background:'none', border:'none', cursor:'pointer', padding:0, fontSize:'16px', color:'#2C2C2A'}}>Locations</button>
        </div>
      )}
    </>
  );
}
