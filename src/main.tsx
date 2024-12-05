import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
// import {
//   TonConnectUIProvider,
// } from "@tonconnect/ui-react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    {/* <TonConnectUIProvider manifestUrl="https://flappy-wandal.vercel.app/tonconnect-manifest.json"> */}
    <App />
    {/* </TonConnectUIProvider> */}
  </StrictMode>,
)
