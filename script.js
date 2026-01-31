// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animations to elements
    const fadeElements = document.querySelectorAll('.feature-card, .indicator-card');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Initialize scanner
    initScanner();
    
    // Initialize login system
    initLoginSystem();
// Forgot Password
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;

        if (!email) {
            showNotification('Please enter your email first', 'error');
            return;
        }

        // Demo behavior (frontend only)
        showNotification(
            `Password reset link sent to ${email}`,
            'success'
        );
    });
}
  
 // Initialize API button
    initAPIButton();
    
    // Initialize video tutorial
    initVideoTutorial();
    
    // Add scroll animations
    initScrollAnimations();
});

// Video Tutorial Controller
function initVideoTutorial() {
    const video = document.getElementById('tutorialVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playVideoBtn');
    const skipBtn = document.getElementById('skipVideoBtn');
    const replayBtn = document.getElementById('replayVideoBtn');
    const muteBtn = document.getElementById('muteVideoBtn');
    const tryNowBtn = document.getElementById('tryNowBtn');
    
    let isMuted = true; // Start muted for autoplay
    let hasPlayed = false;
    
    // Set video properties
    video.muted = true;
    video.loop = false;
    video.controls = false;
    
    // Play button
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            if (hasPlayed) {
                video.currentTime = 0;
            }
            video.play();
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Skip button
    skipBtn.addEventListener('click', () => {
        video.pause();
        videoOverlay.classList.add('hidden');
        hasPlayed = true;
    });
    
    // Replay button
    replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
        hasPlayed = true;
        videoOverlay.classList.add('hidden');
    });
    
    // Mute button
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        video.muted = isMuted;
        
        const icon = muteBtn.querySelector('i');
        if (isMuted) {
            icon.className = 'fas fa-volume-mute';
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off';
        } else {
            icon.className = 'fas fa-volume-up';
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Sound On';
        }
    });
    
    // Try Now button
    tryNowBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('scanner').offsetTop,
            behavior: 'smooth'
        });
    });
    
    // Video events
    video.addEventListener('playing', () => {
        videoOverlay.classList.add('hidden');
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    video.addEventListener('pause', () => {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    video.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
        playBtn.innerHTML = '<i class="fas fa-redo"></i>';
        playBtn.style.background = 'var(--gradient-secondary)';
        hasPlayed = true;
    });
    
    // Auto-play video when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayed) {
                // Try to autoplay
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Video autoplay started');
                    }).catch(error => {
                        console.log('Autoplay prevented, showing overlay');
                        videoOverlay.classList.remove('hidden');
                        video.pause();
                    });
                }
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.getElementById('videoTutorial'));
}

// Login System
function initLoginSystem() {
    const loginBtn = document.getElementById('loginBtn');
    const loginPage = document.getElementById('loginPage');
    const closeLogin = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');
    const userProfile = document.getElementById('userProfile');
    const userInitials = document.getElementById('userInitials');

    // Check if user is already logged in
    const user = localStorage.getItem('truthTagUser');
    if (user) {
        const userData = JSON.parse(user);
        updateUserInterface(userData);
    }

    // Open login page
    loginBtn.addEventListener('click', function() {
        if (userProfile.style.display === 'none') {
            loginPage.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            // If user is logged in, this becomes logout
            localStorage.removeItem('truthTagUser');
            userProfile.style.display = 'none';
            loginBtn.textContent = 'Sign In';
            loginBtn.className = 'secondary-button';
        }
    });

    // Close login page
    closeLogin.addEventListener('click', function() {
        loginPage.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close login when clicking outside
    loginPage.addEventListener('click', function(e) {
        if (e.target === loginPage) {
            loginPage.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login process
        simulateLogin(email);
    });

    // Signup link
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up functionality would be implemented here. For demo purposes, use any email/password to login.');
    });
}

function simulateLogin(email) {
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create user data
        const userData = {
            email: email,
            name: email.split('@')[0],
            initials: email.charAt(0).toUpperCase()
        };
        
        // Save to localStorage
        localStorage.setItem('truthTagUser', JSON.stringify(userData));
        
        // Update UI
        updateUserInterface(userData);
        
        // Close login page
        document.getElementById('loginPage').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        document.getElementById('loginForm').reset();
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
        // Show success message
        showNotification('Successfully logged in!', 'success');
    }, 1500);
}

function updateUserInterface(userData) {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userInitials = document.getElementById('userInitials');
    
    // Update buttons
    loginBtn.textContent = 'Logout';
    loginBtn.className = 'secondary-button';
    
    // Show user profile
    userProfile.style.display = 'flex';
    userInitials.textContent = userData.initials;
    
    // Add hover effect for profile
    userProfile.title = `Logged in as ${userData.email}`;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// API Documentation Modal
function initAPIButton() {
    const apiButton = document.getElementById('apiButton');
    const apiModal = document.getElementById('apiModal');
    
    apiButton.addEventListener('click', openAPIModal);
    
    // Close modal when clicking outside
    apiModal.addEventListener('click', function(e) {
        if (e.target === apiModal) {
            closeAPIModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && apiModal.style.display === 'block') {
            closeAPIModal();
        }
    });
}

function openAPIModal() {
    const apiModal = document.getElementById('apiModal');
    apiModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAPIModal() {
    const apiModal = document.getElementById('apiModal');
    apiModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Scanner Functions
function initScanner() {
    const form = document.getElementById('jobScannerForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsSection = document.getElementById('resultsSection');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const user = localStorage.getItem('truthTagUser');
        if (!user) {
            showNotification('Please sign in to analyze jobs', 'error');
            document.getElementById('loginPage').style.display = 'block';
            return;
        }

        loadingIndicator.style.display = 'block';
        resultsSection.style.display = 'none';

        const companyName = document.getElementById('companyName').value;
        const hrEmail = document.getElementById('hrEmail').value;
        const jobDescription = document.getElementById('jobDescription').value;

        try {
            const response = await fetch(
                "https://truthtag-backend.onrender.com/check",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        company: companyName,
                        email: hrEmail,
                        job: jobDescription
                    })
                }
            );

            const data = await response.json();

            loadingIndicator.style.display = 'none';
            resultsSection.style.display = 'block';

           const score = Number(data.risk);

document.getElementById('scoreText').innerText = score;
setRiskUI(score);
document.getElementById('riskDescription').innerText = data.status;


            const list = document.getElementById('riskFactors');
            list.innerHTML = "";
            data.reasons.forEach(reason => {
                const li = document.createElement("li");
                li.innerText = reason;
                list.appendChild(li);
            });

            resultsSection.scrollIntoView({ behavior: "smooth" });

        } catch (err) {
            loadingIndicator.style.display = 'none';
            alert("Backend error");
            console.error(err);
        }
    });

    addSampleDataButtons();
}

function resetScanner() {
    document.getElementById('jobScannerForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('jobScannerForm').style.display = 'block';
 hideCompanyDetails();
}

function scrollToScanner() {
    document.getElementById('scanner').scrollIntoView({ behavior: 'smooth' });
}

function saveAnalysisHistory(companyName, score, riskLevel) {
    const user = localStorage.getItem('truthTagUser');
    if (!user) return;
    
    const userData = JSON.parse(user);
    const analysis = {
        company: companyName,
        score: score,
        riskLevel: riskLevel,
        date: new Date().toISOString()
    };
    
    // Get existing history or create new
    let history = JSON.parse(localStorage.getItem('truthTagHistory') || '[]');
    history.unshift(analysis); // Add to beginning
    history = history.slice(0, 10); // Keep only last 10 analyses
    
    localStorage.setItem('truthTagHistory', JSON.stringify(history));
}

function addSampleDataButtons() {
    // Add sample data functionality
    const sampleData = {
        scam: {
            companyName: "Global Tech Ventures",
            hrEmail: "recruitment.team@gmail.com",
            jobDescription: "URGENT HIRING!!! Work from home data entry clerk. No experience needed. Earn $5000 per month part-time. You must pay $99 registration fee to get started. Immediate hiring, send your resume and bank details to us. Limited positions available! This is a golden opportunity!!!"
        },
        safe: {
            companyName: "Microsoft Corporation",
            hrEmail: "careers@microsoft.com",
            jobDescription: "Microsoft is hiring Software Engineers with 2+ years of experience in C# and .NET. Responsibilities include developing scalable applications, collaborating with cross-functional teams, and participating in code reviews. Competitive salary and benefits package offered. Apply through our official careers portal."
        }
    };

    // Create and add buttons
    const form = document.getElementById('jobScannerForm');
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 10px; margin-top: 20px; justify-content: center; flex-wrap: wrap;';
    
    const scamButton = document.createElement('button');
    scamButton.type = 'button';
    scamButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Load Sample Scam';
    scamButton.className = 'secondary-button';
    scamButton.style.background = 'var(--danger)';
    scamButton.style.color = 'white';
    scamButton.onclick = () => loadSampleData(sampleData.scam);
    
    const safeButton = document.createElement('button');
    safeButton.type = 'button';
    safeButton.innerHTML = '<i class="fas fa-check-circle"></i> Load Sample Safe';
    safeButton.className = 'secondary-button';
    safeButton.style.background = 'var(--success)';
    safeButton.style.color = 'white';
    safeButton.onclick = () => loadSampleData(sampleData.safe);
    
    buttonContainer.appendChild(scamButton);
    buttonContainer.appendChild(safeButton);
    form.appendChild(buttonContainer);
}

function loadSampleData(data) {
    document.getElementById('companyName').value = data.companyName;
    document.getElementById('hrEmail').value = data.hrEmail;
    document.getElementById('jobDescription').value = data.jobDescription;
    
    // Scroll to form
    document.getElementById('scanner').scrollIntoView({ behavior: 'smooth' });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add floating animation to hero elements
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) heroTitle.classList.add('float-animation');
    if (heroSubtitle) heroSubtitle.style.animationDelay = '0.3s';
    if (heroButtons) heroButtons.style.animationDelay = '0.6s';
}, 1000); 
function downloadReport() {
    const company = document.getElementById("companyName").value || "N/A";
    const email = document.getElementById("hrEmail").value || "N/A";
    const description = document.getElementById("jobDescription").value || "N/A";
    const score = document.getElementById("scoreText")?.innerText || "N/A";
    const risk = document.getElementById("riskBadge")?.innerText || "N/A";

    const report = `
TruthTag – Job Safety Report
----------------------------

Company Name: ${company}
HR Email: ${email}

Risk Level: ${risk}
Risk Score: ${score}

Job Description:
${description}

Generated by TruthTag
`;

    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "TruthTag_Report.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function setRiskUI(score) {
    const riskBadge = document.getElementById("riskBadge");

    if (score <= 30) {
        riskBadge.innerHTML = `<i class="fas fa-check-circle"></i> Low Risk`;
        riskBadge.className = "risk-badge safe";
    }
    else if (score <= 60) {
        riskBadge.innerHTML = `<i class="fas fa-exclamation-circle"></i> Medium Risk`;
        riskBadge.className = "risk-badge suspicious";
    }
    else {
        riskBadge.innerHTML = `<i class="fas fa-exclamation-triangle"></i> High Risk`;
        riskBadge.className = "risk-badge dangerous";
    }
}
function showCompanyDetails(details) {
    const card = document.getElementById("companyCard");
    card.style.display = "block";

    card.innerHTML = `
        <h3>✅ Verified Company</h3>
        <p><strong>Name:</strong> ${details.name}</p>
        <p><strong>Industry:</strong> ${details.industry}</p>
        <p><strong>Website:</strong>
            <a href="${details.website}" target="_blank">${details.website}</a>
        </p>
        <p>${details.description}</p>
    `;
}
// Hide company details card
function hideCompanyDetails() {
    const card = document.getElementById("companyCard");
    card.style.display = "none";
}

                                                                                                 