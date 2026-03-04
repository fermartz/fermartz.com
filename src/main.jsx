import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FermartzSite from './App.jsx'
import BlogIndex from './components/BlogIndex.jsx'
import BlogPost from './components/BlogPost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FermartzSite />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<FermartzSite />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
