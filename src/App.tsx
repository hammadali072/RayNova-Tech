import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAdmin } from './components/admin/RequireAdmin';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ServiceOrderPage } from './pages/ServiceOrderPage';
import { UsersPage } from './pages/admin/UsersPage';
import { AddBlogPage } from './pages/admin/AddBlogPage';
import { AddServicePage } from './pages/admin/AddServicePage';
import { AddTeamPage } from './pages/admin/AddTeamPage';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminServiceOrders } from './pages/admin/AdminServiceOrders';
import ScrollToTop from './components/scrollToTop';
import CookiePolicyPage from './pages/CookiePolicyPage';
import LegalNoticePage from './pages/LegalNoticePage';

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/legal-notice" element={<LegalNoticePage />} />
          <Route path="/order" element={<ServiceOrderPage />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin/users" element={<RequireAdmin><UsersPage /></RequireAdmin>} />
          <Route path="/admin/add-blog" element={<RequireAdmin><AddBlogPage /></RequireAdmin>} />
          <Route path="/admin/add-service" element={<RequireAdmin><AddServicePage /></RequireAdmin>} />
          <Route path="/admin/add-team" element={<RequireAdmin><AddTeamPage /></RequireAdmin>} />
          <Route path="/admin/messages" element={<RequireAdmin><AdminMessages /></RequireAdmin>} />
          <Route path="/admin/service-orders" element={<RequireAdmin><AdminServiceOrders /></RequireAdmin>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}