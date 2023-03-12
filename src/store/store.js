import { proxy } from "valtio";
import { testRungs } from "./testRungs";
// import { defaultRung } from "./defaultRung";

export const store = proxy({
  rungs: testRungs,
  weDraggin: false,
});
