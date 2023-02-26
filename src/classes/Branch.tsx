import { Instruction } from "./Instruction";
import { DragLandingPad } from "../components/WorkArea/DragLandingPad";

export class Branch {
  constructor(
    private type: string,
    private contents: (Branch|Instruction)[]
  ) {}

  getType() {
    return this.type;
  }

  getContents() {
    return this.contents;
  }

  setContents(newContents: (Branch|Instruction)[]) {
    this.contents = newContents;
  }

  _addOrWrapper(stuff: any, i: number) {
    return (
      <div key={i} className="rung-or">
        <DragLandingPad />
        {stuff}
      </div>
    );
  }

  _addBranchWrapper(stuff: any, i: number) {
    return (
      <div key={i} className="rung-branch">
        {i > 0 && <div className="rung-line"></div>}
        <div className="rung-instruction-wrapper">
          {stuff}
          <DragLandingPad />
        </div>
      </div>
    );
  }

  render(j:number) {
    const components = this.contents.map((ele: any, i) => 
      this.type === "OR" ? this._addBranchWrapper(ele.render(i), i) : ele.render(i)
    );

    if (this.type === "OR")
      return this._addOrWrapper(components, j);
    return components;
  }

  toObject(): any {
    return {
      type: this.type,
      contents: this.contents.map(ele => ele.toObject())
    };
  }
}