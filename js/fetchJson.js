import { URLJSON } from "./url.js";

export default class FEETCHJSON {
  async getJson() {
    try {
      const res = await fetch(URLJSON);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
