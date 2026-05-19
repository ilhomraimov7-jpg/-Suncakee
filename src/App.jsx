import { useState, useEffect, useRef } from "react";

const C = {
  dark: "#201c19",
  dark2: "#2d2420",
  cream: "#f9f3ec",
  gold: "#c9a84c",
  goldLight: "#e8c97a",
  accent: "#d4622a",
  text: "#1a2e3a",
  textLight: "#4a6a7a",
  white: "#ffffff",
  bgLight: "#e8f2f8",
  blueNew: "#23b8bf",
  textOnBlue: "#ffffff",
  textLightOnBlue: "rgba(255,255,255,0.75)",
};

const FONT = "'Cormorant Garamond', serif";

const ALL_PRODUCTS = [
  { id: 1, name: "Пирожное Вафельное", desc: "Вафли с масляным кремом и варёной сгущёнкой. Украшен печеньем «Орешки».", price: 26000, category: "Пирожные", tag: "нов", emoji: "🧇" },
  { id: 2, name: "Торт Блэк Форест", desc: "Шоколадный бисквит, шоколадно-вишнёвый мусс, сливочный крем-чиз, вишнёвая пропитка.", price: 249000, category: "Круглые торты", tag: "нов", emoji: "🍫" },
  { id: 3, name: "Торт Динозаврик", desc: "Белый бисквит со сливочным ванильным кремом, малиновым и апельсиновым конфи.", price: 315000, category: "Круглые торты", tag: "нов", emoji: "🦕" },
  { id: 4, name: "Торт Мишка", desc: "Тонкие сливочные коржи на основе сгущенного молока со сливочным кремом.", price: 249000, category: "Круглые торты", tag: "нов", emoji: "🐻" },
  { id: 5, name: "Торт Мороженко", desc: "Ванильный бисквит с клубничным сиропом, банановым кремом и шоколадными сливками.", price: 315000, category: "Круглые торты", tag: "нов", emoji: "🍦" },
  { id: 6, name: "Торт Махровый", desc: "Шоколадный и белый бисквит, масляный крем. Оформлен бисквитными крошками.", price: 240000, category: "Прямоугольные торты", tag: "нов", emoji: "🎂" },
  { id: 7, name: "Торт Фруктовый", desc: "Тонкие слои масляного бисквита со сливочным кремом и апельсиновым конфи.", price: 408000, category: "Прямоугольные торты", tag: "нов", emoji: "🍑" },
  { id: 8, name: "Торт Стич", desc: "Шоколадный бисквит с кофейной пропиткой, трюфельным и банановым кремом.", price: 279000, category: "Круглые торты", tag: "нов", emoji: "🟦" },
  { id: 9, name: "Бенто мини-торт", desc: "Заказывается за 3-4 дня заранее. Рассчитан на 2 персоны.", price: 144000, category: "Круглые торты", emoji: "🎁" },
  { id: 10, name: "Гранола", desc: "Греческий йогурт, мюсли с миндалём, семенами подсолнуха, мёдом и изюмом.", price: 39000, category: "Пирожные", emoji: "🥣" },
  { id: 11, name: "Круассан Шоколадный", desc: "Воздушное слоеное тесто с шоколадно-фундучной пастой.", price: 28000, category: "Слоеная выпечка", emoji: "🥐" },
  { id: 12, name: "Мини торт Вишенка", desc: "Песочное тесто с классическим ганашом и свежей вишней. На 6-8 персон.", price: 122000, category: "Круглые торты", emoji: "🍒" },
  { id: 13, name: "Наггетсы 12 шт", desc: "Куриное филе, сливочное масло, соль, перец, панировочные сухарики.", price: 31000, category: "Сытная выпечка", emoji: "🍗" },
  { id: 14, name: "Сырники 8 шт", desc: "Творог, мука пшеничная, яйцо, сахар, разрыхлитель теста.", price: 33000, category: "Сытная выпечка", emoji: "🧀" },
  { id: 15, name: "Тарталетка большая", desc: "Песочное тесто с шоколадным ганашом и взбитыми сливками. Украшена ягодами.", price: 14000, category: "Пирожные", emoji: "🫐" },
  { id: 16, name: "Торт Барби", desc: "Белый бисквит с йогуртовым кремом, пломбиром и клубнично-малиновым конфи.", price: 315000, category: "Круглые торты", emoji: "🎀" },
  { id: 17, name: "Торт Адмирал", desc: "Классический торт с масляным кремом и шоколадной глазурью.", price: 289000, category: "Круглые торты", emoji: "⚓" },
  { id: 18, name: "Торт Джульетта", desc: "Нежный бисквит с розовым кремом и ягодным конфи.", price: 310000, category: "Круглые торты", emoji: "🌹" },
  { id: 19, name: "Круассан классический", desc: "Слоёное тесто с хрустящей корочкой.", price: 22000, category: "Слоеная выпечка", emoji: "🥐" },
  { id: 20, name: "Самса с мясом", desc: "Слоёное тесто с сочной говяжьей начинкой.", price: 18000, category: "Сытная выпечка", emoji: "🥙" },
  { id: 21, name: "Печенье Орешки", desc: "Хрустящее ореховое печенье с варёной сгущёнкой.", price: 8000, category: "Печенья", emoji: "🍪" },
  { id: 22, name: "Печенье Макарон", desc: "Французское миндальное печенье с кремовой прослойкой.", price: 12000, category: "Печенья", emoji: "🫠" },
];

const CATEGORIES = ["Все", "Круглые торты", "Прямоугольные торты", "Пирожные", "Печенья", "Слоеная выпечка", "Сытная выпечка"];

const NEWS = [
  { title: "Слоечно-кофейное настроение!", desc: "Покупайте слоеную выпечку — получайте кофе в подарок", emoji: "☕", date: "15 мая" },
  { title: "Французский завтрак!", desc: "Давайте встречать утро сладко и вкусно вместе с Suncake", emoji: "🥐", date: "10 мая" },
  { title: "Вкусные новинки!", desc: "Торт Спартак, флорентин с миндалём, Экзот с апельсином и маракуйей.", emoji: "✨", date: "5 мая" },
  { title: "Двойной кэшбэк!", desc: "Попробуйте новые десерты и получите вдвое больше бонусов!", emoji: "💰", date: "1 мая" },
  { title: "Подарочные сертификаты", desc: "Для тех, кто хочет подарить вкусный праздник близким!", emoji: "🎫", date: "25 апр" },
  { title: "Хайит 2026", desc: "Специальные праздничные наборы и торты к светлому празднику!", emoji: "🌙", date: "20 апр" },
];

const LOCATION = {
  name: "Темур Малика",
  addr: "Темур Малика 146",
  time: "08:00–22:00",
  phone: "90-022-22-24",
  mapUrl: "https://www.google.com/maps/search/Темур+Малика+146+Ташкент",
};

function fmt(price) {
  return price.toLocaleString("ru-RU") + " сум";
}

// ─── RESPONSIVE HOOK ───────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w };
}

// ─── NAVBAR ────────────────────────────────────────────────
function Navbar({ cartCount, onCartClick, onSearch, searchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "О нас", id: "about" },
    { label: "Меню", id: "menu" },
    { label: "Локация", id: "location" },
    { label: "Новости", id: "news" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(35,184,191,0.97)" : C.blueNew,
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.15)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ background: C.gold, padding: "4px 0", textAlign: "center" }}>
        <span style={{ fontSize: isMobile ? 10 : 12, color: C.text, fontFamily: FONT, letterSpacing: isMobile ? 0.5 : 1.5, fontWeight: 600 }}>
          {isMobile ? "📞 78 113 40 40" : "🌟 Кондитерский дом №1 в Узбекистане · Заказ: 78 113 40 40"}
        </span>
      </div>
      <nav style={{
        maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: isMobile ? 52 : 60,
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("top")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: isMobile ? 8 : 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: isMobile ? 32 : 38, height: isMobile ? 32 : 38, background: `linear-gradient(135deg,${C.gold},${C.accent})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 15 : 18, boxShadow: "0 2px 12px rgba(201,168,76,0.4)", flexShrink: 0 }}>☀️</div>
          <div>
            <div style={{ color: C.gold, fontFamily: FONT, fontSize: isMobile ? 17 : 20, fontWeight: 700, lineHeight: 1 }}>Suncake</div>
            {!isMobile && <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>Cafe & Bakery</div>}
          </div>
        </button>

        {/* Desktop nav links */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {navLinks.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                style={{ color: C.textOnBlue, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: FONT, letterSpacing: 0.5, opacity: 0.9, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.gold}
                onMouseLeave={e => e.target.style.color = C.textOnBlue}
              >{item.label}</button>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
          {searchOpen && (
            <input autoFocus value={searchQuery} onChange={e => onSearch(e.target.value)}
              placeholder="Поиск..."
              style={{
                background: "rgba(255,255,255,0.2)", border: `1px solid ${C.gold}`, borderRadius: 20,
                padding: isMobile ? "4px 10px" : "5px 14px", color: C.textOnBlue,
                fontFamily: FONT, fontSize: 14, outline: "none",
                width: isMobile ? 130 : 180,
              }}
              onBlur={() => !searchQuery && setSearchOpen(false)}
            />
          )}
          <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, fontSize: isMobile ? 16 : 18, padding: 4 }}>🔍</button>

          <button onClick={onCartClick} style={{
            background: "none", border: `1.5px solid ${C.gold}`, borderRadius: 20,
            padding: isMobile ? "4px 10px" : "5px 14px",
            color: C.gold, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.gold; }}
          >
            🛒 {cartCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textOnBlue, fontSize: 20, padding: 4 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet dropdown menu */}
      {menuOpen && (
        <div style={{ background: C.blueNew, borderTop: `1px solid rgba(255,255,255,0.2)`, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              style={{ color: C.textOnBlue, background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: 16, fontFamily: FONT, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              {item.label}
            </button>
          ))}
          <a href={`tel:${LOCATION.phone.replace(/-/g, "")}`} style={{ color: C.gold, fontFamily: FONT, fontSize: 15, padding: "12px 0", textDecoration: "none", fontWeight: 600 }}>
            📞 {LOCATION.phone}
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────
function Hero({ onMenuClick }) {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  const floaters = ["🎂", "🧁", "🍰", "🥐", "🍪", "☕", "🍫", "🌸"];

  return (
    <section id="top" style={{
      minHeight: "100vh",
      background: C.blueNew,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      paddingTop: isMobile ? 80 : 100,
      paddingBottom: 40,
    }}>
      {floaters.map((em, i) => (
        <div key={i} style={{
          position: "absolute", fontSize: `${(isMobile ? 14 : 18) + (i % 3) * 8}px`, opacity: 0.12,
          top: `${8 + (i * 12) % 80}%`, left: `${4 + (i * 14) % 92}%`,
          animation: `float ${4 + i * 0.7}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.4}s`, pointerEvents: "none",
        }}>{em}</div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
      <div style={{
        textAlign: "center", zIndex: 1, maxWidth: 720, padding: isMobile ? "0 20px" : "0 24px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ color: C.gold, fontSize: isMobile ? 11 : 13, letterSpacing: isMobile ? 2 : 4, textTransform: "uppercase", marginBottom: 16, fontFamily: FONT }}>✦ Кондитерский дом №1 ✦</div>
        <h1 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(44px,14vw,64px)" : "clamp(52px,10vw,96px)", color: C.textOnBlue, lineHeight: 1.05, margin: "0 0 8px", fontWeight: 700 }}>
          Sun<span style={{ color: C.gold }}>cake</span>
        </h1>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "clamp(13px,4vw,16px)" : "clamp(14px,3vw,20px)", fontFamily: FONT, letterSpacing: 3, marginBottom: 20 }}>Cafe & Bakery</div>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: isMobile ? 15 : 17, lineHeight: 1.8, marginBottom: 32, fontFamily: FONT }}>
          Эксклюзивные торты и десерты, которые превращают любой день в грандиозный праздник!
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onMenuClick} style={{
            background: `linear-gradient(135deg,${C.gold},${C.accent})`, color: "#fff",
            padding: isMobile ? "12px 28px" : "14px 36px", borderRadius: 40, border: "none", cursor: "pointer",
            fontFamily: FONT, fontSize: isMobile ? 15 : 17, fontWeight: 700, letterSpacing: 0.5,
            boxShadow: "0 4px 24px rgba(201,168,76,0.4)", transition: "all 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}>Перейти в меню</button>
          <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} style={{
            border: `1.5px solid ${C.gold}`, color: C.gold,
            padding: isMobile ? "12px 28px" : "14px 36px",
            borderRadius: 40, background: "none", cursor: "pointer", fontFamily: FONT,
            fontSize: isMobile ? 15 : 17, letterSpacing: 0.5, transition: "all 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}>О нас</button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: isMobile ? 20 : 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["10+", "лет на рынке"], ["1", "локация"], ["500+", "позиций меню"], ["50 000+", "клиентов"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: C.gold, fontFamily: FONT, fontSize: isMobile ? 24 : 32, fontWeight: 700, lineHeight: 1 }}>{num}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? 11 : 13, marginTop: 4, fontFamily: FONT }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: C.gold, opacity: 0.6, animation: "bounce 2s infinite", fontSize: 20 }}>↓</div>
    </section>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────
function ProductCard({ product, onAddToCart, cartQty }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { isMobile } = useBreakpoint();

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background: C.white, borderRadius: 16, overflow: "hidden",
        boxShadow: hovered ? "0 16px 48px rgba(32,28,25,0.12)" : "0 2px 12px rgba(32,28,25,0.05)",
        transform: hovered ? "translateY(-6px)" : "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer", position: "relative",
      }}>
      {product.tag && (
        <div style={{ position: "absolute", top: 10, left: 10, background: C.accent, color: C.white, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", zIndex: 1 }}>
          {product.tag}
        </div>
      )}
      {cartQty > 0 && (
        <div style={{ position: "absolute", top: 10, right: 10, background: C.gold, color: C.text, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 700, zIndex: 1 }}>
          ×{cartQty}
        </div>
      )}
      <div style={{ height: isMobile ? 160 : 190, background: "linear-gradient(135deg,#d0e8f5,#b8d8ed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 52 : 64 }}>
        {product.emoji}
      </div>
      <div style={{ padding: isMobile ? "12px 14px 16px" : "16px 20px 20px" }}>
        <div style={{ color: C.textLight, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, fontFamily: FONT }}>{product.category}</div>
        <h3 style={{ fontFamily: FONT, fontSize: isMobile ? 15 : 17, color: C.text, marginBottom: 6, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ color: C.textLight, fontSize: 12, lineHeight: 1.5, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontFamily: FONT, fontSize: isMobile ? 15 : 18, color: C.gold, fontWeight: 700, flexShrink: 0 }}>{fmt(product.price)}</span>
          <button onClick={handleAdd} style={{
            background: added ? `linear-gradient(135deg,#4caf50,#388e3c)` : `linear-gradient(135deg,${C.gold},${C.accent})`,
            border: "none", borderRadius: 24, padding: isMobile ? "7px 14px" : "8px 18px", cursor: "pointer",
            color: "#fff", fontFamily: FONT, fontSize: 13, fontWeight: 700,
            transition: "all 0.3s", minWidth: isMobile ? 90 : 100,
            WebkitTapHighlightColor: "transparent",
          }}>
            {added ? "✓ Ок" : "+ Добавить"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MENU SECTION ─────────────────────────────────────────
function MenuSection({ onAddToCart, cartItems, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sort, setSort] = useState("default");
  const { isMobile, isTablet } = useBreakpoint();
  const catScrollRef = useRef(null);

  const cartMap = {};
  cartItems.forEach(i => { cartMap[i.id] = i.qty; });

  let filtered = ALL_PRODUCTS.filter(p => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const cols = isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(3,1fr)" : "repeat(auto-fill,minmax(260px,1fr))";

  return (
    <section id="menu" style={{ background: C.bgLight, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ Вкусное ✦</div>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(28px,7vw,38px)" : "clamp(32px,5vw,52px)", color: C.text, fontWeight: 700 }}>Наше меню</h2>
        </div>

        {/* Category pills - horizontal scroll on mobile */}
        <div ref={catScrollRef} style={{
          display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16,
          scrollbarWidth: "none", msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? C.gold : "rgba(201,168,76,0.1)",
              border: `1px solid ${activeCategory === cat ? C.gold : "rgba(201,168,76,0.25)"}`,
              borderRadius: 40, padding: isMobile ? "7px 14px" : "9px 18px", cursor: "pointer",
              color: activeCategory === cat ? C.white : C.text, whiteSpace: "nowrap",
              fontFamily: FONT, fontSize: isMobile ? 12 : 14, transition: "all 0.2s",
              fontWeight: activeCategory === cat ? 700 : 400,
              WebkitTapHighlightColor: "transparent", flexShrink: 0,
            }}>{cat}</button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: 40, padding: isMobile ? "7px 14px" : "9px 18px",
            fontFamily: FONT, fontSize: isMobile ? 12 : 14, color: C.text, cursor: "pointer", outline: "none",
          }}>
            <option value="default">По умолчанию</option>
            <option value="asc">Цена ↑</option>
            <option value="desc">Цена ↓</option>
            <option value="name">По названию</option>
          </select>
        </div>

        {searchQuery && (
          <div style={{ color: C.textLight, fontFamily: FONT, fontSize: 14, marginBottom: 16 }}>
            Запрос: <strong style={{ color: C.text }}>«{searchQuery}»</strong> — {filtered.length} товаров
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.textLight, fontFamily: FONT, fontSize: 18 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>Ничего не найдено
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 12 : 24 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} cartQty={cartMap[p.id] || 0} />)}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CAKES SLIDER ─────────────────────────────────────────
function CakesSlider() {
  const cakes = [
    { name: "Адмирал праздничный", emoji: "⚓", price: "289 000 сум" },
    { name: "Мини торт Вишенка", emoji: "🍒", price: "122 000 сум" },
    { name: "Торт Барби", emoji: "🎀", price: "315 000 сум" },
    { name: "Торт Джульетта", emoji: "🌹", price: "310 000 сум" },
    { name: "Торт Радуга", emoji: "🌈", price: "340 000 сум" },
    { name: "Торт Фруктовый", emoji: "🍑", price: "408 000 сум" },
    { name: "Торт Чёрный принц", emoji: "♟️", price: "260 000 сум" },
    { name: "Торт Наполеон", emoji: "👑", price: "275 000 сум" },
  ];
  const [idx, setIdx] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const visible = isMobile ? 2 : isTablet ? 3 : 3;
  const max = Math.max(0, cakes.length - visible);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setIdx(i => Math.min(max, i + 1));
      else setIdx(i => Math.max(0, i - 1));
    }
    touchStartX.current = null;
  };

  return (
    <section style={{ background: C.blueNew, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ Коллекция ✦</div>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(28px,7vw,38px)" : "clamp(32px,5vw,52px)", color: C.textOnBlue, fontWeight: 700 }}>Торты</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
          {!isMobile && (
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
              style={{ background: "none", border: `1.5px solid ${C.gold}`, color: C.gold, borderRadius: "50%", width: 44, height: 44, fontSize: 18, cursor: idx === 0 ? "not-allowed" : "pointer", flexShrink: 0, opacity: idx === 0 ? 0.4 : 1 }}>←</button>
          )}
          <div ref={sliderRef} style={{ flex: 1, overflow: "hidden" }}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div style={{ display: "flex", gap: 16, transition: "transform 0.4s ease", transform: `translateX(-${idx * (100 / visible)}%)` }}>
              {cakes.map((cake, i) => (
                <div key={i} style={{
                  minWidth: `calc(${100 / visible}% - 12px)`,
                  background: C.white, borderRadius: 16, overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.2)", transition: "all 0.3s",
                }}>
                  <div style={{ height: isMobile ? 130 : 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 52 : 72, background: C.bgLight }}>{cake.emoji}</div>
                  <div style={{ padding: isMobile ? "12px" : "16px", textAlign: "center" }}>
                    <p style={{ color: C.text, fontFamily: FONT, fontSize: isMobile ? 13 : 16, marginBottom: 5 }}>{cake.name}</p>
                    <p style={{ color: C.gold, fontFamily: FONT, fontSize: isMobile ? 12 : 14 }}>{cake.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <button onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx >= max}
              style={{ background: "none", border: `1.5px solid ${C.gold}`, color: C.gold, borderRadius: "50%", width: 44, height: 44, fontSize: 18, cursor: idx >= max ? "not-allowed" : "pointer", flexShrink: 0, opacity: idx >= max ? 0.4 : 1 }}>→</button>
          )}
        </div>
        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === idx ? C.gold : "rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
        {isMobile && <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 8, fontFamily: FONT }}>← Смахните для навигации →</p>}
      </div>
    </section>
  );
}

// ─── VALUES ───────────────────────────────────────────────
function Values() {
  const { isMobile } = useBreakpoint();
  const vals = [
    { icon: "🌿", title: "Окружающая среда", desc: "Suncake заботится о будущем нашей планеты. Экологичная упаковка и ответственное производство." },
    { icon: "👨‍👩‍👧‍👦", title: "Семья", desc: "Создаем традиции. Наши торты объединяют поколения за общим столом." },
    { icon: "🤝", title: "Инклюзия", desc: "Рады каждому. Делаем десерты для любого праздника, учитывая ваши пожелания." },
    { icon: "⭐", title: "Качество", desc: "Гарантия свежести. Готовим только под заказ из отборных фермерских продуктов." },
  ];
  const cols = isMobile ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(240px,1fr))";

  return (
    <section style={{ background: C.blueNew, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ Философия ✦</div>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(28px,7vw,38px)" : "clamp(32px,5vw,52px)", color: C.textOnBlue, fontWeight: 700 }}>Наши ценности</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 14 : 28 }}>
          {vals.map((v, i) => (
            <div key={i} style={{ textAlign: "center", padding: isMobile ? "24px 16px" : "36px 28px", background: "rgba(255,255,255,0.12)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s" }}>
              <div style={{ fontSize: isMobile ? 36 : 44, marginBottom: 14 }}>{v.icon}</div>
              <h3 style={{ fontFamily: FONT, fontSize: isMobile ? 17 : 22, color: C.gold, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: C.textLightOnBlue, lineHeight: 1.7, fontFamily: FONT, fontSize: isMobile ? 13 : 15 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────
function About() {
  const { isMobile } = useBreakpoint();
  return (
    <section id="about" style={{ background: C.bgLight, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 64, alignItems: "center",
        }}>
          <div style={{ background: "linear-gradient(135deg,#d0e8f5,#b8d8ed)", borderRadius: 24, height: isMobile ? 220 : 400, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 80 : 120, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 70%,rgba(201,168,76,0.2),transparent)" }} />
            🏠
          </div>
          <div>
            <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ История ✦</div>
            <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(28px,4vw,44px)", color: C.text, fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>Наша История</h2>
            <p style={{ color: C.textLight, lineHeight: 1.9, fontSize: isMobile ? 14 : 16, fontFamily: FONT, marginBottom: 16 }}>
              Suncake родился в 2019 году из простой идеи: каждый заслуживает по-настоящему вкусного торта. Мы начали с небольшой мастерской и большой любви к кондитерскому делу — и с тех пор не останавливаемся.
            </p>
            <p style={{ color: C.textLight, lineHeight: 1.9, fontSize: isMobile ? 14 : 16, fontFamily: FONT, marginBottom: 28 }}>
              Сегодня Suncake — это команда увлечённых кондитеров, которые каждый день создают не просто десерты, а маленькие праздники.
            </p>
            <div style={{ display: "flex", gap: isMobile ? 20 : 24, marginBottom: 28, flexWrap: "wrap" }}>
              {[["2019", "Год основания"], ["6+", "Лет опыта"], ["50 000+", "Клиентов"]].map(([num, lab]) => (
                <div key={lab}>
                  <div style={{ color: C.gold, fontFamily: FONT, fontSize: isMobile ? 22 : 28, fontWeight: 700 }}>{num}</div>
                  <div style={{ color: C.textLight, fontSize: 12, fontFamily: FONT }}>{lab}</div>
                </div>
              ))}
            </div>
            <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: `linear-gradient(135deg,${C.gold},${C.accent})`, color: "#fff",
              padding: "12px 28px", borderRadius: 32, border: "none", cursor: "pointer",
              fontFamily: FONT, fontSize: 15, fontWeight: 700,
              WebkitTapHighlightColor: "transparent",
            }}>Смотреть меню</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWS ─────────────────────────────────────────────────
function NewsSection() {
  const [expanded, setExpanded] = useState(null);
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(auto-fill,minmax(300px,1fr))";

  return (
    <section id="news" style={{ background: C.blueNew, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ Актуально ✦</div>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(28px,7vw,38px)" : "clamp(32px,5vw,52px)", color: C.textOnBlue, fontWeight: 700 }}>Новости</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 14 : 24 }}>
          {NEWS.map((n, i) => (
            <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                background: "rgba(255,255,255,0.12)", borderRadius: 16, overflow: "hidden",
                border: `1px solid ${expanded === i ? C.gold : "rgba(255,255,255,0.2)"}`,
                cursor: "pointer", transition: "all 0.3s",
              }}>
              <div style={{ height: isMobile ? 100 : 130, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 40 : 52 }}>{n.emoji}</div>
              <div style={{ padding: isMobile ? 14 : 20 }}>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: FONT, marginBottom: 6 }}>{n.date}</div>
                <h3 style={{ fontFamily: FONT, fontSize: isMobile ? 15 : 17, color: C.textOnBlue, marginBottom: 6, fontWeight: 600 }}>{n.title}</h3>
                <p style={{ color: C.textLightOnBlue, fontSize: 13, lineHeight: 1.6 }}>{n.desc}</p>
                {expanded === i && (
                  <p style={{ color: C.textLightOnBlue, fontSize: 12, lineHeight: 1.6, marginTop: 10, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 10 }}>
                    Следите за нашими акциями. Приходите: {LOCATION.addr}.
                  </p>
                )}
                <span style={{ display: "inline-block", marginTop: 12, color: C.gold, fontSize: 13, fontFamily: FONT }}>
                  {expanded === i ? "Скрыть ↑" : "Подробнее →"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION ─────────────────────────────────────────────
function LocationSection() {
  const { isMobile } = useBreakpoint();
  return (
    <section id="location" style={{ background: C.bgLight, padding: isMobile ? "60px 0" : "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>✦ Найди нас ✦</div>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? "clamp(28px,7vw,38px)" : "clamp(32px,5vw,52px)", color: C.text, fontWeight: 700 }}>Наша локация</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 40, alignItems: "start" }}>
          {/* Info */}
          <div style={{ background: C.blueNew, borderRadius: 24, padding: isMobile ? "28px 20px" : "40px", border: `2px solid ${C.gold}`, boxShadow: "0 8px 40px rgba(35,184,191,0.2)" }}>
            <div style={{ fontSize: 44, marginBottom: 16, textAlign: "center" }}>📍</div>
            <h3 style={{ fontFamily: FONT, fontSize: isMobile ? 22 : 28, color: C.gold, fontWeight: 700, marginBottom: 6, textAlign: "center" }}>{LOCATION.name}</h3>
            <p style={{ color: C.textLightOnBlue, fontSize: 14, fontFamily: FONT, textAlign: "center", marginBottom: 24 }}>{LOCATION.addr}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "⏰", label: "Время работы", value: LOCATION.time },
                { icon: "📞", label: "Телефон", value: LOCATION.phone },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 16px" }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: FONT }}>{label}</div>
                    <div style={{ color: C.textOnBlue, fontSize: 15, fontFamily: FONT, fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={LOCATION.mapUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", marginTop: 24, background: `linear-gradient(135deg,${C.gold},${C.accent})`, color: "#fff", padding: "13px 24px", borderRadius: 32, textDecoration: "none", fontFamily: FONT, fontSize: 15, fontWeight: 700, textAlign: "center" }}>
              Открыть в Google Maps →
            </a>
            <a href={`tel:${LOCATION.phone.replace(/-/g, "")}`}
              style={{ display: "block", marginTop: 10, border: `1.5px solid ${C.gold}`, color: C.gold, padding: "12px 24px", borderRadius: 32, textDecoration: "none", fontFamily: FONT, fontSize: 14, fontWeight: 600, textAlign: "center" }}>
              📞 Позвонить нам
            </a>
          </div>

          {/* Map placeholder */}
          <div style={{ background: "linear-gradient(135deg,#d0e8f5,#b8d8ed)", borderRadius: 24, height: isMobile ? 280 : 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1.5px solid rgba(201,168,76,0.3)`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15), transparent 70%)" }} />
            <div style={{ fontSize: isMobile ? 60 : 80, marginBottom: 16 }}>🗺️</div>
            <p style={{ fontFamily: FONT, fontSize: isMobile ? 16 : 20, color: C.text, fontWeight: 600, marginBottom: 6 }}>Темур Малика 146</p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: C.textLight, textAlign: "center", padding: "0 24px", marginBottom: 20 }}>Ташкент, Узбекистан</p>
            <a href={LOCATION.mapUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: C.blueNew, color: C.white, padding: "10px 22px", borderRadius: 24, textDecoration: "none", fontFamily: FONT, fontSize: 13, fontWeight: 600, border: `1px solid rgba(255,255,255,0.3)` }}>
              Посмотреть на карте →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CART MODAL ───────────────────────────────────────────
function CartModal({ cart, onClose, onRemove, onChangeQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [ordered, setOrdered] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { isMobile } = useBreakpoint();

  const handleOrder = () => {
    if (!name.trim()) { setError("Введите ваше имя"); return; }
    if (!phone.trim()) { setError("Введите номер телефона"); return; }
    setError("");
    setOrdered(true);
    setTimeout(() => { setOrdered(false); onClose(); }, 3000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 2000, display: "flex", alignItems: "stretch", justifyContent: "flex-end" }}
      onClick={onClose}>
      <div style={{
        background: C.white, width: isMobile ? "100vw" : "min(480px,100vw)",
        height: "100dvh", overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column",
      }} onClick={e => e.stopPropagation()}>

        <div style={{ padding: isMobile ? "18px 20px" : "24px 28px", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <h2 style={{ fontFamily: FONT, fontSize: isMobile ? 22 : 26, color: C.text }}>Корзина 🛒</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.textLight, padding: 8 }}>✕</button>
        </div>

        {ordered ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: FONT, fontSize: 22, color: C.text, marginBottom: 10 }}>Заказ оформлен!</h3>
            <p style={{ color: C.textLight, fontFamily: FONT, fontSize: 15, lineHeight: 1.6 }}>Наш менеджер свяжется с вами. Спасибо, что выбрали Suncake! 🎂</p>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🧺</div>
            <p style={{ color: C.textLight, fontFamily: FONT, fontSize: 17 }}>Корзина пуста</p>
            <button onClick={onClose} style={{ marginTop: 20, background: `linear-gradient(135deg,${C.gold},${C.accent})`, border: "none", borderRadius: 32, padding: "12px 28px", cursor: "pointer", fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#fff" }}>
              Перейти в меню
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "0 16px" : "0 28px" }}>
              {cart.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.07)", alignItems: "center" }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, color: C.text, fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ color: C.gold, fontSize: 13, fontFamily: FONT }}>{fmt(item.price * item.qty)}</div>
                    <div style={{ color: C.textLight, fontSize: 11, fontFamily: FONT }}>{fmt(item.price)} × {item.qty}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => onChangeQty(i, -1)} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.4)`, background: "none", cursor: "pointer", color: C.textLight, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontFamily: FONT, fontSize: 15, color: C.text, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onChangeQty(i, 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.4)`, background: "none", cursor: "pointer", color: C.textLight, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 16, marginLeft: 2, padding: 4 }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: isMobile ? "16px" : "28px", borderTop: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя *"
                  style={{ border: `1px solid rgba(201,168,76,0.4)`, borderRadius: 12, padding: "10px 16px", fontFamily: FONT, fontSize: 14, outline: "none", color: C.text, background: C.bgLight }} />
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Номер телефона *"
                  type="tel"
                  style={{ border: `1px solid rgba(201,168,76,0.4)`, borderRadius: 12, padding: "10px 16px", fontFamily: FONT, fontSize: 14, outline: "none", color: C.text, background: C.bgLight }} />
                {error && <p style={{ color: C.accent, fontFamily: FONT, fontSize: 12 }}>{error}</p>}
              </div>
              <div style={{ background: "#e8f2f8", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT, fontSize: 14, color: C.textLight, marginBottom: 6 }}>
                  <span>Товаров: {cart.reduce((s, i) => s + i.qty, 0)}</span>
                  <span>{fmt(total)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT, fontSize: 17, fontWeight: 700, color: C.text }}>
                  <span>Итого:</span>
                  <span style={{ color: C.gold }}>{fmt(total)}</span>
                </div>
              </div>
              <button onClick={handleOrder} style={{
                width: "100%", background: `linear-gradient(135deg,${C.gold},${C.accent})`, border: "none", borderRadius: 32, padding: "14px",
                cursor: "pointer", fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.text,
                WebkitTapHighlightColor: "transparent",
              }}>Оформить заказ →</button>
              <p style={{ textAlign: "center", color: C.textLight, fontSize: 11, fontFamily: FONT, marginTop: 8 }}>📞 Или позвоните: {LOCATION.phone}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer() {
  const { isMobile, isTablet } = useBreakpoint();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const cols = isMobile ? "1fr 1fr" : isTablet ? "2fr 1fr 1fr" : "2fr 1fr 1fr 1fr";

  return (
    <footer style={{ background: C.blueNew, padding: isMobile ? "48px 0 0" : "60px 0 0", borderTop: `1px solid rgba(255,255,255,0.15)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 14px" : "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 24 : 48, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, background: `linear-gradient(135deg,${C.gold},${C.accent})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>☀️</div>
              <div>
                <div style={{ color: C.gold, fontFamily: FONT, fontSize: 20, fontWeight: 700 }}>Suncake</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2 }}>CAFE & BAKERY</div>
              </div>
            </div>
            <p style={{ color: C.textLightOnBlue, fontSize: 13, lineHeight: 1.8, marginBottom: 16, fontFamily: FONT }}>
              Профессиональная команда кондитеров создаёт произведения искусства для вашего праздника.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["📘", "Facebook"], ["📷", "Instagram"], ["✈️", "Telegram"]].map(([icon, name]) => (
                <a key={name} href="#" title={name} style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: 15 }}>{icon}</a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ color: C.gold, fontFamily: FONT, fontSize: 13, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>Разделы</h4>
            {[["О нас", "about"], ["Меню", "menu"], ["Локация", "location"], ["Новости", "news"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display: "block", color: C.textLightOnBlue, background: "none", border: "none", textAlign: "left", cursor: "pointer", marginBottom: 8, fontFamily: FONT, fontSize: 14, padding: 0 }}>{label}</button>
            ))}
          </div>

          {/* Info - hidden on mobile to save space */}
          {!isMobile && (
            <div>
              <h4 style={{ color: C.gold, fontFamily: FONT, fontSize: 13, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>Информация</h4>
              {["FAQ", "Доставка", "Оферта", "Кейтеринг"].map(item => (
                <a key={item} href="#" style={{ display: "block", color: C.textLightOnBlue, textDecoration: "none", marginBottom: 8, fontFamily: FONT, fontSize: 14 }}>{item}</a>
              ))}
            </div>
          )}

          {/* Contacts */}
          <div>
            <h4 style={{ color: C.gold, fontFamily: FONT, fontSize: 13, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>Контакты</h4>
            <a href={`tel:${LOCATION.phone.replace(/-/g, "")}`} style={{ color: C.textOnBlue, textDecoration: "none", fontFamily: FONT, fontSize: 16, fontWeight: 600, display: "block", marginBottom: 8 }}>📞 {LOCATION.phone}</a>
            <p style={{ color: C.textLightOnBlue, fontFamily: FONT, fontSize: 12, marginBottom: 8 }}>📍 {LOCATION.addr}</p>
            <p style={{ color: C.textLightOnBlue, fontFamily: FONT, fontSize: 12 }}>⏰ {LOCATION.time}</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: FONT }}>© 2026 Suncake Cafe & Bakery</span>
          <button onClick={() => scrollTo("menu")} style={{ background: `linear-gradient(135deg,${C.gold},${C.accent})`, color: "#fff", padding: "9px 20px", borderRadius: 24, border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 13, fontWeight: 700, WebkitTapHighlightColor: "transparent" }}>☀️ В меню</button>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING CART BUTTON (mobile) ────────────────────────
function FloatingCartBtn({ cartCount, onClick }) {
  const { isMobile } = useBreakpoint();
  if (!isMobile || cartCount === 0) return null;
  return (
    <button onClick={onClick} style={{
      position: "fixed", bottom: 20, right: 16, zIndex: 999,
      background: `linear-gradient(135deg,${C.gold},${C.accent})`,
      border: "none", borderRadius: 32, padding: "12px 20px",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 4px 20px rgba(201,168,76,0.5)",
      cursor: "pointer", fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.white,
      WebkitTapHighlightColor: "transparent",
    }}>
      🛒 <span style={{ background: C.white, color: C.accent, borderRadius: "50%", width: 22, height: 22, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));

  const changeQty = (index, delta) => {
    setCart(prev => prev.map((item, i) => {
      if (i !== index) return item;
      const newQty = item.qty + delta;
      return newQty <= 0 ? null : { ...item, qty: newQty };
    }).filter(Boolean));
  };

  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q) scrollToMenu();
  };

  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @keyframes float { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-20px) rotate(10deg); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #e8f2f8; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #e8f2f8; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
        input::placeholder { color: rgba(74,106,122,0.7); }
        input:focus { border-color: #c9a84c !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
        div::-webkit-scrollbar { display: none; }
        button { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 640px) {
          section { -webkit-overflow-scrolling: touch; }
        }
      `}</style>
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartClick={() => setShowCart(true)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <Hero onMenuClick={scrollToMenu} />
      <MenuSection onAddToCart={addToCart} cartItems={cart} searchQuery={searchQuery} />
      <CakesSlider />
      <Values />
      <About />
      <NewsSection />
      <LocationSection />
      <Footer />
      <FloatingCartBtn cartCount={cart.reduce((s, i) => s + i.qty, 0)} onClick={() => setShowCart(true)} />
      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
        />
      )}
    </div>
  );
}
