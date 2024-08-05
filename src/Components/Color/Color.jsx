import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor }) {
  const [clickDelete, setClickDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [submitEdit, setSubmitEdit] = useState(false);
  const [editContrast, setEditContrast] = useState("#ffffff");
  const [editRole, setEditRole] = useState("add new role");
  const [editHex, setEditHex] = useState("#000000");

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

  function handleSubmitEdit() {
    setSubmitEdit(!submitEdit);
  }

  return (
    <div
      className="color-card"
      style={{
        background: submitEdit ? editHex : color.hex,
        color: submitEdit ? editContrast : color.contrastText,
      }}
    >
      <h3 className="color-card-headline">
        {submitEdit ? editHex : color.hex}
      </h3>
      <h4>{submitEdit ? editRole : color.role}</h4>
      <p>contrast: {submitEdit ? editContrast : color.contrastText}</p>

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
            callback={handleSubmitEdit}
            buttonChild={!submitEdit ? "UPDATE COLOR" : "GO BACK"}
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
