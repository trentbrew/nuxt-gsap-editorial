<script setup lang="ts">
  import { ref, computed } from 'vue';

  const keyframes = ref([{ time: 0 }, { time: 50 }, { time: 100 }]);
  const scrubPosition = ref(0);
  const isScrubbing = ref(false);

  const ticks = computed(() => {
    const ticks = [];
    for (let i = 0; i <= 100; i += 10) {
      ticks.push(i);
    }
    return ticks;
  });

  function updateKeyframe(index: number, event: DragEvent) {
    const rect = (
      event.target as HTMLElement
    ).parentElement!.getBoundingClientRect();
    const newTime = ((event.clientX - rect.left) / rect.width) * 100;
    keyframes.value[index].time = Math.max(0, Math.min(100, newTime));
  }

  function startScrubbing(event: MouseEvent) {
    isScrubbing.value = true;
    updateScrubber(event);
    document.addEventListener('mousemove', updateScrubber);
    document.addEventListener('mouseup', stopScrubbing);
  }

  function updateScrubber(event: MouseEvent) {
    if (!isScrubbing.value) return;
    const rect = (
      event.target as HTMLElement
    ).parentElement!.getBoundingClientRect();
    scrubPosition.value = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100),
    );
  }

  function stopScrubbing() {
    isScrubbing.value = false;
    document.removeEventListener('mousemove', updateScrubber);
    document.removeEventListener('mouseup', stopScrubbing);
  }
</script>

<template>
  <div class="timeline">
    <div class="timeline-ruler">
      <div
        v-for="tick in ticks"
        :key="tick"
        class="tick"
        :style="{ left: `${tick}%` }"
      >
        <span>{{ tick / 10 }}</span>
      </div>
    </div>
    <div class="keyframes">
      <div
        v-for="(keyframe, index) in keyframes"
        :key="index"
        class="keyframe"
        :style="{ left: `${keyframe.time}%` }"
        draggable
        @dragend="updateKeyframe(index, $event)"
      >
        <div class="keyframe-handle"></div>
      </div>
    </div>
    <div
      class="scrubber"
      :style="{ left: `${scrubPosition}%` }"
      @mousedown="startScrubbing"
    ></div>
  </div>
</template>

<style scoped>
  .timeline {
    position: relative;
    height: 60px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  .timeline-ruler {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
  }

  .tick {
    position: absolute;
    top: 0;
    height: 20px;
    border-left: 1px solid #999;
    font-size: 10px;
    padding-left: 2px;
  }

  .keyframes {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 40px;
  }

  .keyframe {
    position: absolute;
    top: 10px;
    width: 20px;
    height: 20px;
    background: #007bff;
    border-radius: 50%;
    cursor: move;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .keyframe-handle {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }

  .scrubber {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background: #ff0000;
    cursor: ew-resize;
    z-index: 10;
  }
</style>
