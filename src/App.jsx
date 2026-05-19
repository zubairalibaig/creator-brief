import { useState, useEffect } from "react";

const CAMPAIGNS = [
  { id: 1, brand: "Lumé Skincare", title: "Morning Routine with Lumé SPF Serum", description: "Create a 30–60 second TikTok showing your morning skincare routine featuring the Lumé SPF Serum. Show application, talk about your skin type, and share your honest experience.", budget: 280, slots: 5, claimed: 2, deadline: "2026-06-01", category: "Beauty", requirements: ["30–60 sec video", "Show product close-up", "Tag @LumeSkincare", "Min 5K followers"], product: "SPF Serum ($45 value included)", color: "#FFD6CC", accent: "#D85A30" },
  { id: 2, brand: "FitCore Nutrition", title: "Post-Workout Protein Shake GRWM", description: "Capture your post-gym ritual including blending and drinking FitCore Vanilla Whey. Energy, realness, and movement — this one should feel raw and authentic.", budget: 350, slots: 8, claimed: 3, deadline: "2026-05-28", category: "Fitness", requirements: ["45–90 sec video", "Show shake preparation", "Use trending audio", "Min 10K followers"], product: "1kg Vanilla Whey ($65 value)", color: "#D4EDDE", accent: "#3B6D11" },
  { id: 3, brand: "Novara Home", title: "Apartment Tour — Novara Bedding Collection", description: "Show how the Novara linen duvet set transforms your bedroom vibe. Styling tips, honest review, aesthetic shots welcome.", budget: 420, slots: 4, claimed: 4, deadline: "2026-06-10", category: "Lifestyle", requirements: ["60–120 sec video", "Bedroom setup visible", "Before/after preferred", "Min 8K followers"], product: "Full bedding set ($120 value)", color: "#E6EEF9", accent: "#185FA5" },
  { id: 4, brand: "Zest Energy", title: "Zest Can Taste Test — Honest Reaction", description: "Crack open a Zest can on camera and give your real reaction. No scripts, no polish — just genuine first sip energy. Funny wins.", budget: 200, slots: 12, claimed: 5, deadline: "2026-05-25", category: "Food & Drink", requirements: ["15–30 sec video", "Reaction must be on screen", "Use #ZestEnergy", "Min 3K followers"], product: "Case of 12 cans", color: "#FEF3C7", accent: "#B45309" },
  { id: 5, brand: "CodeNest", title: "Show Your Dev Setup with CodeNest", description: "Walk through your coding setup using the CodeNest app. Ideal for devs, designers, and students. Show real workflows, hotkeys, aesthetics.", budget: 500, slots: 3, claimed: 1, deadline: "2026-06-15", category: "Tech", requirements: ["60–90 sec video", "Screenshare + face cam", "Mention key features", "Min 15K followers"], product: "CodeNest Pro 1-year ($180 value)", color: "#EDE9FE", accent: "#534AB7" },
];

const DEFAULT_SUBMISSIONS = [
  { id: 101, campaignId: 1, campaignTitle: "Morning Routine with Lumé SPF Serum", influencer: "@you", videoUrl: "https://tiktok.com/@you/video/123", status: "approved", amount: 280, submittedAt: "2026-05-14", assignedTo: "Sarah" },
  { id: 102, campaignId: 4, campaignTitle: "Zest Can Taste Test — Honest Reaction", influencer: "@you", videoUrl: "https://tiktok.com/@you/video/456", status: "pending", amount: 200, submittedAt: "2026-05-17", assignedTo: "Alex" },
  { id: 201, campaignId: 1, campaignTitle: "Morning Routine with Lumé SPF Serum", influencer: "@glowwith_mia", videoUrl: "https://tiktok.com/@glowwith_mia/video/991", status: "approved", amount: 280, submittedAt: "2026-05-12", assignedTo: "Sarah" },
  { id: 202, campaignId: 2, campaignTitle: "Post-Workout Protein Shake GRWM", influencer: "@jakefitlife", videoUrl: "https://tiktok.com/@jakefitlife/video/882", status: "paid", amount: 350, submittedAt: "2026-05-08", paidAt: "2026-05-12", assignedTo: "Dave" },
  { id: 203, campaignId: 3, campaignTitle: "Apartment Tour — Novara Bedding", influencer: "@interiors_ada", videoUrl: "https://tiktok.com/@interiors_ada/video/773", status: "pending", amount: 420, submittedAt: "2026-05-18", assignedTo: "" },
];

const DEFAULT_CLAIMED = [1, 4];
const STAFF = ["Alex", "Sarah", "Dave", "Mia"];

const CATEGORY_COLORS = {
  Beauty: { bg: "#FFE4DC", text: "#993C1D" },
  Fitness: { bg: "#D4EDDE", text: "#285A1A" },
  Lifestyle: { bg: "#DBEAFE", text: "#1E40AF" },
  "Food & Drink": { bg: "#FEF3C7", text: "#92400E" },
  Tech: { bg: "#EDE9FE", text: "#4C1D95" },
};

const STATUS_STYLES = {
  pending: { bg: "#FEF3C7", text: "#92400E", label: "Under Review" },
  approved: { bg: "#D1FAE5", text: "#065F46", label: "Approved" },
  paid: { bg: "#DBEAFE", text: "#1E40AF", label: "Paid ✓" },
  rejected: { bg: "#FEE2E2", text: "#991B1B", label: "Rejected" },
};

function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

function Badge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return <span style={{ background: s.bg, color: s.text, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{s.label}</span>;
}

function CategoryTag({ cat }) {
  const c = CATEGORY_COLORS[cat] || { bg: "#F3F4F6", text: "#374151" };
  return <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.04em", textTransform: "uppercase" }}>{cat}</span>;
}

function VideoModal({ sub, campaign, onClose }) {
  const requirements = campaign?.requirements || [];
  return (
    <div onClick={() => onClose(null, null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 740, maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{sub.influencer}</p>
            <h2 style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700 }}>{sub.campaignTitle}</h2>
          </div>
          <button onClick={() => onClose(null, null)} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 20, color: "#6B7280" }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: 24, borderRight: "1px solid #F3F4F6" }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>Submitted Video</p>
            <div style={{ background: "#18181B", borderRadius: 20, padding: 12, aspectRatio: "9/16", maxWidth: 190, margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1a2e,#0f3460)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>▶</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: 0, textAlign: "center" }}>TikTok Preview</p>
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", padding: 4 }}>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>For You</span>
                <span style={{ color: "#fff" }}>···</span>
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <p style={{ color: "#fff", fontSize: 11, fontWeight: 600, margin: 0 }}>{sub.influencer}</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, margin: 0 }}>{sub.submittedAt}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  {["♥","💬","↗"].map((i) => <span key={i} style={{ fontSize: 16 }}>{i}</span>)}
                </div>
              </div>
            </div>
            <a href={sub.videoUrl} target="_blank" rel="noreferrer"
              style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "#185FA5", textDecoration: "none", fontWeight: 500 }}>
              Open on TikTok ↗
            </a>
          </div>
          <div style={{ padding: 24 }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>Requirements Checklist</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {requirements.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#F0FDF4", borderRadius: 8 }}>
                  <span style={{ color: "#16A34A", fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 16, marginBottom: 16 }}>
              {[["Payout", `AU$${sub.amount}`], ["Status", null], ["Assigned to", sub.assignedTo || "—"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, alignItems: "center" }}>
                  <span style={{ color: "#9CA3AF" }}>{label}</span>
                  {label === "Status" ? <Badge status={sub.status} /> : <span style={{ fontWeight: 600 }}>{val}</span>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sub.status === "pending" && <>
                <button onClick={() => onClose("approve", sub.id)} style={{ padding: "10px 0", borderRadius: 9, border: "none", background: "#D1FAE5", color: "#065F46", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>Approve & Queue for Payment</button>
                <button onClick={() => onClose("reject", sub.id)} style={{ padding: "10px 0", borderRadius: 9, border: "none", background: "#FEE2E2", color: "#991B1B", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" }}>Reject</button>
              </>}
              {sub.status === "approved" && <button onClick={() => onClose("pay", sub.id)} style={{ padding: "10px 0", borderRadius: 9, border: "none", background: "#DBEAFE", color: "#1E40AF", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>Mark as Paid</button>}
              {(sub.status === "paid" || sub.status === "rejected") && <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>No further actions</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("browse");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [allSubs, setAllSubs] = useLocalStorage("cb_submissions", DEFAULT_SUBMISSIONS);
  const [claimedIds, setClaimedIds] = useLocalStorage("cb_claimed", DEFAULT_CLAIMED);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitForm, setSubmitForm] = useState({ url: "", handle: "", notes: "" });
  const [submitDone, setSubmitDone] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [staffFilter, setStaffFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [previewSub, setPreviewSub] = useState(null);

  const MY_HANDLE = "@you";
  const mySubs = allSubs.filter((s) => s.influencer === MY_HANDLE);
  const weeklyQueue = allSubs.filter((s) => s.status === "approved");
  const weeklyTotal = weeklyQueue.reduce((a, s) => a + s.amount, 0);
  const cats = ["All", ...Array.from(new Set(CAMPAIGNS.map((c) => c.category)))];
  const filteredCampaigns = filterCat === "All" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.category === filterCat);
  const filteredAdminSubs = allSubs.filter((s) => {
    if (staffFilter && s.assignedTo !== staffFilter) return false;
    if (statusFilter && s.status !== statusFilter) return false;
    return true;
  });
  const previewCampaign = previewSub ? CAMPAIGNS.find((c) => c.id === previewSub.campaignId) : null;

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

  const handleClaim = (campaign) => { setClaimedIds((p) => [...p, campaign.id]); showToast(`✓ "${campaign.title}" added to your work`); };

  const handleSubmit = () => {
    if (!submitForm.url || !submitForm.handle) return;
    setAllSubs((p) => [...p, { id: Date.now(), campaignId: selectedCampaign.id, campaignTitle: selectedCampaign.title, influencer: MY_HANDLE, videoUrl: submitForm.url, status: "pending", amount: selectedCampaign.budget, submittedAt: new Date().toISOString().split("T")[0], assignedTo: "" }]);
    setSubmitDone(true);
  };

  const handleAdminAction = (subId, action) => {
    setAllSubs((p) => p.map((x) => x.id === subId ? { ...x, status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "paid", paidAt: action === "pay" ? new Date().toISOString().split("T")[0] : x.paidAt } : x));
    showToast(action === "approve" ? "Submission approved" : action === "reject" ? "Rejected" : "Marked as paid");
  };

  const handleAssign = (subId, staffName) => setAllSubs((p) => p.map((x) => x.id === subId ? { ...x, assignedTo: staffName } : x));

  const handleModalClose = (action, subId) => { if (action && subId) handleAdminAction(subId, action); setPreviewSub(null); };

  const navBtn = (v, label) => (
    <button onClick={() => { setView(v); setSubmitDone(false); }}
      style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: (!isAdmin && view === v) ? "#18181B" : "transparent", color: (!isAdmin && view === v) ? "#fff" : "#6B7280" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", minHeight: "100vh", background: "#F7F6F3", color: "#18181B" }}>
      {previewSub && <VideoModal sub={previewSub} campaign={previewCampaign} onClose={handleModalClose} />}

      {toastMsg && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#18181B", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500, zIndex: 999 }}>
          {toastMsg}
        </div>
      )}

      <div style={{ background: "#18181B", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 12, fontWeight: 500 }}>
        🚧 UI Demo — sample data only, no real backend or payments. &nbsp;
        <span style={{ color: "#9CA3AF" }}>Click <strong style={{ color: "#fff" }}>Admin</strong> in the nav to test the review workflow.</span>
      </div>

      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#18181B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8l3 3M11 8l-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>CreatorBrief</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navBtn("browse", "Browse Briefs")}
          {navBtn("mywork", "My Work")}
          <button onClick={() => { setIsAdmin(!isAdmin); setView(isAdmin ? "browse" : "admin"); }}
            style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontSize: 13, fontWeight: 500, background: isAdmin ? "#EDE9FE" : "#fff", color: isAdmin ? "#534AB7" : "#6B7280", marginLeft: 8 }}>
            {isAdmin ? "⬡ Admin ON" : "Admin"}
          </button>
          <button onClick={() => { setAllSubs(DEFAULT_SUBMISSIONS); setClaimedIds(DEFAULT_CLAIMED); showToast("Demo reset"); }}
            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontSize: 12, background: "#fff", color: "#9CA3AF" }}>
            Reset
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 24px" }}>

        {/* BROWSE */}
        {view === "browse" && (<>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Open Briefs</h1>
            <p style={{ color: "#6B7280", fontSize: 15, margin: 0 }}>Pick a brand brief, make the video, get paid every Monday.</p>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setFilterCat(c)}
                style={{ padding: "6px 16px", borderRadius: 20, border: "1.5px solid", borderColor: filterCat === c ? "#18181B" : "#E5E7EB", background: filterCat === c ? "#18181B" : "#fff", color: filterCat === c ? "#fff" : "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {filteredCampaigns.map((campaign) => {
              const isFull = campaign.claimed >= campaign.slots;
              const isClaimed = claimedIds.includes(campaign.id);
              return (
                <div key={campaign.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", transition: "transform 0.15s, box-shadow 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ height: 8, background: campaign.accent }} />
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <CategoryTag cat={campaign.category} />
                      <span style={{ fontSize: 12, color: isFull ? "#DC2626" : "#6B7280", fontWeight: 500 }}>{isFull ? "Full" : `${campaign.slots - campaign.claimed} spots left`}</span>
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 4px" }}>{campaign.brand}</p>
                    <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.35 }}>{campaign.title}</h2>
                    <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", lineHeight: 1.55 }}>{campaign.description.slice(0, 110)}…</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div><span style={{ fontSize: 22, fontWeight: 800 }}>AU${campaign.budget}</span><span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 4 }}>per video</span></div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setSelectedCampaign(campaign); setView("detail"); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>View</button>
                        {isClaimed
                          ? <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#F0FDF4", color: "#16A34A", fontSize: 13, fontWeight: 600, cursor: "default" }}>✓ Claimed</button>
                          : <button onClick={() => !isFull && handleClaim(campaign)} disabled={isFull} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: isFull ? "#F3F4F6" : "#18181B", color: isFull ? "#9CA3AF" : "#fff", fontSize: 13, fontWeight: 600, cursor: isFull ? "not-allowed" : "pointer" }}>{isFull ? "Full" : "Claim"}</button>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>)}

        {/* DETAIL */}
        {view === "detail" && selectedCampaign && (<>
          <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, fontWeight: 500, marginBottom: 20, padding: 0 }}>← Back to briefs</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}><CategoryTag cat={selectedCampaign.category} /><span style={{ fontSize: 13, color: "#9CA3AF" }}>{selectedCampaign.brand}</span></div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 16px" }}>{selectedCampaign.title}</h1>
              <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, margin: "0 0 28px" }}>{selectedCampaign.description}</p>
              <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>Requirements</h3>
              <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {selectedCampaign.requirements.map((r, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: selectedCampaign.accent, flexShrink: 0 }} />{r}
                  </li>
                ))}
              </ul>
              <div style={{ background: selectedCampaign.color, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>🎁</span>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: selectedCampaign.accent, textTransform: "uppercase", letterSpacing: "0.04em" }}>Product Included</p>
                  <p style={{ margin: 0, fontSize: 14, color: "#374151", fontWeight: 500 }}>{selectedCampaign.product}</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "24px 22px", position: "sticky", top: 80 }}>
                <span style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>AU${selectedCampaign.budget}</span>
                <p style={{ margin: "2px 0 20px", fontSize: 13, color: "#9CA3AF" }}>Paid within 7 days of approval</p>
                {[["Deadline", new Date(selectedCampaign.deadline).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })], ["Spots left", `${selectedCampaign.slots - selectedCampaign.claimed} of ${selectedCampaign.slots}`], ["Payment", "Weekly (Mondays)"]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10 }}>
                    <span style={{ color: "#9CA3AF" }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "#F3F4F6", margin: "16px 0" }} />
                {claimedIds.includes(selectedCampaign.id)
                  ? <button onClick={() => { setSubmitDone(false); setSubmitForm({ url: "", handle: "", notes: "" }); setView("submit"); }} style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Submit My Video</button>
                  : <button onClick={() => handleClaim(selectedCampaign)} style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Claim This Brief</button>}
                <p style={{ textAlign: "center", fontSize: 12, color: "#D1D5DB", margin: "10px 0 0" }}>No commitment until you submit</p>
              </div>
            </div>
          </div>
        </>)}

        {/* SUBMIT */}
        {view === "submit" && selectedCampaign && (<>
          <button onClick={() => setView("detail")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, fontWeight: 500, marginBottom: 24, padding: 0 }}>← Back to brief</button>
          {submitDone ? (
            <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
              <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>✓</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>Video submitted!</h2>
              <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 28 }}>We'll review it within 48 hours. Payment of <strong>AU${selectedCampaign.budget}</strong> goes out on the next Monday payout.</p>
              <button onClick={() => { setView("mywork"); setSubmitDone(false); }} style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View My Submissions</button>
            </div>
          ) : (
            <div style={{ maxWidth: 520 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Submit Your Video</h1>
              <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>For: <strong>{selectedCampaign.title}</strong></p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[{ label: "Your TikTok Handle", id: "handle", placeholder: "@yourhandle" }, { label: "TikTok Video URL", id: "url", placeholder: "https://tiktok.com/@you/video/..." }].map(({ label, id, placeholder }) => (
                  <div key={id}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                    <input value={submitForm[id]} placeholder={placeholder} onChange={(e) => setSubmitForm((p) => ({ ...p, [id]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Notes (optional)</label>
                  <textarea value={submitForm.notes} placeholder="Anything you want us to know..." onChange={(e) => setSubmitForm((p) => ({ ...p, notes: e.target.value }))} rows={3}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <button onClick={handleSubmit} disabled={!submitForm.url || !submitForm.handle}
                  style={{ padding: "13px 0", borderRadius: 10, border: "none", background: submitForm.url && submitForm.handle ? "#18181B" : "#E5E7EB", color: submitForm.url && submitForm.handle ? "#fff" : "#9CA3AF", fontSize: 15, fontWeight: 700, cursor: submitForm.url && submitForm.handle ? "pointer" : "not-allowed" }}>
                  Submit for Review
                </button>
              </div>
            </div>
          )}
        </>)}

        {/* MY WORK */}
        {view === "mywork" && (<>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>My Work</h1>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Track your claimed briefs, submissions, and payments.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
            {[{ label: "Claimed Briefs", value: claimedIds.length }, { label: "Submitted Videos", value: mySubs.length }, { label: "Total Earned", value: `AU$${mySubs.filter((s) => s.status === "paid").reduce((a, s) => a + s.amount, 0)}` }].map(({ label, value }) => (
              <div key={label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px 18px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{value}</p>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Claimed Briefs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {CAMPAIGNS.filter((c) => claimedIds.includes(c.id)).map((c) => {
              const submitted = mySubs.some((s) => s.campaignId === c.id);
              return (
                <div key={c.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{c.title}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{c.brand} · AU${c.budget} · Due {new Date(c.deadline).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</p>
                  </div>
                  {submitted
                    ? <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, background: "#F0FDF4", padding: "4px 12px", borderRadius: 20 }}>Submitted</span>
                    : <button onClick={() => { setSelectedCampaign(c); setSubmitDone(false); setSubmitForm({ url: "", handle: "", notes: "" }); setView("submit"); }} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: "#18181B", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Submit Video</button>}
                </div>
              );
            })}
          </div>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Submissions</h2>
          {mySubs.length === 0 ? <p style={{ color: "#9CA3AF", fontSize: 14 }}>No submissions yet.</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mySubs.map((s) => (
                  <div key={s.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{s.campaignTitle}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Submitted {s.submittedAt}</p>
                    </div>
                    <div style={{ textAlign: "right" }}><Badge status={s.status} /><p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>AU${s.amount}</p></div>
                  </div>
                ))}
              </div>}
        </>)}

        {/* ADMIN */}
        {view === "admin" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Admin Dashboard</h1>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review submissions and manage weekly payouts.</p>
            </div>
            <div style={{ background: "#EDE9FE", borderRadius: 12, padding: "12px 20px", textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#534AB7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Weekly Payout Queue</p>
              <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 800, color: "#3C3489" }}>AU${weeklyTotal}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#7C3AED" }}>{weeklyQueue.length} approved · pays next Monday</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {[{ label: "Total", value: allSubs.length, color: "#F9FAFB", text: "#111" }, { label: "Pending", value: allSubs.filter((s) => s.status === "pending").length, color: "#FEF3C7", text: "#92400E" }, { label: "Approved", value: allSubs.filter((s) => s.status === "approved").length, color: "#D1FAE5", text: "#065F46" }, { label: "Paid Out", value: allSubs.filter((s) => s.status === "paid").length, color: "#DBEAFE", text: "#1E40AF" }].map(({ label, value, color, text }) => (
              <div key={label} style={{ background: color, border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, color: text, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: text }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>All Submissions</span>
                <select value={staffFilter} onChange={(e) => setStaffFilter(e.target.value)}
                  style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 12, background: staffFilter ? "#EDE9FE" : "#F9FAFB", fontFamily: "inherit", cursor: "pointer" }}>
                  <option value="">All Reviewers</option>
                  {STAFF.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 12, background: statusFilter ? "#EDE9FE" : "#F9FAFB", fontFamily: "inherit", cursor: "pointer" }}>
                  <option value="">All Statuses</option>
                  {["pending","approved","paid","rejected"].map((s) => <option key={s} value={s}>{STATUS_STYLES[s].label}</option>)}
                </select>
                {(staffFilter || statusFilter) && <button onClick={() => { setStaffFilter(""); setStatusFilter(""); }} style={{ fontSize: 12, color: "#6B7280", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Clear filters</button>}
              </div>
              <button onClick={() => {
                const ids = allSubs.filter((s) => s.status === "approved").map((s) => s.id);
                setAllSubs((p) => p.map((s) => ids.includes(s.id) ? { ...s, status: "paid", paidAt: new Date().toISOString().split("T")[0] } : s));
                showToast(`✓ AU$${weeklyTotal} payout sent to ${weeklyQueue.length} creators`);
              }} disabled={weeklyQueue.length === 0}
                style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: weeklyQueue.length ? "#18181B" : "#F3F4F6", color: weeklyQueue.length ? "#fff" : "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: weeklyQueue.length ? "pointer" : "not-allowed", whiteSpace: "nowrap" }}>
                Run Weekly Payout · AU${weeklyTotal}
              </button>
            </div>
            {filteredAdminSubs.length === 0 && <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 14, padding: "32px 0" }}>No submissions match these filters.</p>}
            {filteredAdminSubs.map((s, i) => (
              <div key={`${s.id}-${i}`} style={{ padding: "13px 20px", borderBottom: i < filteredAdminSubs.length - 1 ? "1px solid #F9FAFB" : "none", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 }}>{s.campaignTitle}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{s.influencer} · {s.submittedAt}</p>
                </div>
                <select value={s.assignedTo || ""} onChange={(e) => handleAssign(s.id, e.target.value)}
                  style={{ padding: "4px 8px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 12, color: s.assignedTo ? "#374151" : "#9CA3AF", background: s.assignedTo ? "#F9FAFB" : "#fff", fontFamily: "inherit", cursor: "pointer" }}>
                  <option value="">Assign to…</option>
                  {STAFF.map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
                <span style={{ fontSize: 14, fontWeight: 700, minWidth: 65, textAlign: "right" }}>AU${s.amount}</span>
                <Badge status={s.status} />
                <button onClick={() => setPreviewSub(s)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Review ↗</button>
                {s.status === "pending" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => handleAdminAction(s.id, "approve")} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#D1FAE5", color: "#065F46", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✓</button>
                    <button onClick={() => handleAdminAction(s.id, "reject")} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#FEE2E2", color: "#991B1B", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✗</button>
                  </div>
                )}
                {s.status === "approved" && <button onClick={() => handleAdminAction(s.id, "pay")} style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#DBEAFE", color: "#1E40AF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Pay</button>}
                {(s.status === "paid" || s.status === "rejected") && <div style={{ width: 44 }} />}
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}
