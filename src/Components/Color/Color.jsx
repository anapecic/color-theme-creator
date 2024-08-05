import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({
  color,
  onDeleteColor,
  onToggleEdit,
  edit,
  onUpdateCard,
  role,
  valueContrast,
  valueHex,
  onContrastInput,
  onHexInput,
  onRoleInput,
}) {
  const [clickDelete, setClickDelete] = useState(false);

  function handleToggleDelete() {
    setClickDelete(!clickDelete);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {!clickDelete && !edit ? (
        <>
          <button onClick={handleToggleDelete}>DELETE</button>
          <button onClick={onToggleEdit}>EDIT</button>
        </>
      ) : null}

      {!edit ? null : (
        <>
          <ColorForm
            onUpdateCard={onUpdateCard}
            role={role}
            valueHex={valueHex}
            valueContrast={valueContrast}
            onContrastInput={onContrastInput}
            onHexInput={onHexInput}
            onRoleInput={onRoleInput}
          />
          <button onClick={onToggleEdit}>CANCEL</button>
        </>
      )}

      {!clickDelete ? null : (
        <>
          <p className="color-card-highlight">Really delete?</p>
          <button onClick={handleToggleDelete}>CANCEL</button>
          <button onClick={() => onDeleteColor(color.id)}>DELETE</button>
        </>
      )}
    </div>
  );
}
