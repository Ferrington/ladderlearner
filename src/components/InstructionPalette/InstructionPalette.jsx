import "./InstructionPalette.css";
import Primitive from "./Primitive";

export default function InstructionPalette() {
  return (
    <div className="instruction-palette">
      <Primitive type="XIC" text="Normally Open" />
      <Primitive type="XIO" text="Normally Closed" />
      <Primitive type="OTE" text="Energize Coil" />
      <Primitive type="Branch" text="Create Branch" />
    </div>
  );
}
