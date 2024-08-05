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
  // question: can i call both functions here in the on submit or do i need a callback function?
  // why do the inputs of the edit mode not work? they are not taking the values in

  function handleSubmit(event) {
    event.preventDefault();
    callback(role, valueContrast, valueHex);
    event.target.elements.role.focus();
    console.log(event);
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
