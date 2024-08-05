import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onAddColor,
  role,
  valueHex,
  valueContrast,
  onContrastInput,
  onHexInput,
  onRoleInput,
  onUpdateCard,
}) {
  // question: can i call both functions here in the on submit or do i need a callback function?
  // why do the inputs of the edit mode not work? they are not taking the values in

  return (
    <form
      className="formWrapper"
      onSubmit={(event) => {
        event.preventDefault();
        onAddColor(role, valueContrast, valueHex);
        onUpdateCard(role, valueContrast, valueHex);
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
