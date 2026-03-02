// =====================================================
//  Athlete Stats Tracker — main.js
//  Handles: Login, Register, Logout, Auth Guard
// =====================================================

const API = "http://localhost:5000";

// ── AUTH GUARD ────────────────────────────────────────
// Call this on pages that require login
function requireLogin() {
  const user = getUser();
  if (!user) { window.location.href = "login.html"; return null; }
  return user;
}

// Call this on pages only Admin can see
function requireAdmin() {
  const user = requireLogin();
  if (user && user.role !== "admin") { window.location.href = "dashboard.html"; return null; }
  return user;
}

// ── USER SESSION HELPERS ──────────────────────────────
function getUser() {
  const u = sessionStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}

function saveUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}

// ── SHOW MESSAGE HELPER ───────────────────────────────
function showMsg(elId, text, type) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent    = text;
  el.style.display  = "block";
  el.style.color    = type === "error" ? "#ff4444" : "#00cc66";
  el.style.marginTop = "12px";
  el.style.fontWeight = "600";
}

// ── REGISTER ──────────────────────────────────────────
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.disabled = true; btn.textContent = "Registering…";

  const role  = document.getElementById("role").value;
  const sport = document.getElementById("sport")?.value;

  const body = {
    fullname: document.getElementById("fullname").value.trim(),
    email:    document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    role,
    sport: role === "athlete" ? sport : null
  };

  try {
    const res  = await fetch(`${API}/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) {
      showMsg("registerMsg", data.error || "Registration failed.", "error");
      btn.disabled = false; btn.textContent = "Register";
      return;
    }
    showMsg("registerMsg", "✅ Account created! Redirecting to login…", "success");
    setTimeout(() => window.location.href = "login.html", 1200);

  } catch {
    showMsg("registerMsg", "❌ Cannot reach server. Is backend running?", "error");
    btn.disabled = false; btn.textContent = "Register";
  }
});

// ── LOGIN ─────────────────────────────────────────────
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.disabled = true; btn.textContent = "Logging in…";

  const body = {
    email:    document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };

  try {
    const res  = await fetch(`${API}/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) {
      showMsg("loginMsg", data.error || "Login failed.", "error");
      btn.disabled = false; btn.textContent = "Login";
      return;
    }

    saveUser(data.user);
    showMsg("loginMsg", `✅ Welcome, ${data.user.fullname}! Redirecting…`, "success");
    setTimeout(() => window.location.href = "dashboard.html", 1000);

  } catch {
    showMsg("loginMsg", "❌ Cannot reach server. Is backend running?", "error");
    btn.disabled = false; btn.textContent = "Login";
  }
});

// ── LOGOUT ────────────────────────────────────────────
document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

// ── SHOW/HIDE SPORT FIELD ON REGISTER ────────────────
document.getElementById("role")?.addEventListener("change", function () {
  const sportGroup = document.getElementById("sportGroup");
  if (sportGroup) {
    sportGroup.style.display = this.value === "athlete" ? "block" : "none";
  }
});
