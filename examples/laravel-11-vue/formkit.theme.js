// formkit.config.ts
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { genesisIcons } from '@formkit/icons'
import { en, pt } from '@formkit/i18n'
import { createProPlugin, inputs } from '@formkit/pro'

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_KEY, inputs) 

export default defaultConfig({
  locale: 'en',
  locales: {
    pt, en
  },
  plugins: [
    pro
  ],
  config: {
    rootClasses,
  },
  icons: {
    ...genesisIcons
  }
})