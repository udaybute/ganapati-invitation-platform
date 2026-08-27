import Image from "next/image";
import { Inter } from "next/font/google";

import { isAdmin, adminLogin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  approveMandal,
  rejectMandal,
} from "@/lib/admin-actions";

import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import DeleteButton from "@/components/admin/DeleteButton";
import UnapproveButton from "@/components/admin/UnapproveButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Accepts either a full invitation URL or a bare slug and returns just the slug —
// so the search box works whether the admin pastes "https://site.com/jay-ganesj" or just "jay-ganesj".
function extractSlug(input: string): string {
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    return url.pathname.replace(/^\/+/, "").split("/")[0];
  } catch {
    return trimmed.replace(/^\/+/, "");
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const loggedIn = await isAdmin();

  /*
  ============================================================
  LOGIN
  ============================================================
  */

  if (!loggedIn) {
    return (
      <main className={`admin-login-page ${inter.className}`}>
        <div className="admin-background" />
        <div className="admin-overlay" />

        <div className="login-glow login-glow-one" />
        <div className="login-glow login-glow-two" />

        <div className="login-top-actions">
          <AdminThemeToggle />
        </div>

        <div className="login-card">

          {/* LOGO */}
          <div className="login-logo-wrapper">
            <Image
              src="/background/elvatrixa_logo.png"
              alt="Elvatrixa"
              width={100}
              height={100}
              priority
              className="login-logo"
            />
          </div>

          <p className="login-mantra">
            ॥ श्री गणेशाय नमः ॥
          </p>

          <h1 className="login-title">
            Admin Panel
          </h1>

          <p className="login-description">
            Manage your Ganpati invitation submissions
            from one secure dashboard.
          </p>

          <form
            action={async (formData: FormData) => {
              "use server";
              await adminLogin(formData);
            }}
            className="login-form"
          >
            <div className="input-group">
              <label htmlFor="admin-password">
                Admin Password
              </label>

              <input
                id="admin-password"
                type="password"
                name="password"
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              <span>Login to Dashboard</span>
              <span className="button-arrow">→</span>
            </button>
          </form>

          <div className="login-security">
            <span className="security-dot" />
            Secure Admin Access
          </div>

          <p className="login-powered">
            Powered by Elvatrixa
          </p>
        </div>
      </main>
    );
  }

  /*
  ============================================================
  DATA / BUSINESS LOGIC
  ============================================================
  */

  const { data: pending, error: pendingError } =
    await supabaseAdmin
      .from("mandals")
      .select("*")
      .eq("status", "pending")
      .order("created_at", {
        ascending: false,
      });

  const { data: approved, error: approvedError } =
    await supabaseAdmin
      .from("mandals")
      .select(
        "id, slug, mandal_name, created_at, edit_token"
      )
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      })
      .limit(20);

  const queryError =
    pendingError || approvedError;

  /*
  ============================================================
  REVENUE
  ============================================================
  */

  const { data: paidMandals } = await supabaseAdmin
    .from("mandals")
    .select("amount, created_at")
    .eq("payment_status", "paid");

  const totalRevenue = (paidMandals ?? []).reduce((sum, m) => sum + (m.amount ?? 0), 0);
  const paidCount = paidMandals?.length ?? 0;

  const now = new Date();
  const thisMonthRevenue = (paidMandals ?? [])
    .filter((m) => {
      const d = new Date(m.created_at as string);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, m) => sum + (m.amount ?? 0), 0);

  const unpaidPendingCount = (pending ?? []).filter((m) => m.payment_status !== "paid").length;
  const potentialRevenue = unpaidPendingCount * 499;

  /*
  ============================================================
  SEARCH
  ============================================================
  */

  const { q } = await searchParams;
  const query = q ?? "";
  let searchResult: any = null;
  let searchNotFound = false;

  if (query.trim()) {
    const slugCandidate = extractSlug(query);
    const { data } = await supabaseAdmin
      .from("mandals")
      .select("*")
      .eq("slug", slugCandidate)
      .maybeSingle();
    if (data) searchResult = data;
    else searchNotFound = true;
  }

  /*
  ============================================================
  DASHBOARD
  ============================================================
  */

  return (
    <main
      className={`admin-page ${inter.className}`}
    >
      <div className="admin-background" />
      <div className="admin-overlay" />

      <div className="admin-container">

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="dashboard-header">

          <div className="header-left">

            <div className="brand-row">

              {/* LOGO */}
              <div className="brand-logo-wrapper">
                <Image
                  src="/background/elvatrixa_logo.png"
                  alt="Elvatrixa"
                  width={64}
                  height={64}
                  priority
                  className="brand-logo"
                />
              </div>

              <div className="brand-divider" />

              <div>
                <p className="brand-small">
                  ELVATRIXA
                </p>

                <p className="brand-label">
                  Ganpati Invitation Platform
                </p>
              </div>

            </div>

            <h1 className="dashboard-title">
              Admin Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Review, approve and manage invitation
              submissions from one place.
            </p>

          </div>

          <div className="header-actions">

            <div className="dashboard-status">
              <span className="status-dot" />
              System Online
            </div>

            <AdminThemeToggle />

          </div>

        </header>

        {/* ==================================================
            SEARCH
        ================================================== */}

        <form
          action="/admin"
          method="GET"
          style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}
        >
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Client ka invitation link ya slug paste karo (उदा. jay-ganesj)"
            style={{
              flex: "1 1 260px",
              padding: "13px 18px",
              borderRadius: 999,
              border: "1px solid rgba(120,90,30,0.25)",
              fontSize: 14,
              background: "rgba(255,255,255,0.6)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "13px 26px",
              borderRadius: 999,
              background: "#111827",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Search
          </button>
        </form>

        {query.trim() && (
          <section style={{ marginBottom: 32 }}>
            {searchResult ? (
              <article className="submission-card">
                <div className="submission-header">
                  <div className="submission-main">
                    <div className="mandal-avatar">
                      {searchResult.mandal_name?.charAt(0)?.toUpperCase() || "G"}
                    </div>
                    <div>
                      <h3 className="mandal-name">{searchResult.mandal_name}</h3>
                      <p className="mandal-slug">/{searchResult.slug}</p>
                    </div>
                  </div>
                  <span className="pending-badge" style={{ textTransform: "capitalize" }}>
                    {searchResult.status}
                  </span>
                </div>

                <div style={{ padding: "0 20px 16px", fontSize: 13, lineHeight: 1.8, opacity: 0.85 }}>
                  <p>📞 {searchResult.contact}</p>
                  <p>📍 {searchResult.address}</p>
                  <p>
                    💳 Payment: {searchResult.payment_status}
                    {searchResult.payment_status === "paid" ? ` (₹${searchResult.amount})` : ""}
                  </p>
                  <p>
                    📅 Submitted:{" "}
                    {new Date(searchResult.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="submission-actions">
                  <div className="action-buttons" style={{ flexWrap: "wrap" }}>
                    {searchResult.status !== "approved" && (
                      <form
                        action={async () => {
                          "use server";
                          await approveMandal(searchResult.id);
                        }}
                      >
                        <button type="submit" className="approve-button">
                          <span>✓</span>
                          Approve & Publish
                        </button>
                      </form>
                    )}

                    {searchResult.status === "approved" && (
                      <UnapproveButton id={searchResult.id} />
                    )}

                    {searchResult.status !== "rejected" && (
                      <form
                        action={async () => {
                          "use server";
                          await rejectMandal(searchResult.id);
                        }}
                      >
                        <button type="submit" className="reject-button">
                          <span>×</span>
                          Reject
                        </button>
                      </form>
                    )}

                    <a
                      href={`/edit/${searchResult.edit_token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="approve-button"
                      style={{ background: "#2563eb", textDecoration: "none", display: "inline-flex" }}
                    >
                      <span>✎</span>
                      Edit
                    </a>

                    {searchResult.status === "approved" && (
                      <a
                        href={`/${searchResult.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="approve-button"
                        style={{ background: "#059669", textDecoration: "none", display: "inline-flex" }}
                      >
                        <span>↗</span>
                        View Live
                      </a>
                    )}

                    <DeleteButton id={searchResult.id} label="Delete" />
                  </div>
                </div>
              </article>
            ) : searchNotFound ? (
              <div className="empty-state">
                <div className="empty-icon">?</div>
                <h3>Koi match nahi mila</h3>
                <p>Slug ya link check karke dobara try karo.</p>
              </div>
            ) : null}
          </section>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {queryError && (
          <div className="error-card">

            <div className="error-icon">
              !
            </div>

            <div className="error-content">

              <p className="error-title">
                Database Query Error
              </p>

              <p className="error-message">
                {queryError.message}
              </p>

              <p className="error-help">
                Check SUPABASE_SECRET_KEY in
                .env.local. Use the Supabase
                Secret key, not the Publishable key.
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            STATS
        ================================================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                Pending Review
              </span>

              <span className="stat-icon pending-icon">
                ⏳
              </span>

            </div>

            <p className="stat-value">
              {pending?.length ?? 0}
            </p>

            <p className="stat-description">
              Submissions waiting for approval
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                Recently Approved
              </span>

              <span className="stat-icon approved-icon">
                ✓
              </span>

            </div>

            <p className="stat-value">
              {approved?.length ?? 0}
            </p>

            <p className="stat-description">
              Latest approved invitations
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                Platform Status
              </span>

              <span className="stat-icon platform-icon">
                ✦
              </span>

            </div>

            <p className="stat-value stat-live">
              LIVE
            </p>

            <p className="stat-description">
              Invitation platform is active
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                Total Revenue
              </span>

              <span className="stat-icon approved-icon">
                ₹
              </span>

            </div>

            <p className="stat-value">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>

            <p className="stat-description">
              From {paidCount} paid client{paidCount === 1 ? "" : "s"}
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                This Month
              </span>

              <span className="stat-icon platform-icon">
                📈
              </span>

            </div>

            <p className="stat-value">
              ₹{thisMonthRevenue.toLocaleString("en-IN")}
            </p>

            <p className="stat-description">
              Revenue this calendar month
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-label">
                Potential Revenue
              </span>

              <span className="stat-icon pending-icon">
                ⏳
              </span>

            </div>

            <p className="stat-value">
              ₹{potentialRevenue.toLocaleString("en-IN")}
            </p>

            <p className="stat-description">
              {unpaidPendingCount} unpaid submission{unpaidPendingCount === 1 ? "" : "s"} waiting
            </p>

          </div>

        </section>

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <div className="section-heading-row">

                <h2 className="section-title">
                  Pending Submissions
                </h2>

                <span className="count-badge">
                  {pending?.length ?? 0}
                </span>

              </div>

              <p className="section-description">
                Review client information before
                publishing.
              </p>

            </div>

          </div>

          {/* EMPTY STATE */}

          {pending?.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                All caught up!
              </h3>

              <p>
                There are no pending submissions
                right now.
              </p>

            </div>
          )}

          {/* SUBMISSIONS */}

          <div className="submission-list">

            {pending?.map((m) => {

              const gallery =
                (m.gallery as any[]) ?? [];

              const timeline =
                (m.timeline as any[]) ?? [];

              return (
                <article
                  key={m.id}
                  className="submission-card"
                >

                  {/* CARD HEADER */}

                  <div className="submission-header">

                    <div className="submission-main">

                      <div className="mandal-avatar">
                        {m.mandal_name
                          ?.charAt(0)
                          ?.toUpperCase() || "G"}
                      </div>

                      <div>

                        <h3 className="mandal-name">
                          {m.mandal_name}
                        </h3>

                        <p className="mandal-slug">
                          /{m.slug}
                        </p>

                      </div>

                    </div>

                    <span className="pending-badge">
                      <span className="badge-dot" />
                      Pending
                    </span>

                  </div>

                  {/* INFORMATION */}

                  <div className="submission-info">

                    <div className="info-item">

                      <span className="info-icon">
                        📞
                      </span>

                      <div>
                        <span className="info-label">
                          Contact
                        </span>

                        <span className="info-value">
                          {m.contact || "—"}
                        </span>
                      </div>

                    </div>

                    <div className="info-item">

                      <span className="info-icon">
                        📍
                      </span>

                      <div>
                        <span className="info-label">
                          Address
                        </span>

                        <span className="info-value">
                          {m.address || "—"}
                        </span>
                      </div>

                    </div>

                    <div className="info-item">

                      <span className="info-icon">
                        📅
                      </span>

                      <div>
                        <span className="info-label">
                          Submitted
                        </span>

                        <span className="info-value">
                          {m.created_at
                            ? new Date(
                                m.created_at
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* METADATA */}

                  <div className="metadata-row">

                    <div className="metadata-item">
                      <span>📸</span>
                      {gallery.length} Photos
                    </div>

                    <div className="metadata-item">
                      <span>🎉</span>
                      {timeline.length} Events
                    </div>

                    {m.language && (
                      <div className="metadata-item">
                        <span>🌐</span>
                        {m.language.toUpperCase()}
                      </div>
                    )}

                  </div>

                  {/* GALLERY */}

                  {gallery.length > 0 && (
                    <div className="gallery-section">

                      <div className="gallery-header">

                        <span>
                          Photo Preview
                        </span>

                        <span>
                          {gallery.length} images
                        </span>

                      </div>

                      <div className="gallery-grid">

                        {gallery
                          .slice(0, 6)
                          .map((g, i) => (
                            <div
                              key={i}
                              className="gallery-image"
                            >
                              <img
                                src={g.url}
                                alt={`Gallery ${
                                  i + 1
                                }`}
                              />
                            </div>
                          ))}

                        {gallery.length > 6 && (
                          <div className="more-images">
                            +{gallery.length - 6}
                          </div>
                        )}

                      </div>

                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="submission-actions">

                    <p className="action-hint">
                      Review all details before
                      approval.
                    </p>

                    <div className="action-buttons">

                      <form
                        action={async () => {
                          "use server";
                          await rejectMandal(m.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="reject-button"
                        >
                          <span>×</span>
                          Reject
                        </button>
                      </form>

                      <a
                        href={`/edit/${m.edit_token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="approve-button"
                        style={{ background: "#2563eb", textDecoration: "none", display: "inline-flex" }}
                      >
                        <span>✎</span>
                        Edit
                      </a>

                      <DeleteButton id={m.id} label="Delete" />

                      <form
                        action={async () => {
                          "use server";
                          await approveMandal(m.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="approve-button"
                        >
                          <span>✓</span>
                          Approve & Publish
                        </button>
                      </form>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </section>

        {/* ==================================================
            APPROVED
        ================================================== */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <div className="section-heading-row">

                <h2 className="section-title">
                  Recently Approved
                </h2>

                <span className="count-badge approved-count">
                  {approved?.length ?? 0}
                </span>

              </div>

              <p className="section-description">
                Quickly access recently published
                invitations.
              </p>

            </div>

          </div>

          <div className="approved-list">

            {approved?.map((m: any) => (
              <div
                key={m.id}
                className="approved-item"
                style={{ cursor: "default" }}
              >

                <a
                  href={`/${m.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="approved-left"
                  style={{ textDecoration: "none", color: "inherit" }}
                >

                  <div className="approved-avatar">
                    {m.mandal_name
                      ?.charAt(0)
                      ?.toUpperCase() || "G"}
                  </div>

                  <div>

                    <p className="approved-name">
                      {m.mandal_name}
                    </p>

                    <p className="approved-slug">
                      /{m.slug}
                    </p>

                  </div>

                </a>

                <div className="approved-right" style={{ gap: 8 }}>

                  <span className="live-badge">
                    LIVE
                  </span>

                  <a
                    href={`/edit/${m.edit_token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Edit"
                    style={{
                      textDecoration: "none",
                      color: "#2563eb",
                      fontSize: 15,
                    }}
                  >
                    ✎
                  </a>

                  <UnapproveButton id={m.id} />

                  <DeleteButton id={m.id} label="🗑" />

                  <a
                    href={`/${m.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-arrow"
                  >
                    ↗
                  </a>

                </div>

              </div>
            ))}

            {approved?.length === 0 && (
              <div className="approved-empty">
                No approved invitations yet.
              </div>
            )}

          </div>

        </section>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="dashboard-footer">

          <span>
            Ganpati Invitation Platform
          </span>

          <span className="footer-dot">
            •
          </span>

          <span>
            Powered by Elvatrixa
          </span>

        </footer>

      </div>

      {/* ====================================================
          STYLES
      ==================================================== */}

      <style>{`

        /* ==================================================
           THEME VARIABLES
        ================================================== */

        :root {

          --admin-bg: #080808;
          --admin-bg-secondary: #111111;

          --admin-card: #121212;
          --admin-card-hover: #181818;

          --admin-border: #292929;

          --admin-text: #ffffff;
          --admin-text-soft: #d4d4d4;
          --admin-text-muted: #858585;

          --admin-input-bg: #0e0e0e;

          --admin-gold: #f59e0b;
          --admin-gold-light: #fbbf24;

          --admin-green: #22c55e;
          --admin-red: #ef4444;

          --admin-shadow:
            0 20px 60px rgba(0,0,0,0.35);
        }


        /* ==================================================
           LIGHT MODE
        ================================================== */

        html.admin-light {

          --admin-bg: #ffffff;
          --admin-bg-secondary: #ffffff;

          --admin-card: #ffffff;
          --admin-card-hover: #fafafa;

          --admin-border: #e5e5e5;

          --admin-text: #111111;
          --admin-text-soft: #333333;
          --admin-text-muted: #666666;

          --admin-input-bg: #ffffff;

          --admin-gold: #b86b00;
          --admin-gold-light: #9a5a00;

          --admin-green: #15803d;
          --admin-red: #dc2626;

          --admin-shadow:
            0 15px 45px rgba(0,0,0,0.07);
        }


        /* ==================================================
           RESET
        ================================================== */

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }


        /* ==================================================
           MAIN PAGE
        ================================================== */

        .admin-page,
        .admin-login-page {

          position: relative;

          min-height: 100vh;

          overflow-x: hidden;

          background:
            var(--admin-bg);

          color:
            var(--admin-text);

          transition:
            background-color 300ms ease,
            color 300ms ease;
        }


        /* ==================================================
           BACKGROUND
        ================================================== */

        .admin-background {

          position: fixed;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 80% 5%,
              rgba(245,158,11,0.07),
              transparent 25%
            ),
            radial-gradient(
              circle at 15% 90%,
              rgba(245,158,11,0.04),
              transparent 28%
            ),
            var(--admin-bg);

          transition:
            background 300ms ease;
        }


        .admin-overlay {

          position: fixed;

          inset: 0;

          z-index: 0;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(0,0,0,0.08)
            );
        }


        html.admin-light .admin-overlay {
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.3),
              rgba(255,255,255,0)
            );
        }


        /* ==================================================
           CONTAINER
        ================================================== */

        .admin-container {

          position: relative;

          z-index: 1;

          width: 100%;

          max-width: 1180px;

          margin: 0 auto;

          padding:
            34px 20px 60px;
        }


        /* ==================================================
           HEADER
        ================================================== */

        .dashboard-header {

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 30px;

          margin-bottom: 30px;

          animation:
            fadeUp 600ms ease both;
        }


        .header-left {
          min-width: 0;
        }


        .brand-row {

          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 20px;
        }


        /* ==================================================
           LOGO
        ================================================== */

        .brand-logo-wrapper {

          width: 52px;

          height: 52px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border:
            1px solid
            rgba(245,158,11,0.25);

          border-radius: 14px;

          background:
            #171717;

          overflow: hidden;

          box-shadow:
            0 8px 25px rgba(0,0,0,0.18);

          transition:
            transform 250ms ease,
            border-color 250ms ease;
        }


        .brand-logo-wrapper:hover {

          transform:
            translateY(-2px);

          border-color:
            rgba(245,158,11,0.5);
        }


        .brand-logo {

          width: 100%;

          height: 100%;

          object-fit: contain;

          padding: 7px;
        }


        html.admin-light .brand-logo-wrapper {

          background:
            #111111;

          border-color:
            #d4d4d4;
        }


        .brand-divider {

          width: 1px;

          height: 32px;

          background:
            var(--admin-border);
        }


        .brand-small {

          margin: 0;

          color:
            var(--admin-gold);

          font-size: 9px;

          font-weight: 800;

          letter-spacing:
            0.25em;
        }


        .brand-label {

          margin:
            3px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 10px;
        }


        .dashboard-title {

          margin: 0;

          color:
            var(--admin-text);

          font-size:
            clamp(28px, 4vw, 42px);

          line-height: 1.1;

          font-weight: 750;

          letter-spacing:
            -0.04em;
        }


        .dashboard-subtitle {

          margin:
            9px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 13px;

          line-height: 1.5;
        }


        /* ==================================================
           HEADER ACTIONS
        ================================================== */

        .header-actions {

          display: flex;

          align-items: center;

          gap: 10px;

          flex-shrink: 0;
        }


        .dashboard-status {

          display: flex;

          align-items: center;

          gap: 8px;

          padding:
            9px 13px;

          border:
            1px solid
            rgba(34,197,94,0.2);

          border-radius:
            999px;

          color:
            var(--admin-green);

          background:
            rgba(34,197,94,0.06);

          font-size: 10px;

          font-weight: 650;
        }


        .status-dot {

          width: 7px;

          height: 7px;

          border-radius:
            50%;

          background:
            #22c55e;

          box-shadow:
            0 0 12px
            rgba(34,197,94,0.7);

          animation:
            pulse 2s infinite;
        }


        /* ==================================================
           THEME TOGGLE
        ================================================== */

        .theme-toggle {

          width: 72px;

          height: 38px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 4px;

          border:
            1px solid
            var(--admin-border);

          border-radius:
            999px;

          background:
            var(--admin-card);

          color:
            var(--admin-text);

          cursor: pointer;

          transition:
            all 250ms ease;
        }


        .theme-toggle:hover {

          border-color:
            var(--admin-gold);
        }


        .theme-toggle-option {

          width: 29px;

          height: 29px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius:
            50%;

          color:
            var(--admin-text-muted);

          font-size: 13px;

          transition:
            all 250ms ease;
        }


        .theme-toggle-option.active {

          color:
            var(--admin-text);

          background:
            var(--admin-bg);

          box-shadow:
            0 2px 8px
            rgba(0,0,0,0.12);
        }


        /* ==================================================
           STATS
        ================================================== */

        .stats-grid {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;

          margin-bottom: 38px;
        }


        .stat-card {

          padding: 20px;

          border:
            1px solid
            var(--admin-border);

          border-radius: 18px;

          background:
            var(--admin-card);

          box-shadow:
            var(--admin-shadow);

          transition:
            transform 250ms ease,
            background 250ms ease,
            border-color 250ms ease;
        }


        .stat-card:hover {

          transform:
            translateY(-3px);

          background:
            var(--admin-card-hover);

          border-color:
            var(--admin-gold);
        }


        .stat-top {

          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }


        .stat-label {

          color:
            var(--admin-text-muted);

          font-size: 11px;

          font-weight: 600;
        }


        .stat-icon {

          width: 32px;

          height: 32px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          font-size: 13px;
        }


        .pending-icon {

          background:
            rgba(245,158,11,0.1);
        }


        .approved-icon {

          color:
            var(--admin-green);

          background:
            rgba(34,197,94,0.1);
        }


        .platform-icon {

          color:
            var(--admin-gold);

          background:
            rgba(245,158,11,0.1);
        }


        .stat-value {

          margin:
            17px 0 5px;

          color:
            var(--admin-text);

          font-size: 28px;

          line-height: 1;

          font-weight: 750;
        }


        .stat-live {

          color:
            var(--admin-green);

          font-size: 21px;
        }


        .stat-description {

          margin: 0;

          color:
            var(--admin-text-muted);

          font-size: 10px;
        }


        /* ==================================================
           ERROR
        ================================================== */

        .error-card {

          display: flex;

          gap: 13px;

          margin-bottom: 28px;

          padding: 16px;

          border:
            1px solid
            rgba(239,68,68,0.25);

          border-radius: 16px;

          background:
            rgba(239,68,68,0.06);

          animation:
            fadeUp 400ms ease both;
        }


        .error-icon {

          width: 30px;

          height: 30px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          color:
            var(--admin-red);

          background:
            rgba(239,68,68,0.1);

          font-weight: 800;
        }


        .error-title {

          margin: 0;

          color:
            var(--admin-red);

          font-size: 13px;

          font-weight: 700;
        }


        .error-message {

          margin:
            4px 0 0;

          color:
            var(--admin-text-soft);

          font-size: 11px;
        }


        .error-help {

          margin:
            8px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 10px;

          line-height: 1.5;
        }


        /* ==================================================
           SECTIONS
        ================================================== */

        .dashboard-section {

          margin-bottom: 42px;
        }


        .section-header {

          margin-bottom: 16px;
        }


        .section-heading-row {

          display: flex;

          align-items: center;

          gap: 9px;
        }


        .section-title {

          margin: 0;

          color:
            var(--admin-text);

          font-size: 19px;

          font-weight: 700;
        }


        .section-description {

          margin:
            5px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 11px;
        }


        .count-badge {

          min-width: 25px;

          height: 23px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding:
            0 7px;

          border-radius:
            999px;

          color:
            var(--admin-gold);

          background:
            rgba(245,158,11,0.1);

          font-size: 10px;

          font-weight: 700;
        }


        .approved-count {

          color:
            var(--admin-green);

          background:
            rgba(34,197,94,0.1);
        }


        /* ==================================================
           SUBMISSIONS
        ================================================== */

        .submission-list {

          display: flex;

          flex-direction: column;

          gap: 14px;
        }


        .submission-card {

          overflow: hidden;

          border:
            1px solid
            var(--admin-border);

          border-radius: 20px;

          background:
            var(--admin-card);

          box-shadow:
            var(--admin-shadow);

          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease;
        }


        .submission-card:hover {

          border-color:
            var(--admin-gold);

          transform:
            translateY(-2px);
        }


        .submission-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding:
            19px 20px;
        }


        .submission-main {

          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 0;
        }


        .mandal-avatar,
        .approved-avatar {

          width: 44px;

          height: 44px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 13px;

          color:
            var(--admin-gold);

          background:
            rgba(245,158,11,0.1);

          border:
            1px solid
            rgba(245,158,11,0.15);

          font-size: 16px;

          font-weight: 750;
        }


        .mandal-name {

          margin: 0;

          color:
            var(--admin-text);

          font-size: 15px;

          font-weight: 700;

          word-break: break-word;
        }


        .mandal-slug {

          margin:
            4px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 10px;
        }


        .pending-badge {

          display: flex;

          align-items: center;

          gap: 6px;

          padding:
            7px 10px;

          flex-shrink: 0;

          border-radius:
            999px;

          color:
            var(--admin-gold);

          background:
            rgba(245,158,11,0.08);

          font-size: 10px;

          font-weight: 650;
        }


        .badge-dot {

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background:
            var(--admin-gold);
        }


        /* ==================================================
           INFO
        ================================================== */

        .submission-info {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 10px;

          padding:
            0 20px 16px;
        }


        .info-item {

          display: flex;

          gap: 9px;

          min-width: 0;

          padding: 12px;

          border:
            1px solid
            var(--admin-border);

          border-radius: 12px;

          background:
            var(--admin-bg-secondary);
        }


        .info-icon {

          font-size: 13px;

          flex-shrink: 0;
        }


        .info-item > div {

          min-width: 0;
        }


        .info-label {

          display: block;

          margin-bottom: 3px;

          color:
            var(--admin-text-muted);

          font-size: 9px;

          text-transform: uppercase;

          letter-spacing:
            0.05em;
        }


        .info-value {

          display: block;

          color:
            var(--admin-text-soft);

          font-size: 11px;

          overflow-wrap:
            anywhere;
        }


        /* ==================================================
           METADATA
        ================================================== */

        .metadata-row {

          display: flex;

          flex-wrap: wrap;

          gap: 8px;

          padding:
            0 20px 17px;
        }


        .metadata-item {

          display: flex;

          align-items: center;

          gap: 5px;

          padding:
            6px 9px;

          border:
            1px solid
            var(--admin-border);

          border-radius: 8px;

          color:
            var(--admin-text-muted);

          background:
            var(--admin-bg-secondary);

          font-size: 9px;
        }


        /* ==================================================
           GALLERY
        ================================================== */

        .gallery-section {

          padding:
            16px 20px;

          border-top:
            1px solid
            var(--admin-border);

          border-bottom:
            1px solid
            var(--admin-border);
        }


        .gallery-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 10px;

          color:
            var(--admin-text-muted);

          font-size: 10px;
        }


        .gallery-grid {

          display: grid;

          grid-template-columns:
            repeat(6, 1fr);

          gap: 7px;
        }


        .gallery-image {

          aspect-ratio: 1;

          overflow: hidden;

          border-radius: 9px;

          background:
            var(--admin-bg-secondary);

          border:
            1px solid
            var(--admin-border);
        }


        .gallery-image img {

          width: 100%;

          height: 100%;

          display: block;

          object-fit: cover;

          transition:
            transform 350ms ease;
        }


        .gallery-image:hover img {

          transform:
            scale(1.06);
        }


        .more-images {

          aspect-ratio: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 9px;

          color:
            var(--admin-text);

          background:
            var(--admin-bg-secondary);

          border:
            1px solid
            var(--admin-border);

          font-size: 11px;

          font-weight: 700;
        }


        /* ==================================================
           ACTIONS
        ================================================== */

        .submission-actions {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding:
            16px 20px;
        }


        .action-hint {

          margin: 0;

          color:
            var(--admin-text-muted);

          font-size: 9px;
        }


        .action-buttons {

          display: flex;

          gap: 8px;
        }


        .action-buttons form {

          margin: 0;
        }


        .reject-button,
        .approve-button {

          min-height: 38px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          padding:
            0 14px;

          border-radius: 10px;

          cursor: pointer;

          font-size: 11px;

          font-weight: 650;

          transition:
            transform 200ms ease,
            opacity 200ms ease,
            background 200ms ease;
        }


        .reject-button {

          color:
            var(--admin-red);

          background:
            rgba(239,68,68,0.07);

          border:
            1px solid
            rgba(239,68,68,0.2);
        }


        .approve-button {

          color: white;

          background:
            #16a34a;

          border:
            1px solid
            #16a34a;
        }


        .reject-button:hover,
        .approve-button:hover {

          transform:
            translateY(-1px);
        }


        .reject-button:active,
        .approve-button:active {

          transform:
            translateY(0);
        }


        /* ==================================================
           EMPTY
        ================================================== */

        .empty-state {

          padding: 55px 20px;

          text-align: center;

          border:
            1px solid
            var(--admin-border);

          border-radius: 18px;

          background:
            var(--admin-card);
        }


        .empty-icon {

          width: 46px;

          height: 46px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin:
            0 auto 13px;

          border-radius: 50%;

          color:
            var(--admin-green);

          background:
            rgba(34,197,94,0.1);

          font-weight: 800;
        }


        .empty-state h3 {

          margin:
            0 0 5px;

          color:
            var(--admin-text);

          font-size: 16px;
        }


        .empty-state p {

          margin: 0;

          color:
            var(--admin-text-muted);

          font-size: 11px;
        }


        /* ==================================================
           APPROVED
        ================================================== */

        .approved-list {

          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        .approved-item {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding:
            12px 14px;

          text-decoration: none;

          border:
            1px solid
            var(--admin-border);

          border-radius: 14px;

          background:
            var(--admin-card);

          transition:
            transform 200ms ease,
            border-color 200ms ease,
            background 200ms ease;
        }


        .approved-item:hover {

          transform:
            translateX(3px);

          border-color:
            var(--admin-green);

          background:
            var(--admin-card-hover);
        }


        .approved-left {

          display: flex;

          align-items: center;

          gap: 11px;

          min-width: 0;
        }


        .approved-avatar {

          width: 38px;

          height: 38px;

          border-radius: 11px;

          font-size: 13px;
        }


        .approved-name {

          margin: 0;

          color:
            var(--admin-text);

          font-size: 12px;

          font-weight: 650;
        }


        .approved-slug {

          margin:
            3px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 9px;
        }


        .approved-right {

          display: flex;

          align-items: center;

          gap: 10px;
        }


        .live-badge {

          padding:
            5px 8px;

          border-radius:
            999px;

          color:
            var(--admin-green);

          background:
            rgba(34,197,94,0.08);

          font-size: 8px;

          font-weight: 800;
        }


        .open-arrow {

          color:
            var(--admin-text-muted);

          font-size: 17px;
        }


        .approved-empty {

          padding: 25px;

          text-align: center;

          border:
            1px dashed
            var(--admin-border);

          border-radius: 14px;

          color:
            var(--admin-text-muted);

          font-size: 11px;
        }


        /* ==================================================
           FOOTER
        ================================================== */

        .dashboard-footer {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          padding-top: 10px;

          color:
            var(--admin-text-muted);

          font-size: 9px;
        }


        .footer-dot {
          color:
            var(--admin-gold);
        }


        /* ==================================================
           LOGIN
        ================================================== */

        .admin-login-page {

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 25px;
        }


        .login-top-actions {

          position: fixed;

          top: 22px;

          right: 22px;

          z-index: 10;
        }


        .login-card {

          position: relative;

          z-index: 2;

          width: 100%;

          max-width: 410px;

          padding: 38px 34px;

          border:
            1px solid
            var(--admin-border);

          border-radius: 25px;

          background:
            var(--admin-card);

          box-shadow:
            var(--admin-shadow);

          text-align: center;

          animation:
            loginEnter 650ms ease both;
        }


        .login-logo-wrapper {

          width: 90px;

          height: 90px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin:
            0 auto 18px;

          padding: 9px;

          border:
            1px solid
            rgba(245,158,11,0.3);

          border-radius: 22px;

          background:
            #171717;

          box-shadow:
            0 15px 40px
            rgba(0,0,0,0.2);

          overflow: hidden;
        }


        .login-logo {

          width: 100%;

          height: 100%;

          object-fit: contain;
        }


        html.admin-light .login-logo-wrapper {

          background:
            #111111;

          border-color:
            #d4d4d4;
        }


        .login-mantra {

          margin: 0 0 10px;

          color:
            var(--admin-gold);

          font-size: 11px;

          letter-spacing:
            0.08em;
        }


        .login-title {

          margin: 0;

          color:
            var(--admin-text);

          font-size: 27px;

          font-weight: 750;

          letter-spacing:
            -0.03em;
        }


        .login-description {

          max-width: 300px;

          margin:
            9px auto 0;

          color:
            var(--admin-text-muted);

          font-size: 11px;

          line-height: 1.6;
        }


        .login-form {

          margin-top: 25px;

          text-align: left;
        }


        .input-group {

          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .input-group label {

          color:
            var(--admin-text-soft);

          font-size: 10px;

          font-weight: 650;
        }


        .input-group input {

          width: 100%;

          height: 46px;

          padding:
            0 13px;

          outline: none;

          border:
            1px solid
            var(--admin-border);

          border-radius: 12px;

          background:
            var(--admin-input-bg);

          color:
            var(--admin-text);

          font-family: inherit;

          font-size: 12px;

          transition:
            border-color 200ms ease,
            box-shadow 200ms ease;
        }


        .input-group input::placeholder {

          color:
            var(--admin-text-muted);
        }


        .input-group input:focus {

          border-color:
            var(--admin-gold);

          box-shadow:
            0 0 0 3px
            rgba(245,158,11,0.08);
        }


        .login-button {

          width: 100%;

          height: 47px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 13px;

          padding:
            0 16px;

          border: 0;

          border-radius: 12px;

          color: #ffffff;

          background:
            var(--admin-gold);

          cursor: pointer;

          font-family: inherit;

          font-size: 12px;

          font-weight: 700;

          transition:
            transform 200ms ease,
            filter 200ms ease;
        }


        .login-button:hover {

          filter:
            brightness(1.08);

          transform:
            translateY(-1px);
        }


        .button-arrow {

          font-size: 17px;
        }


        .login-security {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          margin-top: 18px;

          color:
            var(--admin-text-muted);

          font-size: 9px;
        }


        .security-dot {

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background:
            var(--admin-green);
        }


        .login-powered {

          margin:
            25px 0 0;

          color:
            var(--admin-text-muted);

          font-size: 8px;

          letter-spacing:
            0.05em;
        }


        /* ==================================================
           LOGIN GLOW
        ================================================== */

        .login-glow {

          position: fixed;

          width: 350px;

          height: 350px;

          border-radius: 50%;

          pointer-events: none;

          filter:
            blur(80px);

          opacity: 0.07;

          background:
            var(--admin-gold);
        }


        .login-glow-one {

          top:
            -150px;

          left:
            -100px;
        }


        .login-glow-two {

          bottom:
            -180px;

          right:
            -100px;
        }


        /* ==================================================
           ANIMATIONS
        ================================================== */

        @keyframes fadeUp {

          from {
            opacity: 0;
            transform:
              translateY(15px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }

        }


        @keyframes loginEnter {

          from {
            opacity: 0;
            transform:
              translateY(20px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }

        }


        @keyframes pulse {

          0%,
          100% {
            opacity: 0.5;
            transform:
              scale(0.85);
          }

          50% {
            opacity: 1;
            transform:
              scale(1);
          }

        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 850px) {

          .dashboard-header {

            align-items:
              flex-start;

            flex-direction:
              column;
          }


          .header-actions {

            width: 100%;

            justify-content:
              space-between;
          }


          .stats-grid {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .submission-info {

            grid-template-columns:
              1fr;
          }

        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 600px) {

          .admin-container {

            padding:
              22px 12px 40px;
          }


          .dashboard-header {

            margin-bottom:
              24px;
          }


          .brand-row {

            margin-bottom:
              17px;
          }


          .brand-logo-wrapper {

            width: 46px;

            height: 46px;
          }


          .brand-divider {

            height: 27px;
          }


          .dashboard-title {

            font-size:
              28px;
          }


          .dashboard-subtitle {

            font-size:
              11px;

            max-width:
              310px;
          }


          .header-actions {

            gap: 8px;
          }


          .dashboard-status {

            font-size:
              9px;
          }


          .stats-grid {

            grid-template-columns:
              1fr;

            gap: 9px;

            margin-bottom:
              30px;
          }


          .stat-card {

            padding:
              17px;
          }


          .submission-header {

            align-items:
              flex-start;

            padding:
              16px;
          }


          .pending-badge {

            padding:
              6px 8px;

            font-size:
              9px;
          }


          .submission-info {

            padding:
              0 16px 13px;
          }


          .metadata-row {

            padding:
              0 16px 14px;
          }


          .gallery-section {

            padding:
              14px 16px;
          }


          .gallery-grid {

            grid-template-columns:
              repeat(3, 1fr);

            gap: 6px;
          }


          .submission-actions {

            flex-direction:
              column;

            align-items:
              stretch;

            padding:
              14px 16px;
          }


          .action-hint {

            text-align:
              center;
          }


          .action-buttons {

            width:
              100%;
          }


          .action-buttons form {

            flex:
              1;
          }


          .reject-button,
          .approve-button {

            width:
              100%;

            padding:
              0 9px;

            font-size:
              10px;
          }


          .approved-item {

            padding:
              10px 11px;
          }


          .approved-name {

            font-size:
              11px;
          }


          .live-badge {

            display:
              none;
          }


          .dashboard-footer {

            flex-wrap:
              wrap;

            text-align:
              center;

            line-height:
              1.5;
          }


          .login-card {

            max-width:
              100%;

            padding:
              30px 21px;

            border-radius:
              21px;
          }


          .login-logo-wrapper {

            width:
              76px;

            height:
              76px;
          }


          .login-top-actions {

            top:
              15px;

            right:
              15px;
          }

        }


        /* ==================================================
           VERY SMALL MOBILE
        ================================================== */

        @media (max-width: 380px) {

          .admin-container {

            padding-left:
              9px;

            padding-right:
              9px;
          }


          .dashboard-title {

            font-size:
              25px;
          }


          .submission-main {

            gap:
              8px;
          }


          .mandal-avatar {

            width:
              38px;

            height:
              38px;

            border-radius:
              11px;
          }


          .mandal-name {

            font-size:
              13px;
          }

        }

      `}</style>
    </main>
  );
}