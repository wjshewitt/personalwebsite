document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const terminalBox = document.getElementById("terminal-box");
  const greetingElement = document.getElementById("greeting");
  const headingElement = document.getElementById("dynamic-heading");
  const skipNote = document.getElementById("skip-note");
  const skipBtn = document.getElementById("skip-btn");
  const stickyHeader = document.getElementById("sticky-header");
  const stickySocials = document.getElementById("sticky-socials");
  const originalSocials = document.getElementById("original-socials");
  const headerTrigger = document.getElementById("header-trigger");
  const introSpacer = document.getElementById("intro-spacer");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const clockElement = document.getElementById("clock");
  let gridContainer = document.getElementById("background-grid");
  const contactButtons = document.querySelectorAll(".contact-btn");
  const contactBoxWrapper = document.getElementById("contact-box-wrapper");
  const themeToggleCheckbox = document.getElementById("theme-checkbox");
  const initialisingContainer = document.getElementById(
    "initialising-container"
  );
  const progressBar = document.getElementById("progress-bar");
  const progressPercentage = document.getElementById("progress-percentage");
  const timelineRoot = document.getElementById("timeline-component");
  let timelineItems = [];
  let timelineYears = [];
  let timelineContents = [];

  // State
  let isAnimating = false;
  let isDocked = false;
  let introTypingComplete = false;
  let animationSkipped = false;
  let nameToggleRunning = false;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const promptElement = document.createElement("span");
  promptElement.textContent = "> ";
  promptElement.style.whiteSpace = "pre";
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const timelineData = [
    {
      year: 2025,
      entries: [
        {
          month: 8,
          title: "Invisible College Seminar",
          date: "August 2025",
          summary: "Attended a week-long seminar in Cambridge.",
          details:
            "Attended a week-long seminar in Cambridge run by Works in Progress, a subsidiary of Stripe covering AI, Biosciences, Robotics, and Urban Design. Had talks from Anton Howes on the origins of the Industrial Revolution, learnt about bad science from Stuart Ritchie, and presented a lightning talk judged by Marc Warner, CEO of Faculty AI",
          skills: "AI,Bioscience,Robotics,Urban Design,Housing,Progress",
        },
        {
          month: 7,
          title: "Graduated University",
          date: "July 2025",
          summary:
            "Graduated from the University of Nottingham with a degree in History.",
          details:
            "Completed my degree in History from the University of Nottingham, receiving a 2.1 overall, and a 1st (78%) for my dissertation thesis entitled 'The 1947 Town and Country Planning Act: Origins and representations through a contemporary perspective'",
          skills: "History,Research,Writing",
        },
      ],
    },
    {
      year: 2024,
      entries: [
        {
          month: 12,
          title: "Internship at Dean Street Advisers",
          date: "December 2024",
          summary: "Gained experience in M&A advisory and deal origination.",
          details:
            "Gained experience in M&A advisory and deal origination at a boutique advisory firm.",
          skills: "M&A,Deal Origination,Financial Research",
        },
        {
          month: 8,
          title: "Tract UK",
          date: "May - Oct 2024",
          summary:
            "Started as a Founder's Associate at a high-growth prop-tech startup.",
          details:
            "Joined immediately after the pre-seed raise at a fast-growing AI prop-tech startup, as the first ‘hire’, helping the two cofounders full-time with a variety of tasks and projects during a major growth phase. Met and liaised with investors, managed the website and product launch, and built a marketing strategy to target rural landowners. Through meetings with investors, and internal discussions, I enhanced my understanding of the dynamics of private markets, particularly early stage venture capital dynamics in the UK.<br><br>I'm really proud and grateful for my time at Tract, playing even a small role in trying to ease the UK's housing crisis is what got me so interested in the topic of housing, and startups more broadly.<br><br>Tract was shuttered in April 2025 after Jamie and Henry (Tract's Founders) realised there was not a clear path to venture-scale returns. You can read their full and widely lauded postmortem here <a href='https://buildwithtract.com/' class='text-amber-400 hover:text-amber-300' target='_blank' rel='noopener noreferrer'>Tract Postmortem</a>.",
          skills: "Startups,Venture Capital,Prop-Tech",
        },
      ],
    },
    {
      year: 2023,
      entries: [
        {
          month: 7,
          title: "Kindred for Business Internship",
          date: "May - Sep 2023",
          summary: "Aided in AI and commercialisation challenges in a B2B2C app.",
          details:
            "Aided in AI and commercialisation challenges in a B2B2C app monetisation start-up. Gained important hard skills in relation to understanding data analytics and financial metrics through the utilisation of MS Power BI and Google Analytics.",
          skills: "Data Analytics,Power BI,Commercialisation",
        },
      ],
    },
    {
      year: 2022,
      entries: [
        {
          month: 8,
          title: "Ruffer LLP Work Experience",
          date: "August 2022",
          summary:
            "Insight into a $36bn AUM L/S Multi-Strat investment fund.",
          details:
            "Gained insight into a $36bn AUM L/S Multi-Strat investment fund. Used fundamental and technical analysis, to assess whether to invest in an equity. Worked collaboratively with my group in pitching the chosen stock to partners as part of a competition, with our group winning.",
          skills: "Investment,Financial Analysis,Pitching",
        },
      ],
    },
    {
      year: 2021,
      entries: [
        {
          month: 9,
          title: "Started University of Nottingham",
          date: "Autumn 2021",
          summary: "Focused on economic and political history.",
          details:
            "Began studies in History, focusing on economic and political history.",
          skills: "History,Academics,University",
        },
        {
          month: 6,
          title: "Left School",
          date: "2021",
          summary:
            "A Levels in History, Economics, Politics, and EPQ.",
          details:
            "Graduated from Bradfield College with A Levels in History, Economics, Politics, and an EPQ.",
          skills: "A-Levels,Economics,Politics,History",
        },
      ],
    },
  ];

  let currentObserver;
  let timelineItemObserver;
  let yearObserver;

  function populateTimeline() {
    if (!timelineRoot) return;
    timelineRoot.innerHTML = '<div class="timeline-line" aria-hidden="true"></div>';

    const frag = document.createDocumentFragment();
    let itemIndex = 0;

    timelineData.forEach(({ year, entries }) => {
      const yearEl = document.createElement("div");
      yearEl.className = "timeline-year";
      yearEl.innerHTML = `<span aria-label="Timeline year ${year}">${year}</span>`;
      frag.appendChild(yearEl);

      entries.forEach((entry) => {
        const side = itemIndex % 2 === 0 ? "left" : "right";
        const itemEl = document.createElement("article");
        itemEl.className = `timeline-item ${side}`;
        itemEl.dataset.month = `${entry.month}`;
        itemEl.dataset.title = entry.title;
        itemEl.dataset.date = entry.date;
        itemEl.dataset.details = entry.details;
        itemEl.dataset.skills = entry.skills || "";

        const contentEl = document.createElement("div");
        contentEl.className = "timeline-content";
        contentEl.setAttribute("role", "button");
        contentEl.setAttribute("tabindex", "0");
        contentEl.setAttribute("aria-label", entry.title);
        contentEl.innerHTML = `
          <h3 class="font-semibold text-gray-100 text-base">${entry.title}</h3>
          <p class="text-sm text-gray-400 mt-1">${entry.date}</p>
          <p class="mt-3 text-gray-300">${entry.summary}</p>
        `;

        itemEl.appendChild(contentEl);
        frag.appendChild(itemEl);
        itemIndex += 1;
      });
    });

    timelineRoot.appendChild(frag);
    timelineItems = Array.from(timelineRoot.querySelectorAll(".timeline-item"));
    timelineYears = Array.from(timelineRoot.querySelectorAll(".timeline-year"));
    timelineContents = Array.from(
      timelineRoot.querySelectorAll(".timeline-content")
    );
    currentTimelineItem = null;
  }

  function updateTimelineFill() {
    if (!timelineRoot || !timelineItems.length) return;
    const rect = timelineRoot.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const distanceInto = viewportHeight - rect.top;
    const range = rect.height + viewportHeight;
    const progressScroll = range > 0 ? clamp(distanceInto / range, 0, 1) : 0;
    const visibleCount = timelineItems.filter((item) =>
      item.classList.contains("is-visible")
    ).length;
    const progressSeen = timelineItems.length
      ? clamp(visibleCount / timelineItems.length, 0, 1)
      : 0;
    const progress = Math.max(progressSeen, progressScroll);
    timelineRoot.style.setProperty("--line-fill", `${(progress * 100).toFixed(2)}%`);
  }

  function setupTimelineObservers() {
    if (currentObserver) currentObserver.disconnect();
    if (timelineItemObserver) timelineItemObserver.disconnect();
    if (yearObserver) yearObserver.disconnect();

    if (reduceMotion) {
      timelineItems.forEach((item) => item.classList.add("is-visible"));
      updateTimelineFill();
    } else {
      timelineItemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = timelineItems.indexOf(entry.target) * 40;
            setTimeout(() => {
              entry.target.classList.add("is-visible");
              updateTimelineFill();
              if (timelineItemObserver) timelineItemObserver.unobserve(entry.target);
            }, Math.max(delay, 0));
          });
        },
        { threshold: 0.25, rootMargin: "0px 0px -12%" }
      );
      timelineItems.forEach((item) => timelineItemObserver.observe(item));
    }

    currentObserver = new IntersectionObserver(
      () => {
        const viewportCenter = window.innerHeight / 2;
        let closestItem = null;
        let closestDistance = Infinity;

        timelineItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - viewportCenter);
          if (dist < closestDistance) {
            closestDistance = dist;
            closestItem = item;
          }
        });

        if (currentTimelineItem !== closestItem) {
          currentTimelineItem?.classList.remove("is-current");
          if (closestItem && closestDistance < 220)
            closestItem.classList.add("is-current");
          currentTimelineItem = closestItem;
        }
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    timelineContents.forEach((el) => currentObserver.observe(el));

    yearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const viewportCenter = window.innerHeight / 2;
          if (rect.top < viewportCenter && rect.bottom > 0)
            entry.target.classList.add("is-passed");
          else entry.target.classList.remove("is-passed");
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    timelineYears.forEach((year) => yearObserver.observe(year));

    updateTimelineFill();
  }

  // Intro animation
  async function initialisingAnimation() {
    let progress = 0;
    const totalDuration = reduceMotion ? 500 : 3000; // Shorter duration for reduced motion
    let startTime = null;
    
    function animateProgress(ts) {
      if (animationSkipped) return;
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const ease = reduceMotion ? elapsed / totalDuration : 1 - Math.pow(1 - elapsed / totalDuration, 4);
      progress = Math.min(100, ease * 100);
      progressBar.style.width = progress + "%";
      progressPercentage.textContent = Math.floor(progress) + "%";
      if (elapsed < totalDuration) requestAnimationFrame(animateProgress);
      else {
        progressBar.style.width = "100%";
        progressPercentage.textContent = "100%";
        setTimeout(() => {
          initialisingContainer.style.opacity = "0";
          setTimeout(() => {
            initialisingContainer.style.display = "none";
            greetingElement.classList.remove("hidden");
            headingElement.classList.remove("hidden");
            mainAnimationController();
          }, reduceMotion ? 100 : 300);
        }, reduceMotion ? 100 : 200);
      }
    }
    requestAnimationFrame(animateProgress);
  }

  async function cursorAnimate(el, duration) {
    if (!el) return;
    el.classList.add("cursor-char");
    await wait(duration);
    el.classList.remove("cursor-char");
  }

  async function mainAnimationController() {
    const type = async (el, text, charDelay) => {
      if (el.firstChild !== promptElement) el.prepend(promptElement);
      for (const char of text.split("")) {
        if (animationSkipped) return;
        const s = document.createElement("span");
        s.innerHTML = char === " " ? "&nbsp;" : char;
        el.appendChild(s);
        await cursorAnimate(s, charDelay);
      }
    };
    const backspace = async (el, count, charDelay) => {
      const spans = Array.from(el.querySelectorAll("span:not(:first-child)"));
      const toDelete = spans.slice(-count);
      for (let i = toDelete.length - 1; i >= 0; i--) {
        if (animationSkipped) return;
        const span = toDelete[i];
        await cursorAnimate(span, charDelay);
        span.remove();
      }
    };
    const moveCursorOver = async (el, count, charDelay) => {
      const spans = Array.from(
        el.querySelectorAll("span:not(:first-child)")
      ).slice(-count);
      for (let i = spans.length - 1; i >= 0; i--) {
        if (animationSkipped) return;
        await cursorAnimate(spans[i], charDelay);
      }
    };
    const deleteInPlace = async (el, startIndex, count, charDelay) => {
      const spans = Array.from(
        el.querySelectorAll("span:not(:first-child)")
      ).slice(startIndex, startIndex + count);
      for (let i = spans.length - 1; i >= 0; i--) {
        if (animationSkipped) return;
        await cursorAnimate(spans[i], charDelay);
        spans[i].remove();
      }
    };

    isAnimating = true;
    skipNote.style.opacity = "1";

    await type(greetingElement, "Hi,", 150);
    if (animationSkipped) return;
    await wait(300);
    await type(headingElement, "I'm William Hewitt", 120);
    if (animationSkipped) return;
    await wait(1200);

    await moveCursorOver(headingElement, 7, 60);
    await deleteInPlace(headingElement, 8, 3, 200);
    await wait(500);

    let currentSpans = Array.from(
      headingElement.querySelectorAll("span:not(:first-child)")
    );
    for (let i = 7; i >= 4; i--) await cursorAnimate(currentSpans[i], 60);
    await deleteInPlace(headingElement, 0, 4, 200);
    await wait(500);

    await backspace(greetingElement, 3, 150);
    greetingElement.style.height = "0";
    greetingElement.style.marginBottom = "0";
    greetingElement.style.opacity = "0";
    await wait(300);
    greetingElement.style.display = "none";

    headingElement.prepend(promptElement);
    const finalSpans = Array.from(
      headingElement.querySelectorAll("span:not(:first-child)")
    );
    for (const span of finalSpans) await cursorAnimate(span, 50);

    const lastChar = headingElement.querySelector("span:last-child");
    if (lastChar) lastChar.classList.add("cursor-char");

    isAnimating = false;
    endIntroSequence();
  }

  function skipAnimation() {
    if (introTypingComplete) return;
    animationSkipped = true;
    progressBar.style.width = "100%";
    progressPercentage.textContent = "100%";
    document.removeEventListener("keydown", handleSkipKey);
    if (isTouchDevice)
      document.removeEventListener("touchstart", handleSkipKey);
    endIntroSequence();
  }

  function endIntroSequence() {
    if (introTypingComplete) return;
    introTypingComplete = true;
    sessionStorage.setItem("introPlayed", "true");

    // Hide skip note + button
    skipNote.style.opacity = "0";
    if (skipBtn) {
      skipBtn.style.display = "none";
    }

    initialisingContainer.style.opacity = "0";
    setTimeout(() => {
      initialisingContainer.style.display = "none";
      greetingElement.classList.remove("hidden");
      headingElement.classList.remove("hidden");

      greetingElement.innerHTML = "";
      greetingElement.style.height = "0";
      greetingElement.style.marginBottom = "0";
      greetingElement.style.opacity = "0";
      greetingElement.style.display = "none";

      const finalText = "Will Hewitt";
      headingElement.innerHTML = "";
      headingElement.appendChild(promptElement);
      headingElement.innerHTML += finalText
        .split("")
        .map((c) => `<span>${c === " " ? "&nbsp;" : c}</span>`)
        .join("");

      isAnimating = false;
      terminalBox.classList.add("fade-out");
      document.body.classList.add("scroll-enabled");
    }, 150);
  }

  async function startNameToggleAnimation() {
    if (reduceMotion) return;
    const lastChar = headingElement.querySelector("span:last-child");
    if (lastChar) lastChar.classList.remove("cursor-char");
    if (promptElement.parentNode)
      promptElement.parentNode.removeChild(promptElement);
    await wait(1000);
    let toShort = true;
    nameToggleRunning = true;
    function setup(text) {
      headingElement.innerHTML = text
        .split("")
        .map((c) => `<span>${c === " " ? "&nbsp;" : c}</span>`)
        .join("");
      return Array.from(headingElement.children);
    }
    async function waitVisible() {
      while (document.hidden) {
        await wait(300);
      }
    }
    while (nameToggleRunning) {
      await waitVisible();
      if (isAnimating) {
        await wait(100);
        continue;
      }
      isAnimating = true;
      const fullText = `William Hewitt`;
      const shortText = `Will Hewitt`;
      await wait(4000);
      if (toShort) {
        let allChars = setup(fullText);
        const startDelete = 4,
          endDelete = 7;
        await cursorAnimate(allChars[allChars.length - 1], 200);
        for (let i = allChars.length - 1; i >= endDelete; i--)
          await cursorAnimate(allChars[i - 1], 100);
        for (let i = endDelete - 1; i >= startDelete; i--) {
          await cursorAnimate(allChars[i], 250);
          allChars[i].style.display = "none";
        }
      } else {
        let allChars = setup(shortText);
        const startType = 4;
        await cursorAnimate(allChars[allChars.length - 1], 200);
        for (let i = allChars.length - 1; i >= startType; i--)
          await cursorAnimate(allChars[i - 1], 100);
        allChars = setup(fullText);
        const iamChars = allChars.slice(startType, startType + 3);
        iamChars.forEach((c) => (c.style.display = "none"));
        for (const char of iamChars) {
          char.style.display = "inline-block";
          await cursorAnimate(char, 350);
        }
      }
      toShort = !toShort;
      isAnimating = false;
    }
  }

  // Skip handlers
  const handleSkipKey = (e) => {
    if (e.type === "touchstart" || e.code === "Space") {
      e.preventDefault();
      skipAnimation();
    }
  };

  // Scroll + sticky
  function handleScroll() {
    if (introTypingComplete && !isDocked) {
      const scrollY = window.scrollY;
      const introScrollEnd = window.innerHeight * 0.75;
      const p = Math.min(1, scrollY / introScrollEnd);
      const eased = Math.pow(p, 2);
      const startTop = window.innerHeight / 2;
      const endTop = 32;
      const newTop = startTop - (startTop - endTop) * eased;
      const startScale = 1,
        endScale = 0.4;
      const newScale = startScale - (startScale - endScale) * eased;
      terminalBox.style.transform = `translate(-50%,-50%) scale(${newScale})`;
      terminalBox.style.top = `${newTop}px`;

      const triggerRect = headerTrigger.getBoundingClientRect();
      if (triggerRect.top < endTop + 20 && !isDocked) {
        isDocked = true;
        const spacerHeight = introSpacer.offsetHeight;
        introSpacer.style.display = "none";
        window.scrollBy(0, -spacerHeight);
        terminalBox.classList.add("docked");
        const introContainer = terminalBox.querySelector("#intro-container");
        if (introContainer) introContainer.style.padding = "0";
        startNameToggleAnimation();
      }
    }
    const triggerRect = headerTrigger.getBoundingClientRect();
    if (triggerRect.top < 52) {
      stickyHeader.classList.add("visible");
      stickySocials.style.opacity = "1";
      originalSocials.style.opacity = "0";
    } else {
      stickyHeader.classList.remove("visible");
      stickySocials.style.opacity = "0";
      originalSocials.style.opacity = "1";
    }
  }

  function updateClock() {
    if (!clockElement) return;
    clockElement.textContent = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  /* Background grid + pixel trail */
  const gridSize = 40;
  let cells = [];
  let numCols, numRows;
  function createGrid() {
    gridContainer.innerHTML = "";
    cells = [];
    numCols = Math.floor(window.innerWidth / gridSize);
    numRows = Math.floor(window.innerHeight / gridSize);
    gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    for (let i = 0; i < numCols * numRows; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.row = Math.floor(i / numCols);
      cell.dataset.col = i % numCols;
      gridContainer.appendChild(cell);
      cells.push(cell);
    }
  }
  function handlePixelTrail(e) {
    if (isTouchDevice) return;
    if (reduceMotion) return;
    const col = Math.floor(e.clientX / gridSize);
    const row = Math.floor(e.clientY / gridSize);
    const index = row * numCols + col;
    if (index >= 0 && index < cells.length) {
      const cell = cells[index];
      if (cell && !cell.classList.contains("pixel-trail-active")) {
        cell.classList.add("pixel-trail-active");
        setTimeout(() => cell.classList.remove("pixel-trail-active"), 2500);
      }
    }
  }

  /* Timeline visibility/highlight */
  let currentTimelineItem = null;
  function updatePassed() {
    if (!timelineItems.length) return;
    const viewportCenter = window.innerHeight / 2;
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < viewportCenter - 100) item.classList.add("is-passed");
      else item.classList.remove("is-passed");
    });
    updateTimelineFill();
  }
  // debounce helper scoped here
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function positionTimelineMarkers() {
    timelineItems.forEach((item) => {
      const month = parseInt(item.dataset.month, 10);
      if (!isNaN(month)) {
        const yearProgress = (month - 1) / 11;
        const topValue = 25 + yearProgress * 20;
        item.style.setProperty("--marker-top", `${topValue}px`);
      }
    });
  }

  const debouncedTimelineMetrics = debounce(() => {
    positionTimelineMarkers();
    updateTimelineFill();
  }, 150);

  // Theme
  function applyTheme(theme) {
    document.documentElement.classList.toggle("light", theme === "light");
    themeToggleCheckbox.checked = theme === "light";
  }
  themeToggleCheckbox.addEventListener("change", () => {
    const newTheme = themeToggleCheckbox.checked ? "light" : "dark";
    try {
      localStorage.setItem("theme", newTheme);
    } catch {}
    applyTheme(newTheme);
  });

  // Modal (focus trap + ESC)
  const FOCUSABLE =
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastFocusedEl = null,
    removeTrap = null;
  function openModal(data) {
    if (!data.title) return;
    const skillsHtml = (data.skills || "")
      .split(",")
      .map((s) => (s.trim() ? `<span class="skill-tag">${s}</span>` : ""))
      .join("");
    modalBody.innerHTML = `
      <h3 id="modal-title" class="font-pixel text-xl text-gray-100 mb-2">${
        data.title
      }</h3>
      <p class="text-sm text-gray-400 mb-4">${data.date || ""}</p>
      <p class="text-gray-300 leading-relaxed mb-6">${data.details || ""}</p>
      <div>${skillsHtml}</div>
    `;
    lastFocusedEl = document.activeElement;
    modalOverlay.classList.add("visible");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const focusables = modalOverlay.querySelectorAll(FOCUSABLE);
    const first = focusables[0],
      last = focusables[focusables.length - 1];
    first && first.focus();
    const trap = (e) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "Tab") {
        if (focusables.length === 0) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    modalOverlay.addEventListener("keydown", trap);
    removeTrap = () => modalOverlay.removeEventListener("keydown", trap);
  }
  function closeModal() {
    modalOverlay.classList.remove("visible");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    removeTrap && removeTrap();
    lastFocusedEl && lastFocusedEl.focus();
  }
  document
    .getElementById("experience-container")
    .addEventListener("click", (e) => {
      const item = e.target.closest(".experience-item");
      if (item) openModal(item.dataset);
    });
  timelineRoot?.addEventListener("click", (e) => {
    const item = e.target.closest(".timeline-content");
    if (item) openModal(item.dataset);
  });
  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modalOverlay.classList.contains("visible") && e.key === "Escape")
      closeModal();
  });

  // Keyboard access for cards
  document.querySelectorAll(".experience-item").forEach((item) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Open details for ${item.dataset.title}`);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item.dataset);
      }
    });
  });
  timelineRoot?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = e.target.closest?.(".timeline-content");
    if (!target) return;
    e.preventDefault();
    openModal(target.dataset);
  });

  // Collapsibles (with ARIA)
  function setupCollapsible(headingId) {
    const heading = document.getElementById(headingId);
    if (!heading) return;
    const contentWrapper = heading.nextElementSibling;
    const contentId = contentWrapper.id || `${headingId}-content`;
    contentWrapper.id = contentId;
    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    heading.setAttribute("aria-controls", contentId);
    heading.setAttribute(
      "aria-expanded",
      heading.classList.contains("collapsed") ? "false" : "true"
    );
    const toggle = () => {
      const isOpen = contentWrapper.classList.toggle("open");
      heading.classList.toggle("collapsed", !isOpen);
      heading.setAttribute("aria-expanded", String(isOpen));
      // Auto-scroll for Library
      if (headingId === "library-heading" && isOpen) {
        setTimeout(() => {
          heading.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }, 100); // Delay to allow animation
      }
      if (headingId === "timeline-heading" && isOpen) {
        debouncedTimelineMetrics();
        setTimeout(() => {
          setupTimelineObservers();
          updatePassed();
        }, 120);
      }
    };
    heading.addEventListener("click", toggle);
    heading.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }

  // Tabs
  function setupTabs() {
    const containers = document.querySelectorAll(".tabs-container");
    containers.forEach((container) => {
      const btns = container.querySelectorAll(".tab-btn");
      const tabs = container.querySelectorAll(".tab-content");
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.tab;
          btns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          tabs.forEach((t) => t.classList.toggle("active", t.id === id));
        });
      });
    });
  }

  // Init
  function initialize() {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) applyTheme(savedTheme);
      else
        applyTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
    } catch {
      applyTheme("dark");
    }

    populateTimeline();
    positionTimelineMarkers();
    setupTimelineObservers();
    updatePassed();
    updateTimelineFill();

    if (isTouchDevice) {
      skipNote.textContent = "Tap to skip";
      document.addEventListener("touchstart", handleSkipKey, {
        once: true,
      });
    } else {
      skipNote.textContent = "Press [SPACE] to skip";
      document.addEventListener("keydown", handleSkipKey, { once: true });
    }
    skipBtn?.addEventListener("click", skipAnimation);

    window.addEventListener(
      "scroll",
      () => {
        handleScroll();
        updatePassed();
      },
      { passive: true }
    );

    // Check if intro has been played before, but don't skip for reduced motion preference alone
    if (sessionStorage.getItem("introPlayed")) {
      endIntroSequence();
    } else {
      initialisingAnimation();
    }

    setInterval(updateClock, 1000);
    updateClock();
    createGrid();
    document.addEventListener("mousemove", handlePixelTrail);
    const debouncedCreateGrid = debounce(createGrid, 100);
    window.addEventListener("resize", debouncedCreateGrid);
    window.addEventListener("resize", debouncedTimelineMetrics);

    // Contact buttons: scroll to footer instead of toggling contact box
    const footer = document.getElementById("footer-section");
    contactButtons.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", "footer-section");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        footer?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
        contactBoxWrapper?.classList.remove("is-visible");
      });
    });

    setupCollapsible("done-heading");
    setupCollapsible("experience-heading");
    setupCollapsible("timeline-heading");
    setupCollapsible("library-heading");
    setupTabs();
    positionTimelineMarkers();
    updatePassed();
  }

  initialize();

  /* ===== Side Nav Setup (integrated handle, left dots, auto-collapse) ===== */
  (function setupSideNavV2() {
    const sideNav = document.getElementById("side-nav");
    if (!sideNav) return;
    const sideNavHandle = document.getElementById("side-nav-handle");
    const sideNavLinks = Array.from(
      document.querySelectorAll("#side-nav .side-nav-item")
    );

    function showSideNav() {
      sideNav.classList.add("is-ready");
    }
    if (sessionStorage.getItem("introPlayed")) {
      showSideNav();
    } else if (terminalBox) {
      const mo = new MutationObserver(() => {
        if (
          terminalBox.classList.contains("fade-out") ||
          terminalBox.classList.contains("docked")
        ) {
          showSideNav();
          mo.disconnect();
        }
      });
      mo.observe(terminalBox, {
        attributes: true,
        attributeFilter: ["class"],
      });
    } else {
      showSideNav();
    }

    function expand() {
      sideNav.classList.add("expanded");
      sideNavHandle.setAttribute("aria-expanded", "true");
    }
    function collapse() {
      sideNav.classList.remove("expanded");
      sideNavHandle.setAttribute("aria-expanded", "false");
    }
    sideNavHandle.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = sideNav.classList.contains("expanded");
      if (isExpanded) collapse();
      else expand();
    });

    // Auto-collapse 0.5s after pointer leaves; cancel when re-entered
    let collapseTimer = null;
    const startCollapseCountdown = () => {
      clearTimeout(collapseTimer);
      collapseTimer = setTimeout(collapse, 500);
    };
    const cancelCollapseCountdown = () => {
      clearTimeout(collapseTimer);
    };
    sideNav.addEventListener("pointerenter", cancelCollapseCountdown);
    sideNav.addEventListener("pointerleave", startCollapseCountdown);
    sideNav.addEventListener("focusin", cancelCollapseCountdown);
    sideNav.addEventListener("focusout", (e) => {
      if (!sideNav.contains(e.relatedTarget)) startCollapseCountdown();
    });

    // Optional keyboard toggle with "g"
    document.addEventListener("keydown", (e) => {
      if (
        e.key.toLowerCase() === "g" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (["input", "textarea", "select"].includes(tag)) return;
        e.preventDefault();
        if (sideNav.classList.contains("expanded")) collapse();
        else expand();
      }
    });

    const prefersReducedMotion = reduceMotion;
    sideNavLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const sel = a.getAttribute("href");
        const target = document.querySelector(sel);
        if (!target) return;
        try {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        } catch {
          target.scrollIntoView();
        }
        startCollapseCountdown();
      });
    });

    // Active section highlighting
    const sections = sideNavLinks
      .map((a) => ({
        link: a,
        el: document.querySelector(a.getAttribute("href")),
      }))
      .filter((s) => s.el);

    function markActive() {
      const pos = window.scrollY + window.innerHeight * 0.35;
      let active = null;
      for (const s of sections) {
        if (s.el.offsetTop <= pos) active = s;
      }
      sideNavLinks.forEach((l) => l.classList.remove("active"));
      active?.link.classList.add("active");
    }
    markActive();
    window.addEventListener("scroll", markActive, { passive: true });
    window.addEventListener("resize", markActive);
  })();

  // Disconnect observers on unload
  window.addEventListener("beforeunload", () => {
    if (timelineItemObserver) timelineItemObserver.disconnect();
    if (yearObserver) yearObserver.disconnect();
    if (currentObserver) currentObserver.disconnect();
  });
});
