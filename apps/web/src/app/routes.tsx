import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/views/home/ui/home-page';
import { PrivacyPage } from '@/views/privacy/ui/privacy-page';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
