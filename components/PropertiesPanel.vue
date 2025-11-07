<script setup lang="ts">
  import { ref, watch } from 'vue';

  const duration = ref(1);
  const easing = ref('power2.out');
  const delay = ref(0);
  const x = ref(0);
  const y = ref(0);
  const scale = ref(1);
  const rotation = ref(0);
  const opacity = ref(1);

  // Emit changes to parent
  const emit = defineEmits(['update']);

  watch([duration, easing, delay, x, y, scale, rotation, opacity], () => {
    emit('update', {
      duration: duration.value,
      easing: easing.value,
      delay: delay.value,
      x: x.value,
      y: y.value,
      scale: scale.value,
      rotation: rotation.value,
      opacity: opacity.value,
    });
  });
</script>

<template>
  <div class="properties-panel">
    <h3>Properties</h3>
    <div class="property-group">
      <label>Duration (s):</label>
      <input v-model.number="duration" type="number" step="0.1" min="0" />
    </div>
    <div class="property-group">
      <label>Easing:</label>
      <select v-model="easing">
        <option value="none">None</option>
        <option value="power1.in">Power1 In</option>
        <option value="power1.out">Power1 Out</option>
        <option value="power2.in">Power2 In</option>
        <option value="power2.out">Power2 Out</option>
        <option value="bounce.out">Bounce Out</option>
      </select>
    </div>
    <div class="property-group">
      <label>Delay (s):</label>
      <input v-model.number="delay" type="number" step="0.1" min="0" />
    </div>
    <div class="property-group">
      <label>X Position:</label>
      <input v-model.number="x" type="number" />
    </div>
    <div class="property-group">
      <label>Y Position:</label>
      <input v-model.number="y" type="number" />
    </div>
    <div class="property-group">
      <label>Scale:</label>
      <input v-model.number="scale" type="number" step="0.1" />
    </div>
    <div class="property-group">
      <label>Rotation (deg):</label>
      <input v-model.number="rotation" type="number" />
    </div>
    <div class="property-group">
      <label>Opacity:</label>
      <input
        v-model.number="opacity"
        type="number"
        step="0.1"
        min="0"
        max="1"
      />
    </div>
  </div>
</template>

<style scoped>
  .properties-panel {
    padding: 16px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
  }

  .property-group {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }

  .property-group label {
    width: 120px;
    font-weight: bold;
  }

  .property-group input,
  .property-group select {
    flex: 1;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
