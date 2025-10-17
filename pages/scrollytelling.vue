<template>
  <div class="scrollytelling-page">
    <!-- Sticky Navigation -->
    <nav ref="navbar" class="navbar">
      <div class="nav-content">
        <div class="nav-logo">
          <span class="serif">The Chronicle</span>
        </div>
        <div class="nav-progress">
          <div ref="progressBar" class="progress-bar"></div>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Parallax -->
    <section ref="heroSection" class="hero-section full-height">
      <div ref="heroBackground" class="hero-bg"></div>
      <div class="hero-content">
        <div class="container">
          <h1 ref="heroTitle" class="hero-title serif text-display fade-up">
            The Art of
            <span ref="heroAccent" class="hero-accent">Digital</span>
            Storytelling
          </h1>
          <p ref="heroSubtitle" class="hero-subtitle text-body fade-up">
            An exploration of modern narrative techniques through interactive media and immersive experiences.
          </p>
          <div ref="heroMeta" class="hero-meta fade-up">
            <span class="text-caption">Published March 15, 2024</span>
            <span class="text-caption">By Editorial Team</span>
          </div>
        </div>
      </div>
      <div ref="scrollIndicator" class="scroll-indicator">
        <div class="scroll-line"></div>
        <span class="scroll-text">Scroll to explore</span>
      </div>
    </section>

    <!-- Parallax Content Section -->
    <section class="parallax-section section">
      <div ref="parallaxBg1" class="parallax-bg bg-1"></div>
      <div class="container">
        <div ref="introText" class="intro-content">
          <h2 class="text-headline serif fade-up">Chapter One: The Beginning</h2>
          <p class="text-body fade-up">
            In the digital age, storytelling has evolved beyond traditional boundaries. 
            Interactive narratives now shape how we consume and understand information, 
            creating immersive experiences that engage audiences on multiple sensory levels.
          </p>
        </div>
      </div>
    </section>

    <!-- Horizontal Scroll Section -->
    <section ref="horizontalSection" class="horizontal-section">
      <div class="horizontal-container">
        <div ref="horizontalContent" class="horizontal-content">
          <div class="horizontal-panel" v-for="(panel, index) in horizontalPanels" :key="index">
            <div class="panel-content">
              <div class="panel-image" :style="{ backgroundColor: panel.color }">
                <span class="panel-number">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <h3 class="panel-title serif">{{ panel.title }}</h3>
              <p class="panel-description text-body">{{ panel.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Text Section -->
    <section class="sticky-text-section">
      <div ref="stickyText" class="sticky-text">
        <div class="container">
          <h2 ref="stickyTitle" class="sticky-title serif text-headline">
            The power of visual narrative lies in its ability to transcend language barriers.
          </h2>
        </div>
      </div>
      <div class="sticky-spacer"></div>
    </section>

    <!-- Overlapping Cards Section -->
    <section class="cards-section section">
      <div class="container">
        <h2 class="section-title serif text-headline fade-up">Key Insights</h2>
        <div ref="cardsContainer" class="cards-container">
          <div 
            ref="card" 
            v-for="(card, index) in cards" 
            :key="index"
            class="insight-card"
            :data-index="index"
          >
            <div class="card-content">
              <div class="card-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <h3 class="card-title serif">{{ card.title }}</h3>
              <p class="card-description text-body">{{ card.description }}</p>
              <div class="card-stats">
                <div class="stat">
                  <span class="stat-number">{{ card.stat1.number }}</span>
                  <span class="stat-label">{{ card.stat1.label }}</span>
                </div>
                <div class="stat">
                  <span class="stat-number">{{ card.stat2.number }}</span>
                  <span class="stat-label">{{ card.stat2.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Reveal Section -->
    <section class="reveal-section section">
      <div class="container">
        <div class="reveal-content">
          <p ref="revealText" class="reveal-text serif text-subhead">
            <span class="reveal-line">The future of digital storytelling</span>
            <span class="reveal-line">lies at the intersection of</span>
            <span class="reveal-line">technology, creativity, and</span>
            <span class="reveal-line">human connection.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Final Parallax Section -->
    <section class="final-section full-height">
      <div ref="parallaxBg2" class="parallax-bg bg-2"></div>
      <div class="final-content">
        <div class="container">
          <h2 ref="finalTitle" class="final-title serif text-display fade-up">
            The End is Just
            <span class="accent-text">The Beginning</span>
          </h2>
          <p ref="finalText" class="final-subtitle text-body fade-up">
            Every story we tell opens the door to countless others, 
            creating an infinite tapestry of human experience.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

// Refs for elements
const navbar = ref()
const progressBar = ref()
const heroSection = ref()
const heroBackground = ref()
const heroTitle = ref()
const heroAccent = ref()
const heroSubtitle = ref()
const heroMeta = ref()
const scrollIndicator = ref()
const parallaxBg1 = ref()
const parallaxBg2 = ref()
const introText = ref()
const horizontalSection = ref()
const horizontalContent = ref()
const stickyText = ref()
const stickyTitle = ref()
const cardsContainer = ref()
const card = ref([])
const revealText = ref()
const finalTitle = ref()
const finalText = ref()

// Data
const horizontalPanels = [
  {
    title: "Visual Impact",
    description: "How imagery transforms narrative understanding and emotional connection in digital media.",
    color: "#2563eb"
  },
  {
    title: "Interactive Elements",
    description: "The role of user engagement in modern storytelling through responsive design and animation.",
    color: "#dc2626"
  },
  {
    title: "Temporal Flow",
    description: "Managing pace and rhythm in digital narratives to maintain audience attention and interest.",
    color: "#059669"
  },
  {
    title: "Emotional Resonance",
    description: "Creating lasting impact through carefully crafted moments of revelation and reflection.",
    color: "#7c2d12"
  },
  {
    title: "Technical Innovation",
    description: "Leveraging cutting-edge web technologies to push the boundaries of what's possible in storytelling.",
    color: "#4338ca"
  }
]

const cards = [
  {
    title: "Engagement Metrics",
    description: "Interactive stories show significantly higher engagement rates compared to traditional linear content.",
    stat1: { number: "340%", label: "Increase" },
    stat2: { number: "8.5min", label: "Avg. Time" }
  },
  {
    title: "Memory Retention",
    description: "Visual storytelling elements improve information retention and recall by substantial margins.",
    stat1: { number: "65%", label: "Better Recall" },
    stat2: { number: "2.5x", label: "More Memorable" }
  },
  {
    title: "Emotional Impact",
    description: "Immersive narratives create stronger emotional connections between content and audience.",
    stat1: { number: "89%", label: "Satisfaction" },
    stat2: { number: "4.2/5", label: "Rating" }
  }
]

onMounted(() => {
  // Import ScrollTrigger
  if (process.client) {
    setupAnimations()
  }
})

function setupAnimations() {
  // Progress bar animation
  $gsap.to(progressBar.value, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  })

  // Hero parallax effect
  $gsap.to(heroBackground.value, {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  })

  // Hero text animations
  const heroTl = $gsap.timeline({
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse"
    }
  })

  heroTl
    .from(heroTitle.value, { y: 100, opacity: 0, duration: 1.2, ease: "power3.out" })
    .from(heroAccent.value, { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.8")
    .from(heroSubtitle.value, { y: 60, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.6")
    .from(heroMeta.value, { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")

  // Parallax backgrounds
  $gsap.to(parallaxBg1.value, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: parallaxBg1.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  })

  $gsap.to(parallaxBg2.value, {
    yPercent: -40,
    ease: "none",
    scrollTrigger: {
      trigger: parallaxBg2.value,
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    }
  })

  // Horizontal scroll animation
  const horizontalScrollTl = $gsap.to(horizontalContent.value, {
    xPercent: -80,
    ease: "none",
    scrollTrigger: {
      trigger: horizontalSection.value,
      pin: true,
      scrub: 1,
      end: () => "+=" + (horizontalContent.value.scrollWidth - window.innerWidth)
    }
  })

  // Sticky text effect
  $gsap.timeline({
    scrollTrigger: {
      trigger: stickyText.value,
      pin: true,
      start: "top center",
      end: "+=500",
      scrub: 1
    }
  })
  .to(stickyTitle.value, {
    scale: 1.2,
    y: -50,
    ease: "power2.inOut"
  })

  // Overlapping cards animation
  card.value.forEach((cardEl, index) => {
    $gsap.fromTo(cardEl, 
      {
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardEl,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.2
      }
    )

    // Card stacking effect
    $gsap.to(cardEl, {
      y: -100 * index,
      scale: 1 - (index * 0.05),
      ease: "none",
      scrollTrigger: {
        trigger: cardsContainer.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  })

  // Text reveal animation
  const revealLines = revealText.value.querySelectorAll('.reveal-line')
  
  revealLines.forEach((line: Element, index: number) => {
    $gsap.fromTo(line as any,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.3
      }
    )
  })

  // Final section animations
  $gsap.fromTo([finalTitle.value, finalText.value],
    {
      y: 150,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: finalTitle.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  )

  // Fade up elements
  $gsap.utils.toArray('.fade-up').forEach((element: any) => {
    $gsap.fromTo(element,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    )
  })
}
</script>

<style scoped>
.scrollytelling-page {
  overflow-x: hidden;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav-progress {
  flex: 1;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 2rem;
  border-radius: 1px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--color-accent);
  width: 0%;
  border-radius: 1px;
}

/* Hero Section */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: -20%;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  margin-bottom: 1.5rem;
}

.hero-accent {
  color: var(--color-accent);
  font-style: italic;
}

.hero-subtitle {
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.hero-meta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  opacity: 0.8;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0.7;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: white;
  animation: scrollPulse 2s infinite;
}

.scroll-text {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Parallax Sections */
.parallax-section {
  position: relative;
  background: white;
}

.parallax-bg {
  position: absolute;
  top: -20%;
  left: 0;
  right: 0;
  bottom: -20%;
  z-index: -1;
}

.bg-1 {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  opacity: 0.1;
}

.bg-2 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  margin-bottom: 2rem;
}

/* Horizontal Scroll Section */
.horizontal-section {
  height: 100vh;
  overflow: hidden;
}

.horizontal-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.horizontal-content {
  display: flex;
  height: 100%;
}

.horizontal-panel {
  flex: none;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.panel-content {
  max-width: 500px;
  text-align: center;
}

.panel-image {
  width: 300px;
  height: 200px;
  margin: 0 auto 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;
}

.panel-title {
  margin-bottom: 1rem;
}

.panel-description {
  margin: 0 auto;
}

/* Sticky Text Section */
.sticky-text-section {
  position: relative;
}

.sticky-text {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--color-primary);
  color: white;
}

.sticky-title {
  max-width: 800px;
}

.sticky-spacer {
  height: 100vh;
}

/* Cards Section */
.cards-section {
  background: #f8fafc;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.cards-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.insight-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card-number {
  position: absolute;
  top: -10px;
  right: 2rem;
  background: var(--color-accent);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.card-title {
  margin-bottom: 1rem;
}

.card-description {
  margin-bottom: 2rem;
}

.card-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Text Reveal Section */
.reveal-section {
  background: #1a1a1a;
  color: white;
}

.reveal-content {
  text-align: center;
}

.reveal-text {
  line-height: 1.4;
}

.reveal-line {
  display: block;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

/* Final Section */
.final-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.final-content {
  position: relative;
  z-index: 2;
}

.final-title {
  margin-bottom: 2rem;
}

.accent-text {
  color: var(--color-accent);
  font-style: italic;
}

.final-subtitle {
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-content {
    padding: 1rem;
  }
  
  .nav-progress {
    margin: 0 1rem;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .panel-image {
    width: 250px;
    height: 150px;
  }
  
  .card-stats {
    justify-content: center;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
