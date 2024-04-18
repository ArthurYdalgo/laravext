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


// import { reactive } from 'vue'

// export function usePrivacy(initialState = {active: false}) {
//   return reactive({
//     ...initialState,
//     toggle() {
//       this.active = !this.active
//     },
//     setActive(value) {
//       this.active = value
//     }
//   })
// }