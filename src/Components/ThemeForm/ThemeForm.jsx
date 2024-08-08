import { useState } from "react";
import ThemeOption from "../ThemeOption/ThemeOption";

export default function ThemeForm({
  handleChangeTheme,
  themes,
  handleDeleteTheme,
  currentTheme,
  handleEditName,
  handleAddNewTheme,
}) {
  const [formMode, setFormMode] = useState("default");
  const allThemes = themes;
  const [valueName, setValueName] = useState("add name");

  function onChangeTheme(themeId) {
    const newTheme = allThemes.find((theme) => theme.id === themeId);
    handleChangeTheme(newTheme);
  }

  function onDeleteTheme(event) {
    event.preventDefault();
    handleDeleteTheme();
  }

  function onEditName(event) {
    event.preventDefault();
    handleEditName(valueName);

    setFormMode("default");
  }

  function onChangeName(name) {
    console.log(name);
    setValueName(name);
  }

  function onAddNewTheme(event) {
    event.preventDefault();
    handleAddNewTheme(valueName);

    setFormMode("default");
  }

  return (
    <form>
      {formMode === "default" ? (
        <select
          name="select"
          onChange={(event) => {
            onChangeTheme(event.target.value);
          }}
          value={currentTheme.name}
        >
          {themes.map((theme) => {
            return <ThemeOption themeName={theme.name} key={theme.name} />;
          })}
          {/* <ThemeOption themeName="Default Theme" />
          <ThemeOption themeName="My Theme 1" />
          <ThemeOption themeName="My Theme 2" /> */}
        </select>
      ) : null}
      {formMode !== "default" ? (
        <input
          type="text"
          placeholder="theme name"
          name="newName"
          value={valueName}
          onChange={(event) => onChangeName(event.target.value)}
        />
      ) : null}
      {formMode === "edit" ? (
        <button
          onClick={(event) => {
            onEditName(event);
          }}
        >
          EDIT
        </button>
      ) : null}
      {formMode === "add" ? (
        <button onClick={(event) => onAddNewTheme(event)}>ADD</button>
      ) : null}
      {formMode !== "default" ? null : (
        <>
          <button onClick={() => setFormMode("add")}>ADD</button>
          <button
            disabled={currentTheme.name === "Default Theme" ? true : false}
            onClick={() => {
              setFormMode("edit");
            }}
          >
            EDIT
          </button>
          <button
            onClick={(event) => onDeleteTheme(event)}
            disabled={currentTheme.name === "Default Theme" ? true : false}
          >
            DELETE
          </button>
        </>
      )}
    </form>
  );
}
