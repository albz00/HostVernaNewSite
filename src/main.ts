import './app.css'
import { applySeason } from './lib/season'
import { initTheme } from './lib/theme'
applySeason()
initTheme()
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

export default app
