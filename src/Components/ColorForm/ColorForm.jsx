import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
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
