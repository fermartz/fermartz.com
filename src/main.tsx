import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AudioPlayerProvider } from './contexts/AudioContext.jsx'
import FermartzSite from './App.jsx'
import BlogIndex from './components/BlogIndex.jsx'
import BlogPost from './components/BlogPost.jsx'
import MusicPage from './components/MusicPage.jsx'
import MiniPlayer from './components/MiniPlayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AudioPlayerProvider>
        <Routes>
          <Route path="/" element={<FermartzSite />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="*" element={<FermartzSite />} />
        </Routes>
        <MiniPlayer />
      </AudioPlayerProvider>
    </BrowserRouter>
  </StrictMode>,
)
