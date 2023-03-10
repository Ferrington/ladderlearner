import { proxy } from "valtio";
import { testRungs } from "./testRungs";

export const state = proxy({
  rungs: testRungs,
});
