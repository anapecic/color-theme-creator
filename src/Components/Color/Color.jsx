import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";

export default function Color({ color, onDeleteColor, onSubmitEdit }) {
  const [clickDelete, setClickDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editContrast, setEditContrast] = useState(color.contrastText);
  const [editRole, setEditRole] = useState(color.role);
  const [editHex, setEditHex] = useState(color.hex);

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
    handleToggleEdit();
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <div className="flex-wrapper-copy">
        <h3 className="color-card-headline">{color.hex}</h3>
        <CopyToClipboard copyValue={color.hex} />
      </div>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastChecker
        checkHex={color.hex}
        checkContrast={color.contrastText}
      />
      <br />

      {!clickDelete && !edit ? (
        <>
          <button onClick={handleToggleDelete}>delete</button>
          <button onClick={handleToggleEdit}>edit</button>
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
            buttonChild={"update color"}
          />
          <button onClick={handleToggleEdit}>cancel</button>
        </>
      )}

      {!clickDelete ? null : (
        <>
          <p className="color-card-highlight">Really delete?</p>
          <button onClick={handleToggleDelete}>cancel</button>
          <button
            onClick={() => {
              onDeleteColor(color.id);
            }}
          >
            delete
          </button>
        </>
      )}
    </div>
  );
}
