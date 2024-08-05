export default function ColorInput({
  forLabel,
  children,
  value,
  onColorInput,
}) {
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
