let jobs = [
  {
    id: "mobile-first-corp",
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile apps that are used by millions around the world.",
    status: "all"
  },
  {
    id: "webflow-agency",
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Design modern, user-focused websites for high-profile clients.",
    status: "all"
  },
  {
    id: "dataviz-solutions",
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Turn complex data into clear, interactive dashboards and reports.",
    status: "all"
  },
  {
    id: "cloudfirst-inc",
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Develop scalable backend systems using modern cloud technologies.",
    status: "all"
  },
  {
    id: "innovation-labs",
    company: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Craft intuitive and engaging interfaces for next-generation products.",
    status: "all"
  },
  {
    id: "nextgen-ai",
    company: "NextGen AI",
    position: "Machine Learning Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$160,000 - $210,000",
    description: "Build intelligent systems powered by real-time machine learning models.",
    status: "all"
  },
  {
    id: "securenet",
    company: "SecureNet",
    position: "Cybersecurity Analyst",
    location: "New York, NY",
    type: "Full-time",
    salary: "$115,000 - $155,000",
    description: "Monitor, detect, and prevent advanced security threats across systems.",
    status: "all"
  },
  {
    id: "greentech",
    company: "GreenTech",
    position: "Software Engineer",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$105,000 - $145,000",
    description: "Develop sustainable tech solutions to reduce environmental impact.",
    status: "all"
  }
];
let currentTab = "all";

function getStatusBadge(status) {
  if (status === "interview") return `<span class="badge badge-success">INTERVIEW</span>`;
  if (status === "rejected") return `<span class="badge badge-error">REJECTED</span>`;
  return `<span class="badge bg-primary/10">NOT APPLIED</span>`;
}

function updateDashboard() {
  const total = jobs.length;
  const interview = jobs.filter(job => job.status === "interview").length;
  const rejected = jobs.filter(job => job.status === "rejected").length;

  document.getElementById("total-count").innerText = total;
  document.getElementById("interview-count").innerText = interview;
  document.getElementById("rejected-count").innerText = rejected;
}

function updateStatus(jobId, newStatus) {
  const job = jobs.find(j => j.id === jobId);
  if (!job || job.status === newStatus) return;

  job.status = newStatus;
  renderJobs();
}

function deleteJob(jobId) {
  jobs = jobs.filter(j => j.id !== jobId);
  renderJobs();
}

function renderJobs() {
  const emptyState = document.getElementById("empty-state");
  const cards = document.querySelectorAll(".card[id]");

  let filteredJobs;
  let countText = "";

  if (currentTab === "all") {
    filteredJobs = jobs;
    countText = `${jobs.length} jobs`;
  } else if (currentTab === "interview") {
    filteredJobs = jobs.filter(job => job.status === "interview");
    countText = `${filteredJobs.length} out of ${jobs.length}`;
  } else if (currentTab === "rejected") {
    filteredJobs = jobs.filter(job => job.status === "rejected");
    countText = `${filteredJobs.length} out of ${jobs.length}`;
  }

  document.getElementById("tab-job-count").innerText = countText;

  if (filteredJobs.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  cards.forEach(card => {
    const jobId = card.id;
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      card.style.display = "none";
      return;
    }

    if (currentTab === "all" || job.status === currentTab) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

    const badgeContainer = card.querySelector(".badge");
    if (badgeContainer) {
      badgeContainer.outerHTML = getStatusBadge(job.status);
    }
  });

  updateDashboard();
}

document.getElementById("tab-all").addEventListener("click", () => { 
  currentTab = "all"; 
  renderJobs(); 
  setActiveTab("tab-all"); 
});

document.getElementById("tab-interview").addEventListener("click", () => { 
  currentTab = "interview"; 
  renderJobs(); 
  setActiveTab("tab-interview"); 
});

document.getElementById("tab-rejected").addEventListener("click", () => { 
  currentTab = "rejected"; 
  renderJobs(); 
  setActiveTab("tab-rejected"); 
});

function setActiveTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab-active"));
  document.getElementById(tabId).classList.add("tab-active");
}

renderJobs();