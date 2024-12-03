import Home from './pages/Dashboard';
import UsersPage from './pages/Users';
import RolesPage from './pages/Roles';
import PermissionsPage from './pages/Permission';
// import NotFoundPage from './pages/NotFound';

const App: React.FC = () => {
  return (
@@ -15,7 +16,8 @@ const App: React.FC = () => {
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer />
    </Router>