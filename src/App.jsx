import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [role, setRole] = useState("add role");
  const [valueHex, setValueHex] = useState("#9FA8DA");
  const [valueContrast, setValueContrast] = useState("#000000");
  const [colors, setColors] = useState(initialColors);

  function handleAddColor() {
    setColors([
      { id: uid(), role: role, hex: valueHex, contrastText: valueContrast },
      ...colors,
    ]);
    setRole("");
    setValueHex("#ffffff");
    setValueContrast("#000000");
  }

  function handleHexInput(colorValue) {
    setValueHex(colorValue);
  }

  function handleContrastInput(colorValue) {
    setValueContrast(colorValue);
  }

  function handleRoleInput(textValue) {
    setRole(textValue);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm
        onAddColor={handleAddColor}
        role={role}
        valueHex={valueHex}
        valueContrast={valueContrast}
        onContrastInput={handleContrastInput}
        onHexInput={handleHexInput}
        onRoleInput={handleRoleInput}
      />

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

function ColorForm({
  onAddColor,
  role,
  valueHex,
  valueContrast,
  onContrastInput,
  onHexInput,
  onRoleInput,
}) {
  return (
    <form
      className="formWrapper"
      onSubmit={(event) => {
        event.preventDefault();
        onAddColor(role, valueContrast, valueHex);
        event.target.elements.role.focus();
      }}
    >
      <label htmlFor="roleInput">Role</label>
      <input
        type="text"
        id="roleInput"
        name="role"
        value={role}
        onChange={(event) => {
          onRoleInput(event.target.value);
        }}
        required
      ></input>

      <ColorInput
        forLabel="hexInput"
        value={valueHex}
        onColorInput={onHexInput}
      >
        Hex
      </ColorInput>
      <ColorInput
        forLabel="contrastText"
        value={valueContrast}
        onColorInput={onContrastInput}
      >
        Contrast Text
      </ColorInput>

      <button type="submit">ADD COLOR</button>
    </form>
  );
}

function ColorInput({ forLabel, children, value, onColorInput }) {
  return (
    <>
      <label htmlFor={forLabel}>{children}</label>
      <div>
        <input
          type="text"
          id={forLabel}
          value={value}
          onChange={(event) => onColorInput(event.target.value)}
        ></input>
        <input
          type="color"
          value={value}
          onChange={(event) => {
            onColorInput(event.target.value);
          }}
        ></input>
      </div>
    </>
  );
}

export default App;
