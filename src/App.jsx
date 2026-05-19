import { useState } from "react";

const CAMPAIGNS = [
  {
    id: 1,
    brand: "Lumé Skincare",
    title: "Morning Routine with Lumé SPF Serum",
    description: "Create a 30–60 second TikTok showing your morning skincare routine featuring the Lumé SPF Serum. Show application, talk about your skin type, and share your honest experience.",
    budget: 280,
    slots: 5,
    claimed: 2,
    deadline: "2026-06-01",
    category: "Beauty",
    requirements: ["30–60 sec video", "Show product close-up", "Tag @LumeSkincare", "Min 5K followers"],
    product: "SPF Serum ($45 value included)",
    color: "#FFD6CC",
    accent: "#D85A30",
  },
  {
    id: 2,
    brand: "FitCore Nutrition",
    title: "Post-Workout Protein Shake GRWM",
    description: "Capture your post-gym ritual including blending and drinking FitCore Vanilla Whey. Energy, realness, and movement — this one should feel raw and authentic.",
    budget: 350,
    slots: 8,
    claimed: 3,
    deadline: "2026-05-28",
    category: "Fitness",
    requirements: ["45–90 sec video", "Show shake preparation", "Use sound trending audio", "Min 10K followers"],
    product: "1kg Vanilla Whey ($65 value)",
    color: "#D4EDDE",
    accent: "#3B6D11",
  },
  {
    id: 3,
    brand: "Novara Home",
    title: "Apartment Tour — Novara Bedding Collection",
    description: "Show how the Novara linen duvet set transforms your bedroom vibe. Styling tips, honest review, aesthetic shots welcome. We love unique aesthetics.",
    budget: 420,
    slots: 4,
    claimed: 4,
    deadline: "2026-06-10",
    category: "Lifestyle",
    requirements: ["60–120 sec video", "Bedroom setup visible", "Before/after preferred", "Min 8K followers"],
    product: "Full bedding set ($120 value)",
    color: "#E6EEF9",
    accent: "#185FA5",
  },
  {
    id: 4,
    brand: "Zest Energy",
    title: "Zest Can Taste Test — Honest Reaction",
    description: "Crack open a Zest can on camera and give your real reaction. No scripts, no polish — just genuine first sip energy. Funny wins.",
    budget: 200,
    slots: 12,
    claimed: 5,
    deadline: "2026-05-25",
    category: "Food & Drink",
    requirements: ["15–30 sec video", "Reaction must be on screen", "Use #ZestEnergy", "Min 3K followers"],
    product: "Case of 12 cans",
    color: "#FEF3C7",
    accent: "#B45309",
  },
  {
    id: 5,
    brand: "CodeNest",
    title: "Show Your Dev Setup with CodeNest",
    description: "Walk through your coding setup using the CodeNest app. Ideal for devs, designers, and students. Show real workflows, hotkeys, aesthetics.",
    budget: 500,
    slots: 3,
    claimed: 1,
    deadline: "2026-06-15",
    category: "Tech",
    requirements: ["60–90 sec video", "Screenshare + face cam", "Mention key features", "Min 15K followers"],
    product: "CodeNest Pro 1-year ($180 value)",
    color: "#EDE9FE",
    accent: "#534AB7",
  },
];

const SAMPLE_SUBMISSIONS = [
  { id: 101, campaignId: 1, campaignTitle: "Morning Routine with Lumé SPF Serum", influencer: "You", videoUrl: "https://tiktok.com/@you/video/123", status: "approved", amount: 280, submittedAt: "2026-05-14" },
  { id: 102, campaignId: 4, campaignTitle: "Zest Can Taste Test — Honest Reaction", influencer: "You", videoUrl: "https://tiktok.com/@you/video/456", status: "pending", amount: 200, submittedAt: "2026-05-17" },
];

const ADMIN_SUBMISSIONS = [
  { id: 201, campaignId: 1, campaignTitle: "Morning Routine with Lumé SPF Serum", influencer: "@glowwith_mia", videoUrl: "https://tiktok.com/@glowwith_mia/video/991", status: "approved", amount: 280, submittedAt: "2026-05-12" },
  { id: 202, campaignId: 2, campaignTitle: "Post-Workout Protein Shake GRWM", influencer: "@jakefitlife", videoUrl: "https://tiktok.com/@jakefitlife/video/882", status: "paid", amount: 350, submittedAt: "2026-05-08", paidAt: "2026-05-12" },
  { id: 203, campaignId: 3, campaignTitle: "Apartment Tour — Novara Bedding", influencer: "@interiors_ada", videoUrl: "https://tiktok.com/@interiors_ada/video/773", status: "pending", amount: 420, submittedAt: "2026-05-18" },
  { id: 101, campaignId: 1, campaignTitle: "Morning Routine with Lumé SPF Serum", influencer: "You", videoUrl: "https://tiktok.com/@you/video/123", status: "approved", amount: 280, submittedAt: "2026-05-14" },
  { id: 102, campaignId: 4, campaignTitle: "Zest Can Taste Test — Honest Reaction", influencer: "You", videoUrl: "https://tiktok.com/@you/video/456", status: "pending", amount: 200, submittedAt: "2026-05-17" },
];

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

function Badge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span style={{ background: s.bg, color: s.text, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.02em" }}>
      {s.label}
    </span>
  );
}

function CategoryTag({ cat }) {
  const c = CATEGORY_COLORS[cat] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {cat}
    </span>
  );
}

function Slots({ claimed, total }) {
  const left = total - claimed;
  return (
    <span style={{ fontSize: 12, color: left === 0 ? "#DC2626" : "#6B7280", fontWeight: 500 }}>
      {left === 0 ? "Full" : `${left} of ${total} spots left`}
    </span>
  );
}

export default function App() {
  const [view, setView] = useState("browse"); // browse | detail | submit | mywork | admin
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [submissions, setSubmissions] = useState(SAMPLE_SUBMISSIONS);
  const [adminSubs, setAdminSubs] = useState(ADMIN_SUBMISSIONS);
  const [claimedIds, setClaimedIds] = useState([1, 4]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitForm, setSubmitForm] = useState({ url: "", handle: "", notes: "" });
  const [submitDone, setSubmitDone] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleClaim = (campaign) => {
    setClaimedIds((prev) => [...prev, campaign.id]);
    showToast(`✓ "${campaign.title}" added to your work`);
  };

  const handleSubmit = () => {
    if (!submitForm.url || !submitForm.handle) return;
    const newSub = {
      id: Date.now(),
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      influencer: submitForm.handle,
      videoUrl: submitForm.url,
      status: "pending",
      amount: selectedCampaign.budget,
      submittedAt: new Date().toISOString().split("T")[0],
    };
    setSubmissions((prev) => [...prev, newSub]);
    setAdminSubs((prev) => [...prev, newSub]);
    setSubmitDone(true);
  };

  const handleAdminAction = (subId, action) => {
    const update = (s) =>
      s.map((x) =>
        x.id === subId
          ? { ...x, status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "paid", paidAt: action === "pay" ? new Date().toISOString().split("T")[0] : x.paidAt }
          : x
      );
    setAdminSubs(update);
    setSubmissions(update);
    showToast(action === "approve" ? "Submission approved" : action === "reject" ? "Submission rejected" : "Marked as paid");
  };

  const cats = ["All", ...Array.from(new Set(CAMPAIGNS.map((c) => c.category)))];
  const filtered = filterCat === "All" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.category === filterCat);
  const weeklyQueue = adminSubs.filter((s) => s.status === "approved");
  const weeklyTotal = weeklyQueue.reduce((a, s) => a + s.amount, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", background: "#F7F6F3", color: "#18181B" }}>
      {/* Toast */}
      {toastMsg && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#18181B", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
          {toastMsg}
        </div>
      )}

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#18181B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8l3 3M11 8l-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>CreatorBrief</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["browse", "mywork"].map((v) => (
            <button key={v} onClick={() => { setView(v); setSubmitDone(false); }}
              style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, background: view === v ? "#18181B" : "transparent", color: view === v ? "#fff" : "#6B7280", transition: "all 0.15s" }}>
              {v === "browse" ? "Browse Briefs" : "My Work"}
            </button>
          ))}
          <button onClick={() => { setIsAdmin(!isAdmin); setView(isAdmin ? "browse" : "admin"); }}
            style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", fontSize: 13, fontWeight: 500, background: isAdmin ? "#EDE9FE" : "#fff", color: isAdmin ? "#534AB7" : "#6B7280", marginLeft: 8 }}>
            {isAdmin ? "⬡ Admin Mode ON" : "Admin"}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 24px" }}>

        {/* BROWSE VIEW */}
        {view === "browse" && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Open Briefs</h1>
              <p style={{ color: "#6B7280", fontSize: 15, margin: 0 }}>Pick a brand brief, make the video, get paid every Monday.</p>
            </div>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {cats.map((c) => (
                <button key={c} onClick={() => setFilterCat(c)}
                  style={{ padding: "6px 16px", borderRadius: 20, border: "1.5px solid", borderColor: filterCat === c ? "#18181B" : "#E5E7EB", background: filterCat === c ? "#18181B" : "#fff", color: filterCat === c ? "#fff" : "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.1s" }}>
                  {c}
                </button>
              ))}
            </div>
            {/* Campaign grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {filtered.map((campaign) => {
                const isFull = campaign.claimed >= campaign.slots;
                const isClaimed = claimedIds.includes(campaign.id);
                return (
                  <div key={campaign.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", transition: "transform 0.15s, box-shadow 0.15s", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ height: 8, background: campaign.accent }} />
                    <div style={{ padding: "18px 20px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <CategoryTag cat={campaign.category} />
                        <Slots claimed={campaign.claimed} total={campaign.slots} />
                      </div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 4px" }}>{campaign.brand}</p>
                      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em", lineHeight: 1.35 }}>{campaign.title}</h2>
                      <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", lineHeight: 1.55 }}>{campaign.description.slice(0, 110)}…</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>AU${campaign.budget}</span>
                          <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 4 }}>per video</span>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => { setSelectedCampaign(campaign); setView("detail"); }}
                            style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>
                            View
                          </button>
                          {isClaimed ? (
                            <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#F0FDF4", color: "#16A34A", fontSize: 13, fontWeight: 600, cursor: "default" }}>✓ Claimed</button>
                          ) : (
                            <button onClick={() => !isFull && handleClaim(campaign)} disabled={isFull}
                              style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: isFull ? "#F3F4F6" : "#18181B", color: isFull ? "#9CA3AF" : "#fff", fontSize: 13, fontWeight: 600, cursor: isFull ? "not-allowed" : "pointer", transition: "opacity 0.1s" }}>
                              {isFull ? "Full" : "Claim"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && selectedCampaign && (
          <>
            <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, fontWeight: 500, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
              ← Back to briefs
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                  <CategoryTag cat={selectedCampaign.category} />
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>{selectedCampaign.brand}</span>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 16px" }}>{selectedCampaign.title}</h1>
                <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, margin: "0 0 28px" }}>{selectedCampaign.description}</p>

                <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>Requirements</h3>
                <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedCampaign.requirements.map((r, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: selectedCampaign.accent, flexShrink: 0 }} />
                      {r}
                    </li>
                  ))}
                </ul>

                <div style={{ background: selectedCampaign.color, borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>🎁</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: selectedCampaign.accent, textTransform: "uppercase", letterSpacing: "0.04em" }}>Product Included</p>
                    <p style={{ margin: 0, fontSize: 14, color: "#374151", fontWeight: 500 }}>{selectedCampaign.product}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "24px 22px", position: "sticky", top: 80 }}>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>AU${selectedCampaign.budget}</span>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "#9CA3AF" }}>Paid within 7 days of approval</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {[
                      ["Deadline", new Date(selectedCampaign.deadline).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })],
                      ["Spots remaining", `${selectedCampaign.slots - selectedCampaign.claimed} of ${selectedCampaign.slots}`],
                      ["Payment schedule", "Weekly (Mondays)"],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "#9CA3AF" }}>{label}</span>
                        <span style={{ fontWeight: 600, color: "#374151" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 1, background: "#F3F4F6", margin: "16px 0" }} />
                  {claimedIds.includes(selectedCampaign.id) ? (
                    <button onClick={() => { setSubmitDone(false); setSubmitForm({ url: "", handle: "", notes: "" }); setView("submit"); }}
                      style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em" }}>
                      Submit My Video
                    </button>
                  ) : selectedCampaign.claimed >= selectedCampaign.slots ? (
                    <button disabled style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: "#F3F4F6", color: "#9CA3AF", fontSize: 15, fontWeight: 700, cursor: "not-allowed" }}>
                      All spots filled
                    </button>
                  ) : (
                    <button onClick={() => { handleClaim(selectedCampaign); }}
                      style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                      Claim This Brief
                    </button>
                  )}
                  <p style={{ textAlign: "center", fontSize: 12, color: "#D1D5DB", margin: "10px 0 0" }}>No commitment until you submit</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SUBMIT VIEW */}
        {view === "submit" && selectedCampaign && (
          <>
            <button onClick={() => setView("detail")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, fontWeight: 500, marginBottom: 24, padding: 0 }}>
              ← Back to brief
            </button>
            {submitDone ? (
              <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
                <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>✓</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>Video submitted!</h2>
                <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 28 }}>We'll review it within 48 hours. If approved, payment of <strong>AU${selectedCampaign.budget}</strong> goes out on the next Monday payout.</p>
                <button onClick={() => { setView("mywork"); setSubmitDone(false); }}
                  style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: "#18181B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  View My Submissions
                </button>
              </div>
            ) : (
              <div style={{ maxWidth: 520 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 4px" }}>Submit Your Video</h1>
                <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>For: <strong>{selectedCampaign.title}</strong></p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "Your TikTok Handle", id: "handle", placeholder: "@yourhandle", type: "text" },
                    { label: "TikTok Video URL", id: "url", placeholder: "https://tiktok.com/@you/video/...", type: "url" },
                  ].map(({ label, id, placeholder, type }) => (
                    <div key={id}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                      <input type={type} value={submitForm[id]} placeholder={placeholder}
                        onChange={(e) => setSubmitForm((p) => ({ ...p, [id]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Notes (optional)</label>
                    <textarea value={submitForm.notes} placeholder="Anything you want us to know about this video..."
                      onChange={(e) => setSubmitForm((p) => ({ ...p, notes: e.target.value }))}
                      rows={3}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={handleSubmit} disabled={!submitForm.url || !submitForm.handle}
                    style={{ padding: "13px 0", borderRadius: 10, border: "none", background: submitForm.url && submitForm.handle ? "#18181B" : "#E5E7EB", color: submitForm.url && submitForm.handle ? "#fff" : "#9CA3AF", fontSize: 15, fontWeight: 700, cursor: submitForm.url && submitForm.handle ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
                    Submit for Review
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* MY WORK VIEW */}
        {view === "mywork" && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>My Work</h1>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Track your claimed briefs, submissions, and payments.</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
              {[
                { label: "Claimed Briefs", value: claimedIds.length },
                { label: "Submitted Videos", value: submissions.length },
                { label: "Total Earned", value: `AU$${submissions.filter((s) => s.status === "paid").reduce((a, s) => a + s.amount, 0)}` },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px 18px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Claimed but not submitted */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Claimed Briefs</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {CAMPAIGNS.filter((c) => claimedIds.includes(c.id)).map((c) => {
                const submitted = submissions.some((s) => s.campaignId === c.id);
                return (
                  <div key={c.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{c.title}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{c.brand} · AU${c.budget} · Due {new Date(c.deadline).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</p>
                    </div>
                    {submitted ? (
                      <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, background: "#F0FDF4", padding: "4px 12px", borderRadius: 20 }}>Submitted</span>
                    ) : (
                      <button onClick={() => { setSelectedCampaign(c); setSubmitDone(false); setSubmitForm({ url: "", handle: "", notes: "" }); setView("submit"); }}
                        style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: "#18181B", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        Submit Video
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submissions */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Submissions</h2>
            {submissions.length === 0 ? (
              <p style={{ color: "#9CA3AF", fontSize: 14 }}>No submissions yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {submissions.map((s) => (
                  <div key={s.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{s.campaignTitle}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Submitted {s.submittedAt} · <a href={s.videoUrl} style={{ color: "#185FA5", textDecoration: "none" }}>View video ↗</a></p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Badge status={s.status} />
                      <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>AU${s.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ADMIN VIEW */}
        {view === "admin" && (
          <>
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

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Total Submissions", value: adminSubs.length, color: "#F9FAFB", text: "#111" },
                { label: "Pending Review", value: adminSubs.filter((s) => s.status === "pending").length, color: "#FEF3C7", text: "#92400E" },
                { label: "Approved", value: adminSubs.filter((s) => s.status === "approved").length, color: "#D1FAE5", text: "#065F46" },
                { label: "Paid Out", value: adminSubs.filter((s) => s.status === "paid").length, color: "#DBEAFE", text: "#1E40AF" },
              ].map(({ label, value, color, text }) => (
                <div key={label} style={{ background: color, border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 16px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, color: text, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: text }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Submissions table */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>All Submissions</span>
                <button onClick={() => {
                  const toPayIds = adminSubs.filter((s) => s.status === "approved").map((s) => s.id);
                  setAdminSubs((prev) => prev.map((s) => toPayIds.includes(s.id) ? { ...s, status: "paid", paidAt: new Date().toISOString().split("T")[0] } : s));
                  setSubmissions((prev) => prev.map((s) => toPayIds.includes(s.id) ? { ...s, status: "paid", paidAt: new Date().toISOString().split("T")[0] } : s));
                  showToast(`✓ AU$${weeklyTotal} payout processed for ${weeklyQueue.length} creators`);
                }} disabled={weeklyQueue.length === 0}
                  style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: weeklyQueue.length ? "#18181B" : "#F3F4F6", color: weeklyQueue.length ? "#fff" : "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: weeklyQueue.length ? "pointer" : "not-allowed" }}>
                  Run Weekly Payout (AU${weeklyTotal})
                </button>
              </div>
              {adminSubs.map((s, i) => (
                <div key={`${s.id}-${i}`} style={{ padding: "14px 20px", borderBottom: i < adminSubs.length - 1 ? "1px solid #F9FAFB" : "none", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.campaignTitle}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{s.influencer} · {s.submittedAt} · <a href={s.videoUrl} style={{ color: "#185FA5", textDecoration: "none" }}>View ↗</a></p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, minWidth: 70, textAlign: "right" }}>AU${s.amount}</span>
                  <Badge status={s.status} />
                  {s.status === "pending" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => handleAdminAction(s.id, "approve")}
                        style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#D1FAE5", color: "#065F46", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Approve</button>
                      <button onClick={() => handleAdminAction(s.id, "reject")}
                        style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#FEE2E2", color: "#991B1B", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reject</button>
                    </div>
                  )}
                  {s.status === "approved" && (
                    <button onClick={() => handleAdminAction(s.id, "pay")}
                      style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#DBEAFE", color: "#1E40AF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Mark Paid</button>
                  )}
                  {(s.status === "paid" || s.status === "rejected") && <div style={{ width: 80 }} />}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
