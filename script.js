document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const terminalBox = document.getElementById("terminal-box");
  const greetingElement = document.getElementById("greeting");
  const headingElement = document.getElementById("dynamic-heading");
  const skipNote = document.getElementById("skip-note");
  const skipBtn = document.getElementById("skip-btn");
  const clearGridBtn = document.getElementById("clear-grid-btn");
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
  const footerLineContainer = document.getElementById("footer-line-container");
  const footerLineSvg = document.getElementById("footer-line");
  const footerLinePath = document.getElementById("footer-line-path");
    const drawColourButtons = Array.from(
    document.querySelectorAll(".draw-colour")
  );
  const sideNavSettingsToggle = document.getElementById(
    "side-nav-settings-toggle"
  );
  const sideNavSettingsLabel = sideNavSettingsToggle?.querySelector(
    ".side-nav-label"
  );
  const sideNavLinksWrapper = document.getElementById("side-nav-links");
  const sideNavSettingsPanel = document.getElementById(
    "side-nav-settings-panel"
  );
  const sideNavThemeToggle = document.getElementById("side-nav-theme-toggle");
  const sideNavDrawEnable = document.getElementById("side-nav-draw-enable");
  const sideNavDrawTrail = document.getElementById("side-nav-draw-trail");
  const sideNavColourToggle = document.getElementById(
    "side-nav-colour-toggle"
  );
  const sideNavColourPanel = document.getElementById("side-nav-colour-list");
  const sideNavColourControl = document.querySelector(
    ".side-nav-colour-control"
  );
  const sideNavColourButtons = Array.from(
    document.querySelectorAll(".side-nav-colour")
  );
  const sideNavSettingsDefaultLabel =
    sideNavSettingsLabel?.textContent?.trim() || "Settings";
  const initialisingContainer = document.getElementById(
    "initialising-container"
  );
  const progressBar = document.getElementById("progress-bar");
  const progressPercentage = document.getElementById("progress-percentage");
  const timelineRoot = document.getElementById("timeline-component");
  let timelineItems = [];
  let timelineYears = [];
  let timelineContents = [];
  let timelineProgressEl = null;
  let timelineProgressCurrent = 0;
  let timelineProgressTarget = 0;
  let timelineProgressRaf = null;
  let footerLineCleanup = null;

  // State
  let isAnimating = false;
  let isDocked = false;
  let introTypingComplete = false;
  let animationSkipped = false;
  let nameToggleRunning = false;
  let headerLocked = false;
  let headerLockScroll = 0;
  let headerScrollBlockerActive = false;
  let lastTouchY = null;
  let drawEnabled = false;
  let drawMenuOpen = false;
  let drawColourKey = "amber";
  let drawTrailEnabled = true;
  let colourPanelOpen = false;
  let themeTransitionTimer = null;
  let themeInitialized = false;
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

  function setupFooterElasticLine() {
    footerLineCleanup?.();
    footerLineCleanup = null;

    if (!footerLineContainer || !footerLinePath || !footerLineSvg) return;

    let width = 0;
    let height = 0;
    const rest = { x: 0, y: 0 };
    const control = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const grabThresholdRatio = 0.35;
    const releaseMultiplier = 1.35;
    const spring = 0.12;
    const damping = 0.78;
    const baseTarget = { x: 0, y: 0 };
    const scrollScale = 0.16;
    const scrollDecay = 0.88;
    const pointerScrollDecay = 0.92;
    let maxStretch = 0;
    let scrollStretch = 0;
    let footerActive = false;
    let pointerActive = false;
    let animationFrame = null;

    const setDimensions = () => {
      const rect = footerLineContainer.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      rest.x = width / 2;
      rest.y = height / 2;
      maxStretch = height * 0.4;
      scrollStretch = clamp(scrollStretch, 0, maxStretch);
      if (!pointerActive) {
        baseTarget.x = rest.x;
        baseTarget.y = rest.y;
        target.x = rest.x;
        target.y = rest.y;
        control.x = rest.x;
        control.y = rest.y;
      }
      footerLineSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      drawPath();
    };

    const drawPath = () => {
      const baseline = height / 2;
      const ctrlY = clamp(control.y, 0, height);
      const ctrlX = clamp(control.x, 0, width);
      footerLinePath.setAttribute(
        "d",
        `M0 ${baseline} Q ${ctrlX} ${ctrlY} ${width} ${baseline}`
      );
    };

    const stopAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const baseX = pointerActive ? clamp(baseTarget.x, 0, width) : rest.x;
      const baseY = pointerActive ? clamp(baseTarget.y, 0, height) : rest.y;
      scrollStretch *= pointerActive ? pointerScrollDecay : scrollDecay;
      if (scrollStretch < 0.4) scrollStretch = 0;
      const desiredX = baseX;
      const desiredY = clamp(baseY + scrollStretch, 0, height);
      target.x = desiredX;
      target.y = desiredY;
      const toX = target.x - control.x;
      const toY = target.y - control.y;
      velocity.x = (velocity.x + toX * spring) * damping;
      velocity.y = (velocity.y + toY * spring) * damping;
      control.x += velocity.x;
      control.y += velocity.y;
      if (
        !pointerActive &&
        scrollStretch === 0 &&
        Math.abs(toX) < 0.15 &&
        Math.abs(toY) < 0.15
      ) {
        control.x = rest.x;
        control.y = rest.y;
      }
      drawPath();
    };

    const pointerToTarget = (pointer) => {
      const rect = footerLineContainer.getBoundingClientRect();
      const x = clamp(pointer.clientX - rect.left, 0, width);
      const y = clamp(pointer.clientY - rect.top, 0, height);
      
      // Calculate distance from pointer to the bow curve (quadratic bezier)
      // Bow goes from (0, rest.y) through (control.x, control.y) to (width, rest.y)
      // For simplicity, we sample points along the curve and find the closest
      const numSamples = 20;
      let minDistanceToCurve = Infinity;
      
      for (let i = 0; i <= numSamples; i++) {
        const t = i / numSamples;
        // Quadratic bezier formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        const curveX = (1-t) * (1-t) * 0 + 2 * (1-t) * t * control.x + t * t * width;
        const curveY = (1-t) * (1-t) * rest.y + 2 * (1-t) * t * control.y + t * t * rest.y;
        const dist = Math.hypot(x - curveX, y - curveY);
        minDistanceToCurve = Math.min(minDistanceToCurve, dist);
      }
      
      // Use a more generous threshold that works along the entire bow
      const interactionThreshold = height * 0.5; // Half the container height
      
      if (minDistanceToCurve <= interactionThreshold) {
        pointerActive = true;
        baseTarget.x = x;
        baseTarget.y = y;
        target.x = x;
        target.y = y;
        return;
      }
      
      if (minDistanceToCurve >= interactionThreshold * 1.2) {
        pointerActive = false;
        baseTarget.x = rest.x;
        baseTarget.y = rest.y;
        target.x = rest.x;
        target.y = rest.y;
      }
    };

    const handlePointerMove = (event) => {
      if (reduceMotion) return;
      pointerToTarget(event);
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      baseTarget.x = rest.x;
      baseTarget.y = rest.y;
      target.x = rest.x;
      target.y = rest.y;
    };

    const handleWheel = (event) => {
      if (!footerActive || reduceMotion) return;
      if (event.deltaY === 0) return;
      const doc = document.documentElement;
      const bottomReached =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 1;
      if (!bottomReached) return;
      const prevStretch = scrollStretch;
      scrollStretch = clamp(
        scrollStretch + event.deltaY * scrollScale,
        0,
        maxStretch
      );
      
      // Auto-expand library section when footer line bows to 85% of max stretch
      const bowThreshold = maxStretch * 0.85;
      if (prevStretch < bowThreshold && scrollStretch >= bowThreshold) {
        const libraryHeading = document.getElementById("library-heading");
        const libraryContentWrapper = libraryHeading?.nextElementSibling;
        if (libraryHeading && libraryContentWrapper && !libraryContentWrapper.classList.contains("open")) {
          // Trigger the library section to open
          libraryHeading.click();
        }
      }
    };

    const resizeObserver = new ResizeObserver(setDimensions);
    resizeObserver.observe(footerLineContainer);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footerActive = true;
            footerLineContainer.classList.add("is-active");
            baseTarget.x = rest.x;
            baseTarget.y = rest.y;
            target.x = rest.x;
            target.y = rest.y;
            if (!reduceMotion && animationFrame === null) {
              animate();
            } else if (reduceMotion) {
              control.x = rest.x;
              control.y = rest.y;
              drawPath();
            }
          } else {
            footerActive = false;
            footerLineContainer.classList.remove("is-active");
            pointerActive = false;
            scrollStretch = 0;
            baseTarget.x = rest.x;
            baseTarget.y = rest.y;
            target.x = rest.x;
            target.y = rest.y;
            control.x = rest.x;
            control.y = rest.y;
            drawPath();
            stopAnimation();
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    intersectionObserver.observe(footerLineContainer);

    footerLineContainer.addEventListener("pointermove", handlePointerMove);
    footerLineContainer.addEventListener("pointerleave", handlePointerLeave);
    footerLineContainer.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("wheel", handleWheel, { passive: true });

    setDimensions();

    footerLineCleanup = () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      footerLineContainer.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      footerLineContainer.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      footerLineContainer.removeEventListener(
        "pointercancel",
        handlePointerLeave
      );
      window.removeEventListener("wheel", handleWheel);
      footerActive = false;
      pointerActive = false;
      scrollStretch = 0;
    };
  }

  function populateTimeline() {
    if (!timelineRoot) return;
    timelineRoot.innerHTML = "";

    const lineContainer = document.createElement("div");
    lineContainer.className = "timeline-line-container";
    timelineProgressEl = document.createElement("div");
    timelineProgressEl.id = "timeline-progress";
    timelineProgressEl.className = "timeline-line-progress";
    lineContainer.appendChild(timelineProgressEl);
    timelineRoot.appendChild(lineContainer);
    if (timelineProgressRaf) {
      cancelAnimationFrame(timelineProgressRaf);
      timelineProgressRaf = null;
    }
    timelineProgressCurrent = 0;
    timelineProgressTarget = 0;
    timelineProgressEl.style.transform = "scaleY(0)";

    const frag = document.createDocumentFragment();
    let itemIndex = 0;

    timelineData.forEach(({ year, entries }) => {
      const yearEl = document.createElement("div");
      yearEl.className = "timeline-year";
      yearEl.innerHTML = `<span aria-label="Timeline year ${year}">${year}</span>`;
      frag.appendChild(yearEl);

      entries.forEach((entry) => {
        const side = itemIndex % 2 === 0 ? "timeline-left" : "timeline-right";
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
    if (!timelineRoot || !timelineItems.length || !timelineProgressEl) return;
    const rect = timelineRoot.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    
    // Calculate how far the viewport center has progressed through the timeline
    const timelineStart = rect.top;
    const timelineHeight = rect.height;
    
    // Progress from 0 to 1 as viewport center moves from timeline top to bottom
    const progress = clamp((viewportCenter - timelineStart) / timelineHeight, 0, 1);
    
    setTimelineProgress(progress);
    
    // Update year boxes based on timeline progress line position
    updateYearHighlighting(progress);
  }
  
  function updateYearHighlighting(progress) {
    if (!timelineRoot || !timelineYears.length) return;
    const timelineRect = timelineRoot.getBoundingClientRect();
    const timelineHeight = timelineRect.height;
    
    timelineYears.forEach((year) => {
      const yearRect = year.getBoundingClientRect();
      const yearTopRelative = yearRect.top - timelineRect.top;
      const yearProgressThreshold = yearTopRelative / timelineHeight;
      
      if (progress >= yearProgressThreshold) {
        year.classList.add("is-passed");
      } else {
        year.classList.remove("is-passed");
      }
    });
  }

  function setTimelineProgress(value) {
    if (!timelineProgressEl) return;
    const nextValue = clamp(value, 0, 1);
    if (reduceMotion) {
      if (timelineProgressRaf) {
        cancelAnimationFrame(timelineProgressRaf);
        timelineProgressRaf = null;
      }
      timelineProgressCurrent = nextValue;
      timelineProgressTarget = nextValue;
      timelineProgressEl.style.transform = `scaleY(${timelineProgressCurrent})`;
      return;
    }

    timelineProgressTarget = nextValue;
    if (!timelineProgressRaf) {
      timelineProgressRaf = requestAnimationFrame(renderTimelineProgress);
    }
  }

  function renderTimelineProgress() {
    if (!timelineProgressEl) {
      timelineProgressRaf = null;
      return;
    }

    const diff = timelineProgressTarget - timelineProgressCurrent;
    if (Math.abs(diff) < 0.002) {
      timelineProgressCurrent = timelineProgressTarget;
      timelineProgressEl.style.transform = `scaleY(${timelineProgressCurrent})`;
      timelineProgressRaf = null;
      return;
    }

    timelineProgressCurrent += diff * 0.15;
    timelineProgressEl.style.transform = `scaleY(${timelineProgressCurrent})`;
    timelineProgressRaf = requestAnimationFrame(renderTimelineProgress);
  }

  function setupTimelineObservers() {
    if (currentObserver) currentObserver.disconnect();
    if (timelineItemObserver) timelineItemObserver.disconnect();

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
              debouncedAlignContent();
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
      
      // Show side nav immediately when intro ends
      const sideNav = document.getElementById("side-nav");
      if (sideNav) {
        setTimeout(() => {
          sideNav.classList.add("is-ready");
        }, 300);
      }
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
  function lockStickyHeader() {
    if (headerLocked) return;
    headerLocked = true;
    headerLockScroll = Math.max(window.scrollY, 0);
    stickyHeader.classList.add("visible");
    stickySocials.style.opacity = "1";
    originalSocials.style.opacity = "0";
    enableHeaderScrollBlocker();
  }

  function enforceStickyHeaderLock() {
    if (!headerLocked) return;
    stickyHeader.classList.add("visible");
    stickySocials.style.opacity = "1";
    originalSocials.style.opacity = "0";
  }

  function headerWheelBlocker(event) {
    if (!headerLocked) return;
    if (event.deltaY < 0 && window.scrollY <= headerLockScroll + 0.5) {
      event.preventDefault();
    }
  }

  function headerTouchStart(event) {
    if (!headerLocked || !event.touches?.length) return;
    lastTouchY = event.touches[0].clientY;
  }

  function headerTouchMoveBlocker(event) {
    if (!headerLocked || !event.touches?.length) return;
    const currentY = event.touches[0].clientY;
    if (lastTouchY !== null) {
      const deltaY = currentY - lastTouchY;
      if (deltaY > 0 && window.scrollY <= headerLockScroll + 0.5) {
        event.preventDefault();
      }
    }
    lastTouchY = currentY;
  }

  function enableHeaderScrollBlocker() {
    if (headerScrollBlockerActive) return;
    headerScrollBlockerActive = true;
    window.addEventListener("wheel", headerWheelBlocker, { passive: false });
    window.addEventListener("touchstart", headerTouchStart, {
      passive: false,
    });
    window.addEventListener("touchmove", headerTouchMoveBlocker, {
      passive: false,
    });
    window.addEventListener(
      "touchend",
      () => {
        lastTouchY = null;
      },
      { passive: true }
    );
    window.addEventListener(
      "touchcancel",
      () => {
        lastTouchY = null;
      },
      { passive: true }
    );
  }

  function handleScroll() {
    const triggerRect = headerTrigger.getBoundingClientRect();
    const shouldLockHeader = triggerRect.top < 52;
    if (shouldLockHeader) {
      lockStickyHeader();
    } else if (!headerLocked) {
      stickyHeader.classList.remove("visible");
      stickySocials.style.opacity = "0";
      originalSocials.style.opacity = "1";
    }

    if (headerLocked) {
      enforceStickyHeaderLock();
    }

    if (isDocked) {
      return;
    }

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

      if (shouldLockHeader && !isDocked) {
        isDocked = true;
        const spacerHeight = introSpacer.offsetHeight;
        introSpacer.style.display = "none";
        window.scrollBy(0, -spacerHeight);
        terminalBox.classList.add("docked");
        const introContainer = terminalBox.querySelector("#intro-container");
        if (introContainer) introContainer.style.padding = "0";
        document.body.classList.add("draw-ready");

        terminalBox.style.position = "fixed";
        terminalBox.style.top = "32px";
        terminalBox.style.left = "50%";
        terminalBox.style.transform = "translate(-50%, -50%) scale(0.4)";
        terminalBox.style.transition = "none";

        terminalBox.style.setProperty("--grid-align-translate", "0px");
        terminalBox.style.setProperty("--grid-align-start", "0px");
        terminalBox.style.setProperty("--grid-align-end", "0px");

        const terminalTargetIndex = gridAlignmentTargets.findIndex(
          (t) => t.selector === "#terminal-box.docked"
        );
        if (terminalTargetIndex !== -1) {
          gridAlignmentTargets.splice(terminalTargetIndex, 1);
        }

        headerLockScroll = Math.max(window.scrollY, 0);
        lockStickyHeader();

        // Show side nav when terminal docks
        const sideNav = document.getElementById("side-nav");
        if (sideNav) {
          sideNav.classList.add("is-ready");
        }

        startNameToggleAnimation();

        requestAnimationFrame(() => {
          alignContentToGrid();
        });
      }
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
  const readGridUnit = () => {
    const value = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--grid-unit")
    );
    return Number.isFinite(value) && value > 0 ? value : 40;
  };
  let gridUnit = readGridUnit();
  let cells = [];
  let numCols, numRows;
  const lockedCells = new Set();
  const DRAW_ACTION = {
    LOCK: "lock",
    UNLOCK: "unlock",
  };
  const DRAW_COLOURS = {
    amber: {
      key: "amber",
      name: "Amber",
      strong: "#fbbf24",
      fill: "rgba(251, 191, 36, 0.14)",
      border: "rgba(217, 119, 6, 0.7)",
      trail: "rgba(251, 191, 36, 0.12)",
    },
    sky: {
      key: "sky",
      name: "Sky",
      strong: "#38bdf8",
      fill: "rgba(56, 189, 248, 0.16)",
      border: "rgba(14, 165, 233, 0.7)",
      trail: "rgba(56, 189, 248, 0.12)",
    },
    violet: {
      key: "violet",
      name: "Violet",
      strong: "#a855f7",
      fill: "rgba(168, 85, 247, 0.18)",
      border: "rgba(126, 34, 206, 0.7)",
      trail: "rgba(168, 85, 247, 0.14)",
    },
    lime: {
      key: "lime",
      name: "Lime",
      strong: "#a3e635",
      fill: "rgba(163, 230, 53, 0.2)",
      border: "rgba(132, 204, 22, 0.7)",
      trail: "rgba(163, 230, 53, 0.16)",
    },
    emerald: {
      key: "emerald",
      name: "Emerald",
      strong: "#34d399",
      fill: "rgba(52, 211, 153, 0.16)",
      border: "rgba(16, 185, 129, 0.7)",
      trail: "rgba(52, 211, 153, 0.12)",
    },
    rose: {
      key: "rose",
      name: "Rose",
      strong: "#f472b6",
      fill: "rgba(244, 114, 182, 0.18)",
      border: "rgba(219, 39, 119, 0.7)",
      trail: "rgba(244, 114, 182, 0.14)",
    },
    cyan: {
      key: "cyan",
      name: "Cyan",
      strong: "#22d3ee",
      fill: "rgba(34, 211, 238, 0.16)",
      border: "rgba(6, 182, 212, 0.7)",
      trail: "rgba(34, 211, 238, 0.12)",
    },
  };
  const gridAlignmentTargets = [
    { selector: "#page-content-wrapper > .max-w-4xl", reference: "left" },
    { selector: "#projects-container", reference: "right" },
    { selector: "#experience-container", reference: "center" },
    { selector: "#timeline-component", reference: "center" },
    { selector: ".library-grid", reference: "center" },
    { selector: "#footer-line-container", reference: "center" },
    { selector: "#terminal-box.docked", reference: "center" },
  ];
  let drawingMode = null;

  const getCellKey = (row, col) => `${row}:${col}`;
  function createGrid() {
    if (!gridContainer) return;
    gridUnit = readGridUnit();
    gridContainer.innerHTML = "";
    cells = [];
    numCols = Math.max(1, Math.ceil(window.innerWidth / gridUnit));
    numRows = Math.max(1, Math.ceil(window.innerHeight / gridUnit));
    gridContainer.style.gridTemplateColumns = `repeat(${numCols}, ${gridUnit}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${numRows}, ${gridUnit}px)`;
    const validKeys = new Set();
    const total = numCols * numRows;
    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const key = getCellKey(row, col);
      validKeys.add(key);
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.dataset.key = key;
      if (lockedCells.has(key)) cell.classList.add("grid-cell--locked");
      gridContainer.appendChild(cell);
      cells.push(cell);
    }
    lockedCells.forEach((key) => {
      if (!validKeys.has(key)) lockedCells.delete(key);
    });
  }
  function handlePixelTrail(e) {
    if (isTouchDevice) return;
    if (reduceMotion || !drawTrailEnabled) return;
    const unit = gridUnit || readGridUnit();
    const col = Math.floor(e.clientX / unit);
    const row = Math.floor(e.clientY / unit);
    const index = row * numCols + col;
    if (index >= 0 && index < cells.length) {
      const cell = cells[index];
      if (cell && !cell.classList.contains("pixel-trail-active")) {
        cell.classList.add("pixel-trail-active");
        setTimeout(() => cell.classList.remove("pixel-trail-active"), 2500);
      }
    }
  }

  const interactiveSelector =
    "a, button, input, textarea, select, summary, label, [role='button'], [role='link'], [data-prevent-draw], video, audio, #modal-overlay, #modal-content, #side-nav, #terminal-box, #sticky-header, .collapsible-heading, .timeline-content, .experience-item, .project-box, .side-nav-item, .social-link";

  function getCellFromEvent(event) {
    if (!cells.length) return null;
    const unit = gridUnit || readGridUnit();
    const col = Math.floor(event.clientX / unit);
    const row = Math.floor(event.clientY / unit);
    if (col < 0 || row < 0) return null;
    if (col >= numCols || row >= numRows) return null;
    const index = row * numCols + col;
    return cells[index] || null;
  }

  function lockCell(cell) {
    if (!cell) return;
    const key = cell.dataset.key;
    if (!key) return;
    cell.classList.add("grid-cell--locked");
    lockedCells.add(key);
    updateClearButtonVisibility();
  }

  function unlockCell(cell) {
    if (!cell) return;
    const key = cell.dataset.key;
    if (!key) return;
    cell.classList.remove("grid-cell--locked");
    lockedCells.delete(key);
    updateClearButtonVisibility();
  }

  function updateClearButtonVisibility() {
    if (!clearGridBtn) return;
    if (lockedCells.size > 0) {
      clearGridBtn.style.opacity = "1";
      clearGridBtn.style.pointerEvents = "auto";
    } else {
      clearGridBtn.style.opacity = "0";
      clearGridBtn.style.pointerEvents = "none";
    }
  }

  function alignContentToGrid() {
    gridUnit = readGridUnit();
    const unit = gridUnit;
    const epsilon = 0.5;
    const normalize = (value) => {
      const remainder = value % unit;
      return remainder < 0 ? remainder + unit : remainder;
    };

    gridAlignmentTargets.forEach(({ selector, reference = "left" }) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (!element) return;
        
        // CRITICAL: Skip terminal once it's docked - it's permanently fixed
        if (element.id === "terminal-box" && isDocked) {
          return;
        }

        element.classList.add("grid-aligned");
        element.style.setProperty("--grid-align-start", "0px");
        element.style.setProperty("--grid-align-end", "0px");
        element.style.setProperty("--grid-align-translate", "0px");

        const rect = element.getBoundingClientRect();
        if (!rect.width) return;

        if (reference === "center") {
          if (window.innerWidth <= 768) return;
          const center = rect.left + rect.width / 2;
          const remainder = normalize(center);
          let adjustment = 0;
          if (remainder > epsilon && Math.abs(unit - remainder) > epsilon) {
            adjustment = remainder <= unit / 2 ? -remainder : unit - remainder;
          }
          if (Math.abs(adjustment) > epsilon) {
            element.style.setProperty("--grid-align-translate", `${adjustment}px`);
          }
        } else if (reference === "right") {
          const remainder = normalize(rect.right);
          const padding = unit - remainder;
          if (remainder > epsilon && padding > epsilon && padding < unit - epsilon) {
            element.style.setProperty("--grid-align-end", `${padding}px`);
          }
        } else if (reference === "left") {
          if (window.innerWidth <= 768) return;
          const remainder = normalize(rect.left);
          let adjustment = 0;
          if (remainder > epsilon && Math.abs(unit - remainder) > epsilon) {
            adjustment = remainder <= unit / 2 ? -remainder : unit - remainder;
          }
          if (Math.abs(adjustment) > epsilon) {
            element.style.setProperty("--grid-align-translate", `${adjustment}px`);
          }
        }
      });
    });
    
    // Ensure sticky header alignment matches terminal box when both are visible
    if (isDocked && stickyHeader?.classList.contains('visible')) {
      syncHeaderAlignment();
    }
  }
  
  function syncHeaderAlignment() {
    if (!terminalBox || !stickyHeader) return;
    
    // Get the grid-aligned translate value from terminal box if it's docked
    const terminalTranslate = terminalBox.style.getPropertyValue("--grid-align-translate") || "0px";
    
    // Apply the same alignment to sticky header content
    const stickyContent = stickyHeader.querySelector('.max-w-4xl');
    if (stickyContent) {
      stickyContent.style.setProperty("--grid-align-translate", terminalTranslate);
      stickyContent.classList.add("grid-aligned");
    }
  }

  function clearAllLockedCells() {
    cells.forEach((cell) => {
      cell.classList.remove("grid-cell--locked");
    });
    lockedCells.clear();
    updateClearButtonVisibility();
  }

  function shouldIgnorePointer(event) {
    const target = event.target;
    if (!target) return true;
    if (modalOverlay?.classList.contains("visible") && modalOverlay.contains(target)) {
      return true;
    }
    return Boolean(target.closest(interactiveSelector));
  }

  function handleGridPointerDown(event) {
    if (event.pointerType === "touch") return;
    if (typeof event.button === "number" && event.button !== 0) return;
    if (!gridContainer || shouldIgnorePointer(event)) return;
    if (!drawEnabled) return;
    const cell = getCellFromEvent(event);
    if (!cell) return;
    const isLocked = cell.classList.contains("grid-cell--locked");
    drawingMode = isLocked ? DRAW_ACTION.UNLOCK : DRAW_ACTION.LOCK;
    if (drawingMode === DRAW_ACTION.LOCK) lockCell(cell);
    else unlockCell(cell);
  }

  function handleGridPointerMove(event) {
    if (!drawingMode) return;
    if (event.pointerType === "touch") return;
    if (!drawEnabled) return;
    const cell = getCellFromEvent(event);
    if (!cell) return;
    const isLocked = cell.classList.contains("grid-cell--locked");
    if (drawingMode === DRAW_ACTION.LOCK && !isLocked) {
      lockCell(cell);
    } else if (drawingMode === DRAW_ACTION.UNLOCK && isLocked) {
      unlockCell(cell);
    }
  }

  function resetDrawingState() {
    drawingMode = null;
  }

  function applyDrawColour(key, { save = true } = {}) {
    const colour = DRAW_COLOURS[key] || DRAW_COLOURS.amber;
    drawColourKey = colour.key;
    document.documentElement.style.setProperty(
      "--draw-color-strong",
      colour.strong
    );
    document.documentElement.style.setProperty("--draw-fill", colour.fill);
    document.documentElement.style.setProperty("--draw-border", colour.border);
    document.documentElement.style.setProperty("--draw-trail", colour.trail);
    drawColourButtons.forEach((btn) => {
      const isSelected = btn.dataset.colour === colour.key;
      btn.setAttribute("aria-checked", String(isSelected));
      btn.classList.toggle("is-selected", isSelected);
    });
    if (sideNavColourToggle) {
      sideNavColourToggle.setAttribute("data-colour", colour.key);
      const toggleLabel = sideNavColourToggle.querySelector(
        ".side-nav-colour-label"
      );
      const toggleSwatch = sideNavColourToggle.querySelector(
        ".side-nav-colour-swatch"
      );
      if (toggleLabel) {
        toggleLabel.textContent = `Drawing colour: ${colour.name}`;
      }
      if (toggleSwatch) {
        toggleSwatch.dataset.colour = colour.key;
      }
    }
    sideNavColourButtons.forEach((btn) => {
      const isSelected = btn.dataset.colour === colour.key;
      btn.setAttribute("aria-checked", String(isSelected));
      btn.classList.toggle("is-selected", isSelected);
    });
    if (save) {
      try {
        localStorage.setItem("drawColour", colour.key);
      } catch {}
    }
  }

  function setDrawEnabled(value, { save = true } = {}) {
    drawEnabled = Boolean(value);
    document.body.classList.toggle("draw-enabled", drawEnabled);
    if (
      drawEnabled &&
      (isDocked || terminalBox?.classList.contains("docked"))
    ) {
      document.body.classList.add("draw-ready");
    }
        if (sideNavDrawEnable) {
      sideNavDrawEnable.setAttribute("aria-pressed", String(drawEnabled));
      sideNavDrawEnable.textContent = drawEnabled
        ? "Disable drawing"
        : "Enable drawing";
    }
    if (!drawEnabled) resetDrawingState();
    if (save) {
      try {
        localStorage.setItem("drawModeEnabled", String(drawEnabled));
      } catch {}
    }
  }

  function clearPixelTrailActivity() {
    if (!cells.length) return;
    cells.forEach((cell) => cell.classList.remove("pixel-trail-active"));
  }

  function setDrawTrailEnabled(value, { save = true } = {}) {
    drawTrailEnabled = Boolean(value);
        if (sideNavDrawTrail) {
      sideNavDrawTrail.setAttribute("aria-pressed", String(drawTrailEnabled));
      sideNavDrawTrail.textContent = drawTrailEnabled
        ? "Disable trail effect"
        : "Enable trail effect";
    }
    document.body.classList.toggle("draw-trail-disabled", !drawTrailEnabled);
    if (!drawTrailEnabled) clearPixelTrailActivity();
    if (save) {
      try {
        localStorage.setItem("drawTrailEnabled", String(drawTrailEnabled));
      } catch {}
    }
  }

  
  function openSideNavColourPanel({ focusFirst = true } = {}) {
    if (!sideNavColourToggle || !sideNavColourPanel || colourPanelOpen)
      return;
    colourPanelOpen = true;
    sideNavColourToggle.setAttribute("aria-expanded", "true");
    sideNavColourPanel.hidden = false;
    if (focusFirst) {
      requestAnimationFrame(() => {
        const selectedButton = sideNavColourButtons.find(
          (btn) => btn.getAttribute("aria-checked") === "true"
        );
        (selectedButton || sideNavColourButtons[0])?.focus({
          preventScroll: true,
        });
      });
    }
  }

  function closeSideNavColourPanel({ focusToggle = false } = {}) {
    if (!sideNavColourToggle || !sideNavColourPanel || !colourPanelOpen)
      return;
    colourPanelOpen = false;
    sideNavColourToggle.setAttribute("aria-expanded", "false");
    sideNavColourPanel.hidden = true;
    if (focusToggle) {
      requestAnimationFrame(() => {
        sideNavColourToggle.focus({ preventScroll: true });
      });
    }
  }

  function toggleSideNavColourPanel() {
    if (colourPanelOpen) closeSideNavColourPanel();
    else openSideNavColourPanel();
  }

  function triggerThemeTransition() {
    if (reduceMotion) return;
    document.documentElement.classList.add("theme-transition");
    clearTimeout(themeTransitionTimer);
    themeTransitionTimer = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 420);
  }

  sideNavColourToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleSideNavColourPanel();
  });

  sideNavColourButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.colour;
      if (!key || key === drawColourKey) {
        closeSideNavColourPanel({ focusToggle: true });
        return;
      }
      applyDrawColour(key);
      closeSideNavColourPanel({ focusToggle: true });
    });
  });

  function handleGlobalPointerDown(event) {
    if (
      colourPanelOpen &&
      sideNavColourControl &&
      !sideNavColourControl.contains(event.target)
    ) {
      closeSideNavColourPanel();
    }
  }

  function handleGlobalKeydown(event) {
    if (event.key === "Escape") {
      if (colourPanelOpen) {
        closeSideNavColourPanel({ focusToggle: true });
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

  const debouncedAlignContent = debounce(alignContentToGrid, 100);

  const debouncedTimelineMetrics = debounce(() => {
    positionTimelineMarkers();
    updateTimelineFill();
    debouncedAlignContent();
  }, 150);
  
  const handleResize = debounce(() => {
    gridUnit = readGridUnit();
    createGrid();
    alignContentToGrid();
    
    // If terminal is docked, ensure it stays aligned
    if (isDocked) {
      requestAnimationFrame(() => {
        alignContentToGrid();
        syncHeaderAlignment();
      });
    }
  }, 150);

  // Theme
  function applyTheme(theme) {
    const isLight = theme === "light";
    const wasLight = document.documentElement.classList.contains("light");
    if (themeInitialized && isLight !== wasLight) {
      triggerThemeTransition();
    }
    document.documentElement.classList.toggle("light", isLight);
    themeInitialized = true;
        if (sideNavThemeToggle) {
      sideNavThemeToggle.setAttribute("aria-pressed", String(isLight));
      sideNavThemeToggle.textContent = isLight
        ? "Switch to night mode"
        : "Switch to day mode";
    }
  }

  
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
      setTimeout(() => {
        debouncedAlignContent();
      }, 160);
    };
    heading.addEventListener("click", toggle);
    heading.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }

  // Library capsule tabs
  function setupLibraryTabs() {
    const capsule = document.querySelector("#library-section .t-capsule");
    if (!capsule) return;

    const tabs = Array.from(capsule.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    const panels = tabs.map((tab) => {
      const id = tab.getAttribute("aria-controls");
      return id ? document.getElementById(id) : null;
    });
    const thumb = capsule.querySelector(".thumb");

    let activeIndex = tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true"
    );
    if (activeIndex < 0) activeIndex = 0;

    const moveThumb = (index) => {
      if (!thumb || !tabs[index]) return;
      const tabRect = tabs[index].getBoundingClientRect();
      const capsuleRect = capsule.getBoundingClientRect();
      thumb.style.left = `${tabRect.left - capsuleRect.left}px`;
      thumb.style.width = `${tabRect.width}px`;
    };

    const activate = (index, { focus = false } = {}) => {
      const total = tabs.length;
      if (!total) return;
      const nextIndex = (index + total) % total;
      activeIndex = nextIndex;

      tabs.forEach((tab, idx) => {
        const isActive = idx === nextIndex;
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        if (isActive && focus) {
          tab.focus({ preventScroll: true });
        }
      });

      panels.forEach((panel, idx) => {
        if (!panel) return;
        const isShown = idx === nextIndex;
        panel.toggleAttribute("hidden", !isShown);
        panel.setAttribute("aria-hidden", isShown ? "false" : "true");
      });

      moveThumb(nextIndex);
      debouncedAlignContent();
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => activate(idx));
      tab.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowRight":
            event.preventDefault();
            activate(idx + 1, { focus: true });
            break;
          case "ArrowLeft":
            event.preventDefault();
            activate(idx - 1, { focus: true });
            break;
          case "Home":
            event.preventDefault();
            activate(0, { focus: true });
            break;
          case "End":
            event.preventDefault();
            activate(tabs.length - 1, { focus: true });
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            activate(idx, { focus: true });
            break;
          default:
            break;
        }
      });
    });

    const handleResize = () => moveThumb(activeIndex);
    window.addEventListener("resize", handleResize);

    activate(activeIndex);
    requestAnimationFrame(() => moveThumb(activeIndex));
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


    try {
      const storedColour = localStorage.getItem("drawColour");
      if (storedColour && DRAW_COLOURS[storedColour]) {
        applyDrawColour(storedColour, { save: false });
      } else {
        applyDrawColour(drawColourKey, { save: false });
      }
      const storedDrawEnabled = localStorage.getItem("drawModeEnabled");
      if (storedDrawEnabled === "true") {
        setDrawEnabled(true, { save: false });
      }
      const storedTrailEnabled = localStorage.getItem("drawTrailEnabled");
      if (storedTrailEnabled === "false") {
        setDrawTrailEnabled(false, { save: false });
      } else {
        setDrawTrailEnabled(true, { save: false });
      }
    } catch {
      applyDrawColour(drawColourKey, { save: false });
      setDrawTrailEnabled(true, { save: false });
    }

    setDrawEnabled(drawEnabled, { save: false });
    setDrawTrailEnabled(drawTrailEnabled, { save: false });

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
    clearGridBtn?.addEventListener("click", clearAllLockedCells);

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
    alignContentToGrid();
    document.addEventListener("mousemove", handlePixelTrail);
    document.addEventListener("pointerdown", handleGridPointerDown);
    window.addEventListener("pointermove", handleGridPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", resetDrawingState);
    window.addEventListener("pointercancel", resetDrawingState);
    window.addEventListener("blur", resetDrawingState);
    window.addEventListener("resize", handleResize);
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

    setupFooterElasticLine();

    setupCollapsible("done-heading");
    setupCollapsible("experience-heading");
    setupCollapsible("timeline-heading");
    setupCollapsible("projects-heading");
    setupCollapsible("library-heading");
    setupLibraryTabs();
    positionTimelineMarkers();
    updatePassed();
    alignContentToGrid();

    
    drawColourButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.colour;
        if (!key || key === drawColourKey) return;
        applyDrawColour(key);
      });
    });

    sideNavThemeToggle?.addEventListener("click", () => {
      const isLight = document.documentElement.classList.contains("light");
      const newTheme = isLight ? "dark" : "light";
      try {
        localStorage.setItem("theme", newTheme);
      } catch {}
      applyTheme(newTheme);
    });

    sideNavDrawEnable?.addEventListener("click", () => {
      setDrawEnabled(!drawEnabled);
    });

    sideNavDrawTrail?.addEventListener("click", () => {
      setDrawTrailEnabled(!drawTrailEnabled);
    });

    document.addEventListener("pointerdown", handleGlobalPointerDown);
    document.addEventListener("keydown", handleGlobalKeydown);
  }

  initialize();

  if (terminalBox?.classList.contains("docked")) {
    document.body.classList.add("draw-ready");
  }

  handleScroll();

  /* ===== Side Nav Setup (integrated handle, left dots, auto-collapse) ===== */
  (function setupSideNavV2() {
    const sideNav = document.getElementById("side-nav");
    if (!sideNav) return;
    const sideNavHandle = document.getElementById("side-nav-handle");
    const sideNavLinks = Array.from(
      document.querySelectorAll("#side-nav-links .side-nav-item")
    );
    const settingsToggle = sideNavSettingsToggle;
    const settingsPanel = sideNavSettingsPanel;
    let settingsOpen = false;

    const hideLinks = () => {
      if (!sideNavLinksWrapper) return;
      sideNavLinksWrapper.hidden = true;
    };

    const showLinks = () => {
      if (!sideNavLinksWrapper) return;
      sideNavLinksWrapper.hidden = false;
    };

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
      closeSettings();
      sideNav.classList.remove("expanded");
      sideNavHandle.setAttribute("aria-expanded", "false");
    }
    sideNavHandle.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = sideNav.classList.contains("expanded");
      if (isExpanded) collapse();
      else expand();
    });

    function openSettings({ focusFirst = false } = {}) {
      if (!settingsToggle || !settingsPanel || settingsOpen) return;
      closeSideNavColourPanel();
      settingsOpen = true;
      if (!sideNav.classList.contains("expanded")) {
        expand();
      }
      sideNav.classList.add("settings-open");
      settingsToggle.setAttribute("aria-expanded", "true");
      settingsToggle.setAttribute("aria-label", "Close settings");
      settingsPanel.hidden = false;
      hideLinks();
      if (focusFirst) {
        requestAnimationFrame(() => {
          sideNavThemeToggle?.focus({ preventScroll: true });
        });
      }
    }

    function closeSettings() {
      if (!settingsOpen) return;
      settingsOpen = false;
      sideNav.classList.remove("settings-open");
      settingsToggle?.setAttribute("aria-expanded", "false");
      settingsToggle?.setAttribute("aria-label", "Open settings");
      closeSideNavColourPanel();
      if (settingsPanel) settingsPanel.hidden = true;
      showLinks();
    }

    if (settingsToggle) {
      settingsToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (settingsOpen) closeSettings();
        else openSettings({ focusFirst: true });
      });
    }

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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && settingsOpen) {
        closeSettings();
        settingsToggle?.focus({ preventScroll: true });
      }
    });

    const prefersReducedMotion = reduceMotion;
    sideNavLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const sel = a.getAttribute("href");
        const target = document.querySelector(sel);
        if (!target) return;
        
        // Check if target section has a collapsible heading
        const collapsibleHeading = target.querySelector('[id$="-heading"]');
        if (collapsibleHeading) {
          const contentWrapper = collapsibleHeading.nextElementSibling;
          const isCollapsed = !contentWrapper.classList.contains("open");
          
          // If collapsed, expand it before scrolling
          if (isCollapsed) {
            collapsibleHeading.click(); // Trigger the existing toggle logic
          }
        }
        
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
    if (currentObserver) currentObserver.disconnect();
    footerLineCleanup?.();
    resetDrawingState();
  });
});
