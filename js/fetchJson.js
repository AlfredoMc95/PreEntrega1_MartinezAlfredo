import { URL } from "./url.js";

export default class FEETCHJSON {
  async getJson() {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
