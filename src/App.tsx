import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components';
import { About, 
  Contact, 
  CreatePost, 
  Donate, 
  ErrorPage, 
  ForgotPassword,
  Home, 
  Login, 
  PostById, 
  Posts, 
  Project, 
  ResetPassword, 
  Shop, 
  SignUp, 
  UserProfile, 
  UserProfileSettings } from './pages';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <Router> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route  path="about" element={<About />} />
            <Route  path="donate" element={<Donate />} />
            <Route  path="contact" element={<Contact />} />
            <Route  path="project" element={<Project title={''} content={''} image={''} />} />
            <Route  path="profile" element={<UserProfile />} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<SignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='shop' element={<Shop />} />

            <Route path="user">
            <Route path=":userId">
          <Route path="" index element={<UserProfile />} />
          <Route path="settings" element={<UserProfileSettings />} />
          <Route path='posts' element={<Posts/>}/>
          
          {/* Nested routes starting from /posts/:postId */}
          <Route path="posts">
            <Route path=":postId" element={<PostById posts={[]} />} />
          </Route>
          
          <Route path="create-post" element={<CreatePost />} />
        </Route>

            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  );
}

export default App;