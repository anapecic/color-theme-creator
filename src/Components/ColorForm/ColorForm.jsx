import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  callback,
  role,
  valueHex,
  valueContrast,
  onContrastInput,
  onHexInput,
  onRoleInput,
  buttonChild,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    callback(role, valueContrast, valueHex);
    event.target.elements.role.focus();
  }

  return (
    <form className="formWrapper" onSubmit={(event) => handleSubmit(event)}>
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

      <button type="submit">{buttonChild}</button>
    </form>
  );
}
