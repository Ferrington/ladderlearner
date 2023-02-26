import { DragLandingPad } from "../components/WorkArea/DragLandingPad";
//import { Tag } from "./Tag";

export class Instruction {
  constructor(
    private name: string,
    private tag: string,
  ) {}

  render(i: number) {
    return (
      <div key={i} className="rung-instruction">
        <DragLandingPad />
        <img className="rung-img" src={`/static/imgs/${this.name}.png`} alt=''/>
        <h5>{this.tag}</h5>
      </div>
    );
  }

  toObject() {
    return {
      type: "Instruction",
      name: this.name,
      tag: this.tag
    }
  }
}