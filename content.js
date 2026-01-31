// 🛡️ TruthTag – content.js
// ==============================

// ---------- FLOATING BUTTON ----------
if (!document.getElementById("tt-float")) {
  const floatBtn = document.createElement("div");
  floatBtn.id = "tt-float";
  floatBtn.innerHTML = "🛡️";
  floatBtn.style = `
    position:fixed;
    bottom:20px;
    right:20px;
    width:52px;
    height:52px;f
    background:#22c55e;
    color:black;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:22px;
    cursor:pointer;
    z-index:999999;
    box-shadow:0 6px 18px rgba(0,0,0,0.4);
  `;
  document.body.appendChild(floatBtn);
  floatBtn.onclick = runScan;
}

// ---------- AUTO SCAN ----------
setTimeout(runScan, 2500);

// ---------- SUSPICIOUS KEYWORDS ----------
const suspiciousKeywords = [
  "registration fee",
  "pay now",
  "training fee",
  "whatsapp only",
  "instant joining",
  "limited slots",
  "no interview",
  "quick money"
];

// ---------- FRAUD SIGNAL DETECTION ----------
function detectFraudSignals() {
  const text = document.body.innerText.toLowerCase();
  return suspiciousKeywords.filter(k => text.includes(k));
}

// ---------- SAVE SCAN HISTORY ----------
function saveHistory(status, risk) {
  const history = JSON.parse(localStorage.getItem("tt-history")) || [];
  history.unshift({
    status,
    risk,
    time: new Date().toLocaleString(),
    url: location.href
  });
  if (history.length > 5) history.pop();
  localStorage.setItem("tt-history", JSON.stringify(history));
}

// ---------- MAIN SCAN LOGIC ----------
function runScan() {
  const text = document.body.innerText.toLowerCase();
  const url = location.href.toLowerCase();

  let risk = 0;
  let reasons = [];

  ["@gmail.com", "@yahoo.com", "@outlook.com"].forEach(e => {
    if (text.includes(e)) {
      risk += 30;
      reasons.push("Uses free email domain");
    }
  });

  suspiciousKeywords.forEach(word => {
    if (text.includes(word)) {
      risk += 15;
      reasons.push(`Suspicious term: "${word}"`);
    }
  });

  const trustedSites = [
    "linkedin.com",
    "internshala.com",
    "indeed.com",
    "naukri.com"
  ];

  if (!trustedSites.some(site => url.includes(site))) {
    risk += 20;
    reasons.push("Unverified job platform");
  }

  const status =
    risk >= 60 ? "High Risk" :
    risk >= 30 ? "Medium Risk" :
    "Verified";

  saveHistory(status, risk);
  openSidebar(status, risk, reasons);
  addVerifiedBadge(status);
}

// ---------- SIDEBAR UI ----------
function openSidebar(status, risk, reasons) {
  const old = document.getElementById("tt-sidebar");
  if (old) old.remove();

  const fraudSignals = detectFraudSignals();
  let confidence = fraudSignals.length >= 3 ? 30 : fraudSignals.length ? 55 : 90;

  const sidebar = document.createElement("div");
  sidebar.id = "tt-sidebar";
  sidebar.style = `
    position:fixed;
    top:0;
    right:-380px;
    width:360px;
    height:100%;
    background:#020617;
    color:#e5e7eb;
    box-shadow:-8px 0 30px rgba(0,0,0,0.7);
    z-index:999999;
    font-family:Arial;
    transition:right 0.4s ease;
    display:flex;
    flex-direction:column;
  `;

  sidebar.innerHTML = `
    <div style="padding:16px;border-bottom:1px solid #334155;display:flex;justify-content:space-between;">
      <b>TruthTag</b>
      <span id="tt-close" style="cursor:pointer">✖</span>
    </div>

    <div style="padding:16px;flex:1;overflow:auto">
      <span style="padding:6px 14px;border-radius:999px;
        background:${status==="Verified"?"#22c55e":"#facc15"};
        color:black;font-weight:bold">
        ${status}
      </span>

      <p><b>Risk Score:</b> ${risk}</p>

      <p><b>AI Trust Score:</b>
        <span style="color:${confidence>60?"#22c55e":"#ef4444"}">
          ${confidence}%
        </span>
      </p>

      <p><b>Verification Signals:</b></p>
      <ul>
        ${reasons.length ? reasons.map(r=>`<li>${r}</li>`).join("") : "<li>None</li>"}
      </ul>

      ${
        fraudSignals.length
          ? `<p style="color:#ef4444"><b>Red Flags:</b><br>• ${fraudSignals.join("<br>• ")}</p>`
          : `<p style="color:#22c55e">No suspicious activity detected</p>`
      }

      <button id="scanAgain" style="width:100%;margin-top:12px;padding:10px">🔄 Scan Again</button>
      <button id="linkedinBtn" style="width:100%;margin-top:8px;padding:10px;background:#0a66c2;color:white">🔗 Company LinkedIn</button>

      <h4 style="margin-top:18px">🕘 Scan History</h4>
      <ul style="font-size:12px">
        ${(JSON.parse(localStorage.getItem("tt-history"))||[]).map(h=>`
          <li><b>${h.status}</b> (${h.risk})<br>${h.time}</li>
        `).join("")}
      </ul>
    </div>
  `;

  document.body.appendChild(sidebar);
  setTimeout(()=>sidebar.style.right="0",50);

  document.getElementById("tt-close").onclick = ()=>sidebar.remove();
  document.getElementById("scanAgain").onclick = ()=>{sidebar.remove(); runScan();}
  document.getElementById("linkedinBtn").onclick = ()=>{
    const link = getCompanyLinkedIn();
    window.open(link || "https://www.linkedin.com/search/results/companies/", "_blank");
  }
}

// ---------- VERIFIED BADGE ----------
function addVerifiedBadge(status) {
  if (status !== "Verified" || document.getElementById("tt-badge")) return;

  const badge = document.createElement("div");
  badge.id = "tt-badge";
  badge.innerHTML = "✔ Verified by TruthTag";
  badge.style = `
    position:fixed;
    top:12px;
    right:420px;
    background:#22c55e;
    padding:6px 14px;
    border-radius:999px;
    font-size:12px;
    font-weight:bold;
    z-index:999999;
  `;
  document.body.appendChild(badge);
}

// ---------- LINKEDIN AUTO DETECT ----------
function getCompanyLinkedIn() {
  const links = [...document.querySelectorAll("a")];
  const l = links.find(a => a.href.includes("linkedin.com/company"));
  return l ? l.href : null;
}