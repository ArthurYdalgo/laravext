import { reactive } from 'vue'

export const privacy = reactive({
  active: false,
  toggle() {
    this.active = !this.active
  },
  setActive(value) {
    this.active = value
  }
})