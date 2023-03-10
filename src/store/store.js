import { proxy } from "valtio";
import { testRungs } from "./testRungs";

export const store = proxy({
  rungs: testRungs,
});
