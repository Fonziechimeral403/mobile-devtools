<template>
  <div class="card">
    <h2>💚 Mobile DevTools - Vue 3 Example</h2>
    <p>
      Count: <strong>{{ count }}</strong>
    </p>
    <div>
      <button @click="triggerLogs">Trigger Logs</button>
      <button @click="triggerNetwork">Trigger Network Fetch</button>
      <button @click="setStorage">Set Storage</button>
    </div>

    <!-- Mobile DevTools Vue Component -->
    <MobileDevTools :config="{ theme: { mode: 'dark' } }" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MobileDevTools } from 'mobile-devtools/vue';

const count = ref(0);

const triggerLogs = () => {
  console.log('Vue Button Clicked!', { count: count.value + 1 });
  console.warn('Vue Warning: Reactive state changing');
  console.error('Vue Error Sample: Unexpected mutation');
  count.value++;
};

const triggerNetwork = async () => {
  try {
    console.log('Fetching Vue data...');
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await res.json();
    console.log('Vue Fetch Result:', data);
  } catch (err) {
    console.error('Vue Fetch Failed:', err);
  }
};

const setStorage = () => {
  localStorage.setItem('vue_user', JSON.stringify({ name: 'Vue Developer', count: count.value }));
  sessionStorage.setItem('vue_session', `session_${Date.now()}`);
  document.cookie = `vue_cookie=active_${count.value}; path=/;`;
  console.log('Storage updated from Vue app!');
};
</script>
