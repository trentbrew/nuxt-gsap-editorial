<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import type { CSSProperties } from 'vue';
  import { gsap } from 'gsap';

  const previewContainer = ref<HTMLElement>();
  const animatedElement = ref<HTMLElement>();
  const tween = ref<gsap.core.Tween | null>(null);

  const elementStyle = ref<CSSProperties>({
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: '#007bff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  });

  const props = defineProps<{
    duration?: number;
    easing?: string;
    delay?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotation?: number;
    opacity?: number;
  }>();

  watch(
    props,
    (newProps) => {
      updateAnimation(newProps);
    },
    { deep: true },
  );

  function updateAnimation(props: any) {
    if (!animatedElement.value) return;

    if (tween.value) {
      tween.value.kill();
    }

    const vars: any = {
      duration: props.duration || 1,
      ease: props.easing || 'power2.out',
      delay: props.delay || 0,
    };

    if (props.x !== undefined) vars.x = props.x;
    if (props.y !== undefined) vars.y = props.y;
    if (props.scale !== undefined) vars.scale = props.scale;
    if (props.rotation !== undefined) vars.rotation = props.rotation;
    if (props.opacity !== undefined) vars.opacity = props.opacity;

    tween.value = gsap.to(animatedElement.value, vars);
  }

  function playAnimation() {
    tween.value?.play();
  }

  function pauseAnimation() {
    tween.value?.pause();
  }

  function resetAnimation() {
    tween.value?.progress(0).pause();
  }

  onMounted(() => {
    updateAnimation(props);
  });
</script>

<template>
  <div class="preview-area">
    <h3>Preview</h3>
    <div ref="previewContainer" class="preview-container">
      <div ref="animatedElement" class="animated-element" :style="elementStyle">
        Animated Box
      </div>
    </div>
    <div class="controls">
      <button @click="playAnimation">Play</button>
      <button @click="pauseAnimation">Pause</button>
      <button @click="resetAnimation">Reset</button>
    </div>
  </div>
</template>

<style scoped>
  .preview-area {
    padding: 16px;
    border: 1px solid #ccc;
    background: #f9f9f9;
    border-radius: 4px;
  }

  .preview-container {
    position: relative;
    width: 100%;
    height: 200px;
    background: #fff;
    border: 1px solid #ddd;
    overflow: hidden;
  }

  .animated-element {
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .controls {
    margin-top: 12px;
    display: flex;
    gap: 8px;
  }

  .controls button {
    padding: 8px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .controls button:hover {
    background: #0056b3;
  }
</style>
