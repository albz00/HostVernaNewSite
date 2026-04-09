import './app.css'
import { initTheme } from './lib/theme'
initTheme()
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

export default app
