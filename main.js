// Handle login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Login successful! Redirecting to dashboard...");
  window.location.href = "dashboard.html";
});

// Handle stats submission
document.getElementById('statsForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Stats recorded successfully!");
  window.location.href = "dashboard.html";
});
