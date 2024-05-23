// formkit.config.ts
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { genesisIcons } from '@formkit/icons'
import { en, pt } from '@formkit/i18n'

export default defaultConfig({
  locale: 'en',
  locales: {
    pt, en
  },
  config: {
    rootClasses,
  },
  icons: {
    ...genesisIcons
  }
})