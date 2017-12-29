import 'normalize.css'
import '../styles/base.scss'
import '../styles/style.scss'
import 'swiper/dist/css/swiper.min.css'
import '../styles/icon.scss'
import Fastclick from 'fastclick'
import '../components/list/index'
import autosize from 'autosize'

import './limit'
import './input'
import './update-file'
import './imgLoad'

document.addEventListener(
  'DOMContentLoaded',
  function() {
    if (!!Fastclick) {
      Fastclick.attach(document.body)
    }

    var textarea = document.querySelector('textarea')
    if (textarea && autosize) {
      autosize(textarea)
    }
  },
  false
)
