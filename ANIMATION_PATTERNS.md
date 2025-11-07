# GSAP Animation Patterns

## Standard `.from()` Approach

We use the standard GSAP `.from()` method for all scroll-triggered animations. This follows the [GSAP cheatsheet](https://gsap.com/cheatsheet/) conventions and provides the best developer experience.

---

## Basic Pattern

### Animate elements on scroll

```js
$gsap.from(element, {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  }
})
```

**Why `.from()`?**
- ✅ Self-documenting - see the entire animation in one place
- ✅ Natural reading - "animate FROM y: 60 TO current state"
- ✅ Standard GSAP pattern - follows official documentation
- ✅ Flexible - easy to customize per element

---

## Common Patterns

### Timeline with Sequential Animations

```js
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
    heroSubtitle.value,
    { y: 60, opacity: 0, duration: 1, ease: 'power2.out' },
    '-=0.6',  // Start 0.6s before previous animation ends
  );
```

### Animate Multiple Elements with Stagger

```js
$gsap.from([title, subtitle, button], {
  y: 150,
  opacity: 0,
  duration: 1.5,
  ease: 'power3.out',
  stagger: 0.3,  // 0.3s delay between each
  scrollTrigger: {
    trigger: section,
    start: 'top 80%',
  },
});
```

### Loop Through Multiple Elements

```js
const elements = document.querySelectorAll('.card');
elements.forEach((element, index) => {
  $gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: index * 0.2,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
    },
  });
});
```

---

## Parallax & Scrub Effects

### Parallax Background

```js
$gsap.to(backgroundElement, {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,  // Smooth scrubbing
  },
});
```

### Horizontal Scroll

```js
$gsap.to(contentElement, {
  xPercent: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    pin: true,      // Pin the section
    scrub: 1,
    end: () => '+=' + (contentElement.scrollWidth - window.innerWidth),
  },
});
```

### Sticky with Scale

```js
$gsap
  .timeline({
    scrollTrigger: {
      trigger: element,
      pin: true,
      start: 'top center',
      end: '+=500',
      scrub: 1,
    },
  })
  .to(element, {
    scale: 1.2,
    y: -50,
    ease: 'power2.inOut',
  });
```

---

## Current Usage in `index.vue`

### Entry Animations (Scroll-triggered)
- **Hero section** - Timeline with staggered `.from()` for title, accent, subtitle, meta
- **Intro text** - Sequential fade up for h2 and p
- **Cards** - Individual `.from()` with stagger
- **Text reveal** - Line-by-line `.from()` with delay
- **Final section** - Staggered `.from()` for title and text

### Parallax Effects
- **Hero background** - yPercent scroll
- **Parallax bg sections** - yPercent scroll
- **Horizontal scroll** - xPercent with pin
- **Sticky text** - Scale with pin

### Card Interactions
- **Entry animation** - `.from()` for initial reveal
- **Scroll effect** - `.to()` with scrub for stacking

All animations use ScrollTrigger with appropriate start positions and toggleActions for proper reset behavior.
