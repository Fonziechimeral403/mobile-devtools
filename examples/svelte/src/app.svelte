<script lang="ts">
  import { mobileDevTools } from 'mobile-devtools/svelte';

  let count = $state(0);

  const triggerLogs = () => {
    console.log('Svelte Button Clicked!', { count: count + 1 });
    console.warn('Svelte Warning: State changing');
    console.error('Svelte Error Sample: Triggered error log');
    count++;
  };

  const triggerNetwork = async () => {
    try {
      console.log('Fetching Svelte data...');
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await res.json();
      console.log('Svelte Fetch Result:', data);
    } catch (err) {
      console.error('Svelte Fetch Failed:', err);
    }
  };

  const setStorage = () => {
    localStorage.setItem('svelte_user', JSON.stringify({ name: 'Svelte Developer', count }));
    sessionStorage.setItem('svelte_session', `session_${Date.now()}`);
    document.cookie = `svelte_cookie=active_${count}; path=/;`;
    console.log('Storage updated from Svelte app!');
  };
</script>

<div class="card" use:mobileDevTools={{ theme: { mode: 'dark' }, shakeToToggle: true }}>
  <h2>🔥 Mobile DevTools - Svelte Example</h2>
  <p>
    Count: <strong>{count}</strong>
  </p>
  <div>
    <button onclick={triggerLogs}>Trigger Logs</button>
    <button onclick={triggerNetwork}>Trigger Network Fetch</button>
    <button onclick={setStorage}>Set Storage</button>
  </div>
</div>
