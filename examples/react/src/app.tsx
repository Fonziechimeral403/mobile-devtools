import { useState } from 'react';
import { MobileDevTools } from 'mobile-devtools/react';

export default function App() {
  const [count, setCount] = useState(0);

  const triggerLogs = () => {
    console.log('React Button Clicked!', { count: count + 1 });
    console.warn('Warning: Count is increasing fast!');
    console.error('Error sample: React state updated.');
    setCount((c) => c + 1);
  };

  const triggerNetwork = async () => {
    try {
      console.log('Fetching data...');
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await res.json();
      console.log('Fetch Result:', data);
    } catch (err) {
      console.error('Fetch Failed:', err);
    }
  };

  const setStorage = () => {
    localStorage.setItem('react_user', JSON.stringify({ name: 'React Developer', count }));
    sessionStorage.setItem('react_session', `session_${Date.now()}`);
    document.cookie = `react_cookie=active_${count}; path=/;`;
    console.log('Storage updated from React app!');
  };

  return (
    <div className="card">
      <h2>⚛️ Mobile DevTools - React Example</h2>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <div>
        <button onClick={triggerLogs}>Trigger Logs</button>
        <button onClick={triggerNetwork}>Trigger Network Fetch</button>
        <button onClick={setStorage}>Set Storage</button>
      </div>

      {/* Mobile DevTools Component */}
      <MobileDevTools config={{ theme: { mode: 'dark' } }} />
    </div>
  );
}
