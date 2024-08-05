import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onSubmitEdit }) {
  const [clickDelete, setClickDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editContrast, setEditContrast] = useState("#ffffff");
  const [editRole, setEditRole] = useState("add new role");
  const [editHex, setEditHex] = useState("#000000");

  const updatedColorObject = {
    role: editRole,
    hex: editHex,
    contrastText: editContrast,
    id: color.id,
  };

  function handleToggleEdit() {
    setEdit(!edit);
  }

  function handleToggleDelete() {
    setClickDelete(!clickDelete);
  }

  function handleEditContrast(editedContrast) {
    setEditContrast(editedContrast);
  }

  function handleEditRole(editedRole) {
    setEditRole(editedRole);
  }

  function handleEditHex(editedHex) {
    setEditHex(editedHex);
  }

  function callback() {
    onSubmitEdit(updatedColorObject);
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
          <button onClick={handleToggleEdit}>EDIT</button>
        </>
      ) : null}

      {!edit ? null : (
        <>
          <ColorForm
            role={editRole}
            valueHex={editHex}
            valueContrast={editContrast}
            onContrastInput={handleEditContrast}
            onHexInput={handleEditHex}
            onRoleInput={handleEditRole}
            callback={callback}
            buttonChild={"UPDATE COLOR"}
          />
          <button onClick={handleToggleEdit}>CANCEL</button>
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
