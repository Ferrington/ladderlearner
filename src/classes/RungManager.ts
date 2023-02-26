import { Branch } from "./Branch";
import { Instruction } from "./Instruction";

export class RungManager {
  private tree: any;

  constructor(rungData: string)
  {
    this._parseRung(rungData);
  }

  renderRung() {
    return this.tree.render();
  }

  stringifyRung() {
    return JSON.stringify(this.tree.toObject());
  }

  _parseRung(rungData: string) {
    const data = JSON.parse(rungData);
    this.tree = this._recursivelyGenerateRung(data);
  }

  _recursivelyGenerateRung(data: any) {
    if (data.type === "Instruction")
      return new Instruction (
        data.name,
        data.tag
      );
    else if (data.type === "AND")
      return new Branch (
        "AND", 
        data.contents.map((ele: any) => this._recursivelyGenerateRung(ele))
      );
    else if (data.type === "OR")
      return new Branch (
        "OR",
        data.contents.map((ele: any) => this._recursivelyGenerateRung(ele))
      );
  }
}