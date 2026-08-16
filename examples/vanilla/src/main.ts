import { createMobileDevTools } from 'mobile-devtools';

// Initialize Mobile DevTools in Vanilla JS
createMobileDevTools({
  theme: { mode: 'dark' },
});

let count = 0;
const countLabel = document.getElementById('count-label')!;
const btnLogs = document.getElementById('btn-logs')!;
const btnFetch = document.getElementById('btn-fetch')!;
const btnStorage = document.getElementById('btn-storage')!;

btnLogs.addEventListener('click', () => {
  count++;
  countLabel.textContent = String(count);
  console.log('Vanilla JS Button Clicked!', { count });
  console.warn('Vanilla Warning: Count updated manually');
  console.error('Vanilla Error Sample: DOM element updated');
});

btnFetch.addEventListener('click', async () => {
  try {
    console.log('Fetching Vanilla JS data...');
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await res.json();
    console.log('Vanilla Fetch Result:', data);
  } catch (err) {
    console.error('Vanilla Fetch Failed:', err);
  }
});

btnStorage.addEventListener('click', () => {
  localStorage.setItem('vanilla_user', JSON.stringify({ name: 'Vanilla Developer', count }));
  sessionStorage.setItem('vanilla_session', `session_${Date.now()}`);
  document.cookie = `vanilla_cookie=active_${count}; path=/;`;
  console.log('Storage updated from Vanilla JS app!');
});
