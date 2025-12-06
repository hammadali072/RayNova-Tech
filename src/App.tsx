import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

export default function App() {

  return (
    <AuthProvider>
      <Router>
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
          <Route path="/order" element={<ServiceOrderPage />} />

          {/* Admin Routes */}
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/add-blog" element={<AddBlogPage />} />
          <Route path="/admin/add-service" element={<AddServicePage />} />
          <Route path="/admin/add-team" element={<AddTeamPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}