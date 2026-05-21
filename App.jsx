import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://nvfkognjxmmhqqavgiyi.supabase.co";
const SUPABASE_KEY = "sb_publishable_JQ7Yu-9GIgsvpUdBbO6wUA_sSxb1OFB";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUSINESS_CATEGORIES = [
  { id: "fashion", label: "পোশাক / ফ্যাশন", icon: "👗" },
  { id: "food", label: "খাবার / ফুড", icon: "🍔" },
  { id: "beauty", label: "বিউটি / কসমেটিক্স", icon: "💄" },
  { id: "electronics", label: "ইলেকট্রনিক্স", icon: "📱" },
  { id: "handicraft", label: "হস্তশিল্প", icon: "🎨" },
  { id: "grocery", label: "মুদিখানা / গ্রোসারি", icon: "🛒" },
  { id: "furniture", label: "আসবাবপত্র", icon: "🪑" },
  { id: "other", label: "অন্যান্য", icon: "📦" },
];

const CONTENT_TYPES = [
  { id: "product", label: "প্রোডাক্ট পোস্ট", icon: "✨" },
  { id: "offer", label: "অফার / ডিসকাউন্ট", icon: "🔥" },
  { id: "live", label: "লাইভ স্ক্রিপ্ট", icon: "🎙️" },
  { id: "reply", label: "কাস্টমার রিপ্লাই", icon: "💬" },
];

const TONES = [
  { id: "excited", label: "উত্তেজিত 🎉" },
  { id: "elegant", label: "আভিজাত্যপূর্ণ ✨" },
  { id: "friendly", label: "বন্ধুত্বপূর্ণ 😊" },
  { id: "urgent", label: "জরুরি ⚡" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=Sora:wght@700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #f7f4ef;
  --card: #ffffff;
  --accent: #e85d26;
  --accent2: #2563eb;
  --text: #1a1a1a;
  --muted: #6b7280;
  --border: #e5e0d8;
  --green: #16a34a;
}
body { background: var(--bg); font-family: 'Noto Sans Bengali', sans-serif; color: var(--text); }

.app { min-height: 100vh; }

/* ── Auth ── */
.auth-wrap {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
@media(max-width:700px){ .auth-wrap { grid-template-columns:1fr; } .auth-hero { display:none!important; } }

.auth-hero {
  background: linear-gradient(160deg, #1a1a2e 0%, #e85d26 100%);
  display: flex; flex-direction: column;
  justify-content: center; align-items: flex-start;
  padding: 60px 48px;
  position: relative; overflow: hidden;
}
.auth-hero::after {
  content: '🚀';
  position: absolute; font-size: 200px; opacity: 0.07;
  bottom: -30px; right: -30px;
}
.hero-badge {
  background: rgba(255,255,255,0.15);
  color: #fff; font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; padding: 5px 14px;
  border-radius: 20px; margin-bottom: 24px;
}
.hero-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(28px,4vw,44px);
  color: #fff; line-height: 1.15; margin-bottom: 20px;
}
.hero-title span { color: #fbbf24; }
.hero-features { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.hero-features li {
  color: rgba(255,255,255,0.85); font-size: 14px;
  display: flex; align-items: center; gap: 10px;
}
.hero-features li::before { content: '✓'; color: #fbbf24; font-weight: 700; }

.auth-form-wrap {
  display: flex; align-items: center; justify-content: center;
  padding: 40px 24px;
  background: var(--bg);
}
.auth-box {
  width: 100%; max-width: 420px;
  background: var(--card);
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 4px 40px rgba(0,0,0,0.08);
  animation: fadeUp 0.5s ease;
}
.auth-logo {
  font-family: 'Sora', sans-serif;
  font-size: 20px; font-weight: 800;
  color: var(--accent); margin-bottom: 6px;
}
.auth-subtitle { color: var(--muted); font-size: 13px; margin-bottom: 28px; }
.auth-tabs {
  display: grid; grid-template-columns: 1fr 1fr;
  background: var(--border); border-radius: 12px;
  padding: 3px; margin-bottom: 24px;
}
.auth-tab {
  padding: 9px; text-align: center; font-size: 13px;
  font-weight: 600; border-radius: 10px; cursor: pointer;
  border: none; background: transparent; color: var(--muted);
  font-family: 'Noto Sans Bengali', sans-serif; transition: all 0.2s;
}
.auth-tab.active { background: var(--card); color: var(--text); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
.form-input {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--border); border-radius: 12px;
  font-size: 14px; font-family: 'Noto Sans Bengali', sans-serif;
  color: var(--text); background: var(--bg); outline: none;
  transition: border-color 0.2s;
}
.form-input:focus { border-color: var(--accent); background: #fff; }

.cat-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
  margin-bottom: 16px;
}
@media(max-width:400px){ .cat-grid { grid-template-columns: repeat(2,1fr); } }
.cat-btn {
  padding: 10px 4px; border-radius: 10px;
  border: 1.5px solid var(--border); background: var(--bg);
  cursor: pointer; text-align: center; transition: all 0.2s;
  font-family: 'Noto Sans Bengali', sans-serif;
}
.cat-btn .ci { font-size: 20px; display: block; }
.cat-btn .cl { font-size: 10px; color: var(--muted); display: block; margin-top: 3px; line-height: 1.2; }
.cat-btn.active { border-color: var(--accent); background: #fff3ee; }
.cat-btn:hover:not(.active) { border-color: #d1c9be; }

.btn-primary {
  width: 100%; padding: 14px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 12px;
  font-size: 15px; font-weight: 700;
  font-family: 'Noto Sans Bengali', sans-serif;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(232,93,38,0.3);
}
.btn-primary:hover { background: #d44f1c; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.auth-error {
  background: #fef2f2; border: 1px solid #fecaca;
  color: #dc2626; border-radius: 10px;
  padding: 10px 14px; font-size: 13px; margin-bottom: 14px;
}
.auth-success {
  background: #f0fdf4; border: 1px solid #bbf7d0;
  color: #16a34a; border-radius: 10px;
  padding: 10px 14px; font-size: 13px; margin-bottom: 14px;
}

/* ── Dashboard ── */
.dashboard { max-width: 800px; margin: 0 auto; padding: 24px 16px 60px; }
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
}
.brand { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--accent); }
.user-info { display: flex; align-items: center; gap: 10px; }
.user-name { font-size: 13px; font-weight: 600; color: var(--text); }
.user-biz { font-size: 11px; color: var(--muted); }
.logout-btn {
  padding: 6px 14px; border-radius: 20px;
  border: 1.5px solid var(--border); background: transparent;
  color: var(--muted); font-size: 12px; cursor: pointer;
  font-family: 'Noto Sans Bengali', sans-serif; transition: all 0.2s;
}
.logout-btn:hover { border-color: var(--accent); color: var(--accent); }

.welcome-card {
  background: linear-gradient(135deg, #1a1a2e, #e85d26);
  border-radius: 20px; padding: 24px 28px;
  margin-bottom: 20px; color: #fff;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.welcome-text h2 { font-family: 'Sora', sans-serif; font-size: 20px; margin-bottom: 4px; }
.welcome-text p { font-size: 13px; opacity: 0.8; }
.gen-count { text-align: center; }
.gen-count .num { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 800; color: #fbbf24; }
.gen-count .lbl { font-size: 11px; opacity: 0.8; }

.card {
  background: var(--card); border-radius: 20px;
  padding: 22px; margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid var(--border);
}
.card-title {
  font-size: 12px; font-weight: 700; color: var(--accent);
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 14px; display: flex; align-items: center; gap: 6px;
}

.type-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
@media(min-width:500px){ .type-grid { grid-template-columns: repeat(4,1fr); } }
.type-btn {
  padding: 14px 8px; border-radius: 14px;
  border: 1.5px solid var(--border); background: var(--bg);
  cursor: pointer; text-align: center; transition: all 0.2s;
  font-family: 'Noto Sans Bengali', sans-serif;
}
.type-btn .ti { font-size: 22px; display: block; margin-bottom: 5px; }
.type-btn .tl { font-size: 12px; font-weight: 600; color: var(--text); }
.type-btn.active { border-color: var(--accent); background: #fff3ee; }
.type-btn:hover:not(.active) { border-color: #d1c9be; }

.tone-row { display: flex; flex-wrap: wrap; gap: 8px; }
.tone-btn {
  padding: 7px 14px; border-radius: 20px;
  border: 1.5px solid var(--border); background: var(--bg);
  font-size: 13px; cursor: pointer; transition: all 0.2s;
  font-family: 'Noto Sans Bengali', sans-serif; color: var(--muted);
}
.tone-btn.active { border-color: var(--accent2); background: #eff6ff; color: var(--accent2); font-weight: 600; }

.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media(max-width:400px){ .row2 { grid-template-columns:1fr; } }

.generate-btn {
  width: 100%; padding: 15px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 14px;
  font-size: 15px; font-weight: 700;
  font-family: 'Noto Sans Bengali', sans-serif;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(232,93,38,0.3);
  margin-top: 4px;
}
.generate-btn:hover:not(:disabled) { background: #d44f1c; transform: translateY(-1px); }
.generate-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.result-box {
  background: #f0fdf4; border: 1.5px solid #bbf7d0;
  border-radius: 16px; padding: 20px;
  margin-top: 16px; animation: fadeUp 0.4s ease;
}
.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.result-label { font-size: 12px; font-weight: 700; color: var(--green); text-transform: uppercase; letter-spacing: 1px; }
.copy-btn {
  padding: 6px 16px; border-radius: 20px;
  border: 1.5px solid var(--green); background: transparent;
  color: var(--green); font-size: 12px; cursor: pointer;
  font-family: 'Noto Sans Bengali', sans-serif; font-weight: 600; transition: all 0.2s;
}
.copy-btn:hover { background: var(--green); color: #fff; }
.copy-btn.copied { background: var(--green); color: #fff; }
.result-text { color: #1a1a1a; font-size: 14px; line-height: 1.9; white-space: pre-wrap; }

.spinner-wrap { display: flex; align-items: center; gap: 10px; padding: 16px 0; color: var(--muted); font-size: 13px; }
.spinner { width: 18px; height: 18px; border: 2px solid #e5e7eb; border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }

.error-msg { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 10px; padding: 10px 14px; font-size: 13px; margin-top: 10px; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
`;

// ─── Auth Screen ──────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !category) {
      setError("সব তথ্য পূরণ করুন।"); return;
    }
    setLoading(true); setError(""); setSuccess("");
    const { data, error: err } = await supabase.auth.signUp({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from("users_profile").insert({
        id: data.user.id,
        full_name: fullName,
        business_name: businessName,
        business_category: category,
        phone,
      });
      setSuccess("✅ অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন।");
      setTab("login");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!email || !password) { setError("ইমেইল ও পাসওয়ার্ড দিন।"); return; }
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।"); setLoading(false); return; }
    // Update last login
    await supabase.from("users_profile").update({ last_login: new Date().toISOString() }).eq("id", data.user.id);
    const { data: profile } = await supabase.from("users_profile").select("*").eq("id", data.user.id).single();
    onLogin(data.user, profile);
    setLoading(false);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-hero">
        <div className="hero-badge">🇧🇩 বাংলাদেশী উদ্যোক্তাদের জন্য</div>
        <h1 className="hero-title">উদ্যোক্তা <span>AI</span><br />কন্টেন্ট এজেন্ট</h1>
        <ul className="hero-features">
          <li>সব ধরনের ব্যবসার জন্য কন্টেন্ট</li>
          <li>প্রোডাক্ট পোস্ট, অফার, লাইভ স্ক্রিপ্ট</li>
          <li>বাংলায় আকর্ষণীয় ক্যাপশন</li>
          <li>কাস্টমার রিপ্লাই টেমপ্লেট</li>
          <li>একদম বিনামূল্যে শুরু করুন</li>
        </ul>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-box">
          <div className="auth-logo">উদ্যোক্তা AI</div>
          <div className="auth-subtitle">ফেসবুক বিজনেসের জন্য AI কন্টেন্ট টুল</div>
          <div className="auth-tabs">
            <button className={`auth-tab${tab==="signup"?" active":""}`} onClick={()=>{setTab("signup");setError("");setSuccess("");}}>সাইনআপ</button>
            <button className={`auth-tab${tab==="login"?" active":""}`} onClick={()=>{setTab("login");setError("");setSuccess("");}}>লগইন</button>
          </div>
          {error && <div className="auth-error">⚠️ {error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {tab === "signup" ? (
            <>
              <div className="form-group">
                <label className="form-label">আপনার নাম *</label>
                <input className="form-input" placeholder="পূর্ণ নাম লিখুন" value={fullName} onChange={e=>setFullName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">বিজনেসের নাম</label>
                <input className="form-input" placeholder="আপনার পেজ বা দোকানের নাম" value={businessName} onChange={e=>setBusinessName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">বিজনেসের ধরন *</label>
                <div className="cat-grid">
                  {BUSINESS_CATEGORIES.map(c=>(
                    <button key={c.id} className={`cat-btn${category===c.id?" active":""}`} onClick={()=>setCategory(c.id)}>
                      <span className="ci">{c.icon}</span>
                      <span className="cl">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">ইমেইল *</label>
                <input className="form-input" type="email" placeholder="আপনার ইমেইল" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">ফোন নম্বর</label>
                <input className="form-input" placeholder="01XXXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">পাসওয়ার্ড *</label>
                <input className="form-input" type="password" placeholder="কমপক্ষে ৬ অক্ষর" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={handleSignup} disabled={loading}>
                {loading ? "অপেক্ষা করুন..." : "✅ ফ্রি অ্যাকাউন্ট খুলুন"}
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">ইমেইল</label>
                <input className="form-input" type="email" placeholder="আপনার ইমেইল" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">পাসওয়ার্ড</label>
                <input className="form-input" type="password" placeholder="পাসওয়ার্ড" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={handleLogin} disabled={loading}>
                {loading ? "লগইন হচ্ছে..." : "🚀 লগইন করুন"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ user, profile, onLogout }) {
  const [contentType, setContentType] = useState("product");
  const [tone, setTone] = useState("excited");
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [genCount, setGenCount] = useState(profile?.total_generations || 0);

  const catLabel = BUSINESS_CATEGORIES.find(c=>c.id===profile?.business_category)?.label || "উদ্যোক্তা";

  const toneMap = {
    excited: "উত্তেজিত ও আনন্দময়",
    elegant: "পরিশীলিত ও আভিজাত্যপূর্ণ",
    friendly: "বন্ধুত্বপূর্ণ ও সহজ",
    urgent: "জরুরি ও দ্রুত সিদ্ধান্ত নেওয়ার তাগিদ দেওয়া",
  };

  const buildPrompt = () => {
    const t = toneMap[tone];
    const biz = catLabel;
    if (contentType === "product") return `তুমি একজন দক্ষ বাংলাদেশী ফেসবুক কন্টেন্ট রাইটার। ${biz} ব্যবসার জন্য আকর্ষণীয় ফেসবুক পোস্ট ক্যাপশন লেখো।\n\nপণ্যের নাম: ${productName}\nবিবরণ: ${productDetails}\nমূল্য: ${price} টাকা\nটোন: ${t}\n\nফরম্যাট:\n- আকর্ষণীয় হেডলাইন (ইমোজি সহ)\n- ২-৩ লাইনের বিবরণ\n- ৩টি মূল বৈশিষ্ট্য\n- মূল্য\n- CTA\n- ৫-৭টি হ্যাশট্যাগ\n\nশুধু পোস্ট কন্টেন্ট লেখো।`;
    if (contentType === "offer") return `তুমি একজন দক্ষ বাংলাদেশী ফেসবুক কন্টেন্ট রাইটার। ${biz} ব্যবসার জন্য অফার পোস্ট লেখো।\n\nঅফার: ${productName}\nবিবরণ: ${productDetails}\nমূল মূল্য: ${price} টাকা\nছাড়: ${discount}%\nটোন: ${t}\n\nফরম্যাট:\n- চমকপ্রদ অফার হেডলাইন\n- অফারের বিস্তারিত\n- ছাড়ের পরে দাম\n- জরুরি CTA\n- হ্যাশট্যাগ\n\nশুধু পোস্ট কন্টেন্ট লেখো।`;
    if (contentType === "live") return `তুমি একজন দক্ষ বাংলাদেশী ফেসবুক লাইভ স্ক্রিপ্ট রাইটার। ${biz} ব্যবসার জন্য ফেসবুক লাইভের স্ক্রিপ্ট লেখো।\n\nপণ্য: ${productName}\nবিবরণ: ${productDetails}\nমূল্য: ${price} টাকা\nটোন: ${t}\n\nস্ক্রিপ্টে থাকবে:\n- শুরুর অভিবাদন ও পরিচয়\n- পণ্যের বর্ণনা\n- দর্শকদের সাথে কথোপকথন\n- অর্ডার নেওয়ার প্রক্রিয়া\n- শেষের ধন্যবাদ\n\nস্বাভাবিক কথোপকথনের ভাষায় লেখো।`;
    return `তুমি একজন দক্ষ বাংলাদেশী কাস্টমার সার্ভিস বিশেষজ্ঞ। ${biz} ব্যবসার জন্য কাস্টমার রিপ্লাই টেমপ্লেট তৈরি করো।\n\nপণ্য: ${productName}\nসাধারণ প্রশ্ন: ${productDetails}\nটোন: ${t}\n\n৫টি কমন প্রশ্নের জন্য রেডি রিপ্লাই লেখো যেমন: দাম জিজ্ঞেস, ডেলিভারি, কোয়ালিটি, রিটার্ন, অর্ডার প্রক্রিয়া।`;
  };

  const generate = async () => {
    if (!productName.trim()) { setError("পণ্যের নাম / বিষয় লিখুন।"); return; }
    setError(""); setLoading(true); setResult(""); setCopied(false);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b=>b.text||"").join("\n") || "";
      setResult(text.trim());
      // Log to Supabase
      const newCount = genCount + 1;
      await supabase.from("content_logs").insert({
        user_id: user.id, content_type: contentType,
        business_category: profile?.business_category,
        product_name: productName, tone,
      });
      await supabase.from("users_profile").update({ total_generations: newCount }).eq("id", user.id);
      setGenCount(newCount);
    } catch (e) {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <div className="brand">উদ্যোক্তা AI</div>
        <div className="user-info">
          <div>
            <div className="user-name">{profile?.full_name || user.email}</div>
            <div className="user-biz">{profile?.business_name || catLabel}</div>
          </div>
          <button className="logout-btn" onClick={onLogout}>লগআউট</button>
        </div>
      </div>

      <div className="welcome-card">
        <div className="welcome-text">
          <h2>স্বাগতম, {(profile?.full_name||"").split(" ")[0] || "উদ্যোক্তা"}! 👋</h2>
          <p>{catLabel} ব্যবসার জন্য AI কন্টেন্ট তৈরি করুন</p>
        </div>
        <div className="gen-count">
          <div className="num">{genCount}</div>
          <div className="lbl">মোট কন্টেন্ট তৈরি</div>
        </div>
      </div>

      {/* Content Type */}
      <div className="card">
        <div className="card-title">📌 কন্টেন্টের ধরন</div>
        <div className="type-grid">
          {CONTENT_TYPES.map(ct=>(
            <button key={ct.id} className={`type-btn${contentType===ct.id?" active":""}`}
              onClick={()=>{setContentType(ct.id);setResult("");}}>
              <span className="ti">{ct.icon}</span>
              <span className="tl">{ct.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="card">
        <div className="card-title">🎭 টোন</div>
        <div className="tone-row">
          {TONES.map(t=>(
            <button key={t.id} className={`tone-btn${tone===t.id?" active":""}`} onClick={()=>setTone(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="card">
        <div className="card-title">✍️ তথ্য দিন</div>
        <div className="form-group">
          <label className="form-label">
            {contentType==="reply" ? "পণ্য / সার্ভিসের নাম" : contentType==="live" ? "পণ্যের নাম" : "পণ্যের নাম"} *
          </label>
          <input className="form-input"
            placeholder={contentType==="reply"?"যেমন: হিজাব, শাড়ি, থ্রি-পিস...":"যেমন: কটন শাড়ি, বিরিয়ানি, স্কিনকেয়ার কিট..."}
            value={productName} onChange={e=>setProductName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">
            {contentType==="reply"?"সাধারণ কাস্টমার প্রশ্ন":"বিবরণ"}
          </label>
          <textarea className="form-input" rows={3}
            placeholder={contentType==="reply"?"কাস্টমাররা কী কী জিজ্ঞেস করে...":"রং, ডিজাইন, বৈশিষ্ট্য..."}
            value={productDetails} onChange={e=>setProductDetails(e.target.value)} />
        </div>
        <div className="row2">
          <div className="form-group">
            <label className="form-label">মূল্য (টাকা)</label>
            <input className="form-input" type="number" placeholder="যেমন: 850"
              value={price} onChange={e=>setPrice(e.target.value)} />
          </div>
          {contentType==="offer" && (
            <div className="form-group">
              <label className="form-label">ডিসকাউন্ট (%)</label>
              <input className="form-input" type="number" placeholder="যেমন: 20"
                value={discount} onChange={e=>setDiscount(e.target.value)} />
            </div>
          )}
        </div>
        <button className="generate-btn" onClick={generate} disabled={loading}>
          {loading ? "তৈরি হচ্ছে..." : "✨ কন্টেন্ট তৈরি করুন"}
        </button>
        {error && <div className="error-msg">⚠️ {error}</div>}
      </div>

      {loading && (
        <div className="card">
          <div className="spinner-wrap"><div className="spinner" /> AI কন্টেন্ট তৈরি করছে...</div>
        </div>
      )}

      {result && !loading && (
        <div className="card">
          <div className="result-box">
            <div className="result-header">
              <div className="result-label">✅ তৈরি কন্টেন্ট</div>
              <button className={`copy-btn${copied?" copied":""}`} onClick={copy}>
                {copied ? "✓ কপি হয়েছে!" : "কপি করুন"}
              </button>
            </div>
            <div className="result-text">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) {
        const { data: p } = await supabase.from("users_profile").select("*").eq("id", data.session.user.id).single();
        setUser(data.session.user);
        setProfile(p);
      }
      setChecking(false);
    });
  }, []);

  const handleLogin = (u, p) => { setUser(u); setProfile(p); };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setProfile(null);
  };

  if (checking) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Noto Sans Bengali',sans-serif",color:"#6b7280"}}>
      লোড হচ্ছে...
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {user ? <Dashboard user={user} profile={profile} onLogout={handleLogout} /> : <AuthScreen onLogin={handleLogin} />}
      </div>
    </>
  );
}
