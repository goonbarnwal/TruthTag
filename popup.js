document.getElementById("scanBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url.toLowerCase();

    let risk = 0;
    let reasons = [];

    // Trusted job platforms
    const trustedSites = [
      "internshala.com",
      "linkedin.com",
      "indeed.com",
      "naukri.com"
    ];

    const isTrusted = trustedSites.some(site =>
      currentUrl.includes(site)
    );

    if (currentUrl.includes("gmail") || currentUrl.includes("forms")) {
      risk += 40;
      reasons.push("Job redirects to email/form");
    }

    if (!isTrusted) {
      risk += 30;
      reasons.push("Not a trusted job platform");
    }

    let status =
      risk >= 50 ? "🔴 High Risk" :
      risk >= 20 ? "🟡 Medium Risk" :
      "🟢 Safe";

    if (reasons.length === 0) {
      reasons.push("Trusted job platform detected");
    }

    document.getElementById("result").innerText =
      status + "\n\nReasons:\n- " + reasons.join("\n- ");
  });
});