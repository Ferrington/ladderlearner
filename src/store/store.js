import { proxy, subscribe } from "valtio";
import { testRungs } from "./testRungs";
// import { defaultRung } from "./defaultRung";

const localStorageString = localStorage.getItem("store");
const initialState = localStorageString
  ? JSON.parse(localStorageString)
  : { rungs: testRungs, weDraggin: false };

export const store = proxy(initialState);

subscribe(store, () => {
  localStorage.setItem("store", JSON.stringify(store));
});
