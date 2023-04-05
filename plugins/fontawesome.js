import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome/index.es'

import { library, config } from '@fortawesome/fontawesome-svg-core'

import {
  faBars,
  faExternalLinkAlt,
  faTimes,
  faFire,
  faFistRaised,
  faSnowflake,
  faBolt,
  faSkullCrossbones,
  faEye
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
  faBars,
  faExternalLinkAlt,
  faTimes,
  faFire,
  faFistRaised,
  faSnowflake,
  faBolt,
  faSkullCrossbones,
  faEye
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon, {})
})
