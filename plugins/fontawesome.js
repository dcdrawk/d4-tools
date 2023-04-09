import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library, config } from '@fortawesome/fontawesome-svg-core'

import {
  faBars,
  faCaretRight,
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
  faCaretRight,
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
  // console.log('define plugin!!!', nuxtApp)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon, {})
})
