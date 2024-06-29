import { reactive } from "vue";
const privacy = reactive({
  active: false,
  toggle() {
    this.active = !this.active;
  },
  setActive(value) {
    this.active = value;
  }
});
export {
  privacy as p
};
