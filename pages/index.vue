<template>
  <div class="home-page">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title serif text-display">
          GSAP Scrollytelling
          <span class="accent">Examples</span>
        </h1>
        <p class="hero-description text-body">
          Explore advanced GSAP animations and scroll-triggered effects
        </p>
        
        <div class="examples-grid">
          <NuxtLink to="/scrollytelling" class="example-card">
            <div class="card-content">
              <h2 class="card-title serif">Editorial Scrollytelling</h2>
              <p class="card-description">
                Full-featured scroll experience with parallax, horizontal scrolling, 
                sticky elements, and editorial-style animations
              </p>
              <div class="card-features">
                <span class="feature-tag">Parallax</span>
                <span class="feature-tag">Horizontal Scroll</span>
                <span class="feature-tag">Sticky Elements</span>
                <span class="feature-tag">Text Reveals</span>
              </div>
              <div class="card-arrow">→</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (process.client) {
    $gsap.from('.hero-title', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    
    $gsap.from('.hero-description', {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    })
    
    $gsap.from('.example-card', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.6,
      ease: "power3.out"
    })
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  margin-bottom: 1.5rem;
}

.accent {
  color: var(--color-accent);
  font-style: italic;
}

.hero-description {
  margin-bottom: 4rem;
  opacity: 0.9;
}

.examples-grid {
  display: grid;
  gap: 2rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.example-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-description {
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.feature-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-arrow {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.example-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
  }
  
  .example-card {
    padding: 2rem;
  }
  
  .card-features {
    justify-content: center;
  }
}
</style>
