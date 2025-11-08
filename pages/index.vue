<script setup lang="ts">
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  // Refs for elements
  const navbar = ref();
  const progressBar = ref();
  const heroSection = ref();
  const heroBackground = ref();
  const heroTitle = ref();
  const heroAccent = ref();
  const heroSubtitle = ref();
  const heroMeta = ref();
  const scrollIndicator = ref();
  const parallaxBg1 = ref();
  const parallaxBg2 = ref();
  const introText = ref();
  const horizontalSection = ref();
  const horizontalContent = ref();
  const horizontalImageRefs = ref<any[]>([]);
  const horizontalIntroText = ref();
  const horizontalOutroText = ref();
  const stickyText = ref();
  const stickyTitle = ref();
  const pinnedSection = ref();
  const timelineContent = ref();
  const pinnedCards = ref();
  const card1 = ref();
  const card2 = ref();
  const card3 = ref();
  const cardsContainer = ref();
  const card = ref([]);
  const revealText = ref();
  const finalTitle = ref();
  const finalText = ref();

  // Data - Horizontal scroll images with varied sizes
  const horizontalImages = [
    {
      src: 'https://picsum.photos/600/750?random=1',
      width: 'w-[600px]',
      height: 'h-[750px]',
      offset: 'top-[5%]',
      speed: 0.5,
    },
    {
      src: 'https://picsum.photos/550/700?random=2',
      width: 'w-[550px]',
      height: 'h-[700px]',
      offset: 'top-[20%]',
      speed: 0.8,
    },
    {
      src: 'https://picsum.photos/700/550?random=3',
      width: 'w-[700px]',
      height: 'h-[550px]',
      offset: 'top-[10%]',
      speed: 0.6,
    },
    {
      src: 'https://picsum.photos/580/720?random=4',
      width: 'w-[580px]',
      height: 'h-[720px]',
      offset: 'top-[25%]',
      speed: 0.7,
    },
    {
      src: 'https://picsum.photos/650/600?random=5',
      width: 'w-[650px]',
      height: 'h-[600px]',
      offset: 'top-[15%]',
      speed: 0.9,
    },
    {
      src: 'https://picsum.photos/560/780?random=6',
      width: 'w-[560px]',
      height: 'h-[780px]',
      offset: 'top-[8%]',
      speed: 0.55,
    },
  ];

  const cards = [
    {
      title: 'Engagement Metrics',
      description:
        'Interactive stories show significantly higher engagement rates compared to traditional linear content.',
      stat1: { number: '340%', label: 'Increase' },
      stat2: { number: '8.5min', label: 'Avg. Time' },
    },
    {
      title: 'Memory Retention',
      description:
        'Visual storytelling elements improve information retention and recall by substantial margins.',
      stat1: { number: '65%', label: 'Better Recall' },
      stat2: { number: '2.5x', label: 'More Memorable' },
    },
    {
      title: 'Emotional Impact',
      description:
        'Immersive narratives create stronger emotional connections between content and audience.',
      stat1: { number: '89%', label: 'Satisfaction' },
      stat2: { number: '4.2/5', label: 'Rating' },
    },
  ];

  onMounted(() => {
    // Import ScrollTrigger
    if (process.client) {
      setupAnimations();
    }
  });

  function setupAnimations() {
    // Progress bar animation
    $gsap.to(progressBar.value, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Hero parallax effect
    $gsap.to(heroBackground.value, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Hero text animations
    const heroTl = $gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    heroTl
      .from(heroTitle.value, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      .from(
        heroAccent.value,
        { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.8',
      )
      .from(
        heroSubtitle.value,
        { y: 60, opacity: 0, duration: 1, ease: 'power2.out' },
        '-=0.6',
      )
      .from(
        heroMeta.value,
        { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4',
      );

    // Parallax backgrounds
    $gsap.to(parallaxBg1.value, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxBg1.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    $gsap.to(parallaxBg2.value, {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxBg2.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Horizontal scroll animation with parallax effect
    const scrollDistance = 4000; // Distance to scroll through (increased for offset start)
    
    // Pin the section while scrolling
    $ScrollTrigger.create({
      trigger: horizontalSection.value,
      pin: true,
      start: 'top top',
      end: () => '+=' + scrollDistance,
    });

    // Individual image parallax - each moves at different speed (NYT-style)
    horizontalImageRefs.value.forEach((imageEl, index) => {
      if (!imageEl) return;
      
      const speed = horizontalImages[index].speed;
      const distance = -scrollDistance * speed;
      
      $gsap.to(imageEl, {
        x: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection.value,
          start: 'top top',
          end: () => '+=' + scrollDistance,
          scrub: 1,
        },
      });
    });

    // Intro text fade out as images scroll over it
    $gsap.to(horizontalIntroText.value, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection.value,
        start: 'top top+=300',
        end: 'top top+=1000',
        scrub: 1,
      },
    });

    // Outro text fade in as we reach the end
    $gsap.fromTo(
      horizontalOutroText.value,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection.value,
          start: () => 'top top+=' + (scrollDistance - 1000),
          end: () => 'top top+=' + scrollDistance,
          scrub: 1,
        },
      }
    );

    // Sticky text effect
    $gsap
      .timeline({
        scrollTrigger: {
          trigger: stickyText.value,
          pin: true,
          start: 'top center',
          end: '+=500',
          scrub: 1,
        },
      })
      .to(stickyTitle.value, {
        scale: 1.2,
        y: -50,
        ease: 'power2.inOut',
      });

    // Overlapping cards animation
    card.value.forEach((cardEl, index) => {
      $gsap.fromTo(
        cardEl,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        },
      );

      // Card stacking effect
      $gsap.to(cardEl, {
        y: -100 * index,
        scale: 1 - index * 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: cardsContainer.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Text reveal animation
    const revealLines = revealText.value.querySelectorAll('span');

    revealLines.forEach((line: Element, index: number) => {
      $gsap.from(line as any, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: index * 0.3,
      });
    });

    // Final section animations
    $gsap.from([finalTitle.value, finalText.value], {
      y: 150,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: finalTitle.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Intro text animations
    const introElements = introText.value.querySelectorAll('h2, p');
    introElements.forEach((element: any, index: number) => {
      $gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Pinned timeline section
    const timelineItems = timelineContent.value.querySelectorAll('.timeline-item');
    
    // Animate each timeline item as it enters
    timelineItems.forEach((item: Element, index: number) => {
      $gsap.from(item, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Pin the cards container while content scrolls
    $ScrollTrigger.create({
      trigger: pinnedSection.value,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedCards.value,
      pinSpacing: false,
    });

    // Card stacking animation - each card animates in as corresponding content section enters
    const cards = [card1.value, card2.value, card3.value];
    
    cards.forEach((card, index) => {
      const trigger = timelineItems[index];
      
      // Start all cards stacked below (hidden)
      $gsap.set(card, { yPercent: 100, opacity: 0, scale: 0.9 });
      
      // Animate each card up and visible when its section enters
      $gsap.to(card, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });
      
      // Scale down and fade previous cards as next section enters
      if (index < cards.length - 1) {
        const nextTrigger = timelineItems[index + 1];
        $gsap.to(card, {
          scale: 0.95,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: nextTrigger,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        });
      }
    });

    // Cards section title
    const cardsTitle = document.querySelector('.bg-base-200 h2');
    if (cardsTitle) {
      $gsap.from(cardsTitle, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Sticky Navigation -->
    <nav
      ref="navbar"
      class="fixed top-0 left-0 right-0 z-[10000] bg-base-100/95 backdrop-blur-[10px] border-b border-base-300"
    >
      <div
        class="flex items-center justify-between py-4 px-4 md:px-8 max-w-screen-xl mx-auto"
      >
        <div class="text-2xl font-bold text-base-content">
          <span class="serif">The Chronicle</span>
        </div>
        <div
          class="flex-1 h-0.5 bg-base-300/20 mx-4 md:mx-8 rounded-sm overflow-hidden"
        >
          <div ref="progressBar" class="h-full bg-accent w-0 rounded-sm"></div>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Parallax -->
    <section
      ref="heroSection"
      class="relative flex items-center justify-center text-center text-white overflow-hidden min-h-screen"
    >
      <div
        ref="heroBackground"
        class="absolute -top-[20%] left-0 right-0 bottom-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] -z-10"
      ></div>
      <div class="relative z-[2]">
        <div class="container">
          <h1 ref="heroTitle" class="mb-6 serif text-display">
            The Art of
            <span ref="heroAccent" class="text-accent italic">Digital</span>
            Storytelling
          </h1>
          <p
            ref="heroSubtitle"
            class="mb-8 max-w-[600px] mx-auto opacity-90 text-body"
          >
            An exploration of modern narrative techniques through interactive
            media and immersive experiences.
          </p>
          <div
            ref="heroMeta"
            class="flex flex-col md:flex-row gap-2 md:gap-8 justify-center opacity-80"
          >
            <span class="text-caption">Published March 15, 2024</span>
            <span class="text-caption">By Editorial Team</span>
          </div>
        </div>
      </div>
      <div
        ref="scrollIndicator"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70"
      >
        <div class="w-px h-[60px] bg-white animate-pulse"></div>
        <span class="text-sm uppercase tracking-widest">Scroll to explore</span>
      </div>
    </section>

    <!-- Parallax Content Section -->
    <section class="relative bg-base-100 text-base-content section">
      <div class="container">
        <div ref="introText" class="max-w-3xl mx-auto text-center">
          <h2 class="text-headline serif">Chapter One: The Beginning</h2>
          <p class="text-body">
            In the digital age, storytelling has evolved beyond traditional
            boundaries. Interactive narratives now shape how we consume and
            understand information, creating immersive experiences that engage
            audiences on multiple sensory levels.
          </p>
        </div>
      </div>
    </section>

    <!-- Pinned Timeline Section -->
    <section ref="pinnedSection" class="relative bg-base-200 text-base-content">
      <div class="container py-xl">
        <div class="grid md:grid-cols-2 gap-8 md:gap-16">
          <!-- Left Content - Scrolls Normally -->
          <div ref="timelineContent" class="space-y-0">
            <!-- Section 1: Visual Narrative -->
            <div class="timeline-item min-h-screen flex flex-col justify-center space-y-4 py-24">
              <div
                class="w-10 h-10 bg-accent text-accent-content rounded-full flex items-center justify-center text-lg font-bold mb-4"
              >
                1
              </div>
              <h3 class="serif text-subhead">Visual Narrative</h3>
              <p class="text-base-content/80">
                The art of visual storytelling goes beyond aesthetics—it's about
                creating a language that speaks directly to emotion. Through
                carefully crafted imagery, color theory, and motion design, we
                build narratives that resonate on an instinctive level.
              </p>
              
              <!-- Accordion -->
              <details class="collapse collapse-arrow bg-base-100">
                <summary class="collapse-title font-medium">View More</summary>
                <div class="collapse-content space-y-3">
                  <p class="text-sm text-base-content/70">
                    Modern visual narratives leverage the principles of
                    cinematography, photography, and graphic design to create
                    cohesive stories. Every element—from typography to image
                    composition—serves the narrative purpose.
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-sm text-base-content/70">
                    <li>Color psychology and emotional impact</li>
                    <li>Motion design and temporal rhythm</li>
                    <li>Compositional hierarchy and focus</li>
                    <li>Visual metaphor and symbolism</li>
                  </ul>
                </div>
              </details>
            </div>

            <!-- Section 2: Interactive Design -->
            <div class="timeline-item min-h-screen flex flex-col justify-center space-y-4 py-24">
              <div
                class="w-10 h-10 bg-accent text-accent-content rounded-full flex items-center justify-center text-lg font-bold mb-4"
              >
                2
              </div>
              <h3 class="serif text-subhead">Interactive Design</h3>
              <p class="text-base-content/80">
                Interaction transforms passive viewers into active participants.
                Through thoughtful design patterns, micro-interactions, and
                responsive feedback, we create experiences that invite
                exploration and foster deeper engagement with content.
              </p>
              
              <!-- Accordion -->
              <details class="collapse collapse-arrow bg-base-100">
                <summary class="collapse-title font-medium">View More</summary>
                <div class="collapse-content space-y-3">
                  <p class="text-sm text-base-content/70">
                    Interactive design is about creating intuitive pathways that
                    guide users through experiences while maintaining a sense of
                    agency and discovery. It's the balance between structure and
                    freedom.
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-sm text-base-content/70">
                    <li>Gesture-based navigation patterns</li>
                    <li>Micro-interactions and feedback loops</li>
                    <li>Progressive disclosure techniques</li>
                    <li>Adaptive and personalized experiences</li>
                  </ul>
                </div>
              </details>
            </div>

            <!-- Section 3: Emotional Connection -->
            <div class="timeline-item min-h-screen flex flex-col justify-center space-y-4 py-24">
              <div
                class="w-10 h-10 bg-accent text-accent-content rounded-full flex items-center justify-center text-lg font-bold mb-4"
              >
                3
              </div>
              <h3 class="serif text-subhead">Emotional Connection</h3>
              <p class="text-base-content/80">
                At the heart of every memorable experience is emotion. By
                understanding human psychology and behavioral patterns, we craft
                moments that create lasting impressions and build meaningful
                relationships between brands and their audiences.
              </p>
              
              <!-- Accordion -->
              <details class="collapse collapse-arrow bg-base-100">
                <summary class="collapse-title font-medium">View More</summary>
                <div class="collapse-content space-y-3">
                  <p class="text-sm text-base-content/70">
                    Emotional design goes beyond usability to create experiences
                    that people remember, share, and return to. It's about
                    understanding the "why" behind user behavior.
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-sm text-base-content/70">
                    <li>Storytelling through user journeys</li>
                    <li>Building trust and brand loyalty</li>
                    <li>Empathetic design and accessibility</li>
                    <li>Creating shareable moments</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          <!-- Right Side - Pinned Cards -->
          <div class="relative hidden md:block">
            <div ref="pinnedCards" class="sticky top-24 h-[600px]">
              <!-- Card 1 -->
              <div
                ref="card1"
                class="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-8 flex items-center justify-center text-white shadow-2xl z-10"
              >
                <div class="text-center">
                  <div class="text-7xl mb-6">🎨</div>
                  <h4 class="text-2xl font-bold mb-2">Visual Storytelling</h4>
                  <p class="text-white/80">Creating meaningful imagery</p>
                </div>
              </div>

              <!-- Card 2 -->
              <div
                ref="card2"
                class="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-2xl p-8 flex items-center justify-center text-white shadow-2xl z-20"
              >
                <div class="text-center">
                  <div class="text-7xl mb-6">✨</div>
                  <h4 class="text-2xl font-bold mb-2">Interactive Magic</h4>
                  <p class="text-white/80">Engaging user experiences</p>
                </div>
              </div>

              <!-- Card 3 -->
              <div
                ref="card3"
                class="absolute inset-0 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-2xl p-8 flex items-center justify-center text-white shadow-2xl z-30"
              >
                <div class="text-center">
                  <div class="text-7xl mb-6">❤️</div>
                  <h4 class="text-2xl font-bold mb-2">Emotional Impact</h4>
                  <p class="text-white/80">Building lasting connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Horizontal Scroll Section -->
    <section
      ref="horizontalSection"
      class="h-screen overflow-hidden bg-base-100 text-base-content relative"
    >
      <div class="h-full flex items-center overflow-x-hidden">
        <div ref="horizontalContent" class="relative h-full flex items-center pl-24 pr-24" style="width: 5200px;">
          <!-- Intro Text - Behind Images (Centered) -->
          <div
            ref="horizontalIntroText"
            class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 max-w-2xl text-center"
          >
            <p class="text-base-content/40 text-2xl md:text-3xl leading-relaxed serif">
              A visual journey through moments that shaped our narrative, capturing the essence of storytelling in its purest form.
            </p>
          </div>
          
          <!-- Images (Start off-screen right) -->
          <div
            v-for="(image, index) in horizontalImages"
            :key="index"
            :ref="(el) => (horizontalImageRefs[index] = el)"
            class="absolute z-10"
            :class="[image.offset]"
            :style="{ left: `${1200 + index * 520}px` }"
          >
            <img
              :src="image.src"
              :alt="`Gallery image ${index + 1}`"
              :class="[image.width, image.height]"
              class="object-cover rounded-none shadow-2xl"
            />
          </div>
          
          <!-- Outro Text - Behind Images -->
          <div
            ref="horizontalOutroText"
            class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 max-w-2xl text-center"
            style="left: calc(50% + 3400px);"
          >
            <p class="text-base-content/40 text-2xl md:text-3xl leading-relaxed serif">
              Each image tells a story, and together they weave a tapestry of human experience and creative expression.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Text Section -->
    <section class="relative">
      <div
        ref="stickyText"
        class="h-screen flex items-center justify-center text-center bg-neutral text-neutral-content"
      >
        <div class="container">
          <h2 ref="stickyTitle" class="w-full serif text-headline">
            The power of visual narrative lies in its ability to transcend
            language barriers.
          </h2>
        </div>
      </div>
      <div class="h-screen"></div>
    </section>

    <!-- Overlapping Cards Section -->
    <section class="bg-base-200 text-base-content section">
      <div class="container">
        <h2 class="text-center mb-16 serif text-headline">Key Insights</h2>
        <div
          ref="cardsContainer"
          class="relative flex flex-col gap-8 max-w-[600px] mx-auto"
        >
          <div
            ref="card"
            v-for="(card, index) in cards"
            :key="index"
            class="bg-base-100 text-base-content p-12 rounded-2xl shadow-lg relative"
            :data-index="index"
          >
            <div class="">
              <div
                class="absolute -top-2.5 right-8 bg-accent text-accent-content w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </div>
              <h3 class="mb-4 serif">{{ card.title }}</h3>
              <p class="mb-8 text-body">{{ card.description }}</p>
              <div class="flex gap-8 justify-center">
                <div class="stat">
                  <span class="block text-3xl font-bold text-accent">{{
                    card.stat1.number
                  }}</span>
                  <span
                    class="text-sm text-base-content/60 uppercase tracking-wider"
                    >{{ card.stat1.label }}</span
                  >
                </div>
                <div class="stat">
                  <span class="block text-3xl font-bold text-accent">{{
                    card.stat2.number
                  }}</span>
                  <span
                    class="text-sm text-base-content/60 uppercase tracking-wider"
                    >{{ card.stat2.label }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Text Reveal Section -->
    <section class="bg-base-300 text-base-content section">
      <div class="container">
        <div class="text-center">
          <p ref="revealText" class="leading-snug serif text-subhead">
            <span class="block overflow-hidden mb-2"
              >The future of digital storytelling</span
            >
            <span class="block overflow-hidden mb-2"
              >lies at the intersection of</span
            >
            <span class="block overflow-hidden mb-2"
              >technology, creativity, and</span
            >
            <span class="block overflow-hidden mb-2">human connection.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Final Parallax Section -->
    <section
      class="relative flex items-center justify-center text-center text-white overflow-hidden min-h-screen"
    >
      <div
        ref="parallaxBg2"
        class="absolute -top-[20%] left-0 right-0 -bottom-[20%] -z-10 bg-gradient-to-br from-[#4facfe] to-[#00f2fe]"
      ></div>
      <div class="relative z-[2]">
        <div class="container">
          <h2 ref="finalTitle" class="mb-8 serif text-display">
            The End is Just
            <span class="text-accent italic">The Beginning</span>
          </h2>
          <p ref="finalText" class="max-w-[600px] mx-auto opacity-90 text-body">
            Every story we tell opens the door to countless others, creating an
            infinite tapestry of human experience.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
