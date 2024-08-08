import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ColorForm from "./Components/ColorForm/ColorForm";

const initialThemes = [
  {
    id: "Default Theme",
    name: "Default Theme",
    colors: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
  },
  { id: "My Theme 1", name: "My Theme 1", colors: [] },
  { id: "My Theme 2", name: "My Theme 2", colors: [] },
];

function App() {
  const [role, setRole] = useState("add role");
  const [valueHex, setValueHex] = useState("#ffffff");
  const [valueContrast, setValueContrast] = useState("#000000");
  const [colors, setColors] = useLocalStorageState("allColors", {
    defaultValue: initialColors,
  });
  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
    defaultValue: {
      id: "Default Theme",
      name: "Default Theme",
      colors: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
    },
  });
  const [currentColors, setCurrentColors] = useLocalStorageState(
    "currentColors",
    { defaultValue: [...initialColors] }
  );
  const [themes, setThemes] = useLocalStorageState("allThemes", {
    defaultValue: initialThemes,
  });

  function handleHexInput(colorValue) {
    setValueHex(colorValue);
  }

  function handleContrastInput(colorValue) {
    setValueContrast(colorValue);
  }

  function handleRoleInput(textValue) {
    setRole(textValue);
  }

  function handleAddColor() {
    //done!
    const uId = uid();

    const newColor = {
      id: uId,
      role: role,
      hex: valueHex,
      contrastText: valueContrast,
    };
    setCurrentColors([{ ...newColor }, ...currentColors]);
    setColors([{ ...newColor }, ...colors]);

    setRole("");
    setValueHex("#ffffff");
    setValueContrast("#000000");

    setThemes(
      themes.map((theme) => {
        return theme.id === currentTheme.id
          ? { ...theme, colors: [uId, ...theme.colors] }
          : theme;
      })
    );
  }

  function handleDeleteColor(id) {
    const updatedTheme = currentTheme.colors.filter((color) => color !== id);

    setCurrentColors(
      currentColors.filter((color) => {
        return color.id !== id;
      })
    );

    const updatedCurrentTheme = { ...currentTheme, colors: updatedTheme };

    setThemes(
      themes.map((theme) => {
        return theme.id === currentTheme.id
          ? { ...updatedCurrentTheme }
          : theme;
      })
    );

    setCurrentTheme(updatedCurrentTheme);
  }

  function handleSubmitEdit(newColor) {
    setCurrentColors(
      currentColors.map((color) => {
        return color.id === newColor.id ? newColor : color;
      })
    );
    setColors(
      colors.map((color) => {
        return color.id === newColor.id ? newColor : color;
      })
    );
  }

  function handleChangeTheme(currentThemeObject) {
    const findColorObject = (
      id //sucht farbe anhand von id der farbe
    ) =>
      colors.find((color) => {
        return color.id === id;
      });
    const currentColorsFromTheme = currentThemeObject.colors.map((colorId) => {
      return findColorObject(colorId);
    });

    setCurrentTheme(currentThemeObject);
    setCurrentColors(currentColorsFromTheme);
  }

  function handleDeleteTheme() {
    const updatedThemes = themes.filter((theme) => {
      return theme.id !== currentTheme.id;
    });
    console.log(updatedThemes);
    setThemes(updatedThemes);
    handleChangeTheme(themes[0]); //hier muss wechsel auf nicht-gelöschte karte
    //hier muss auch die ColorInput Karte gelöscht werden und die erste Karte ausgespielt werden
  }

  function handleEditName(valueName) {
    setThemes(
      themes.map((theme) => {
        return currentTheme.id === theme.id
          ? { ...theme, name: valueName, id: valueName }
          : theme;
      })
    );
    console.log(themes);
    setCurrentTheme({ ...currentTheme, name: valueName, id: valueName });
    console.log(currentTheme);
  }

  function handleAddNewTheme(valueName) {
    setThemes([...themes, { name: valueName, id: valueName, colors: [] }]);
    setCurrentTheme({ name: valueName, id: valueName, colors: [] });

    setCurrentColors([]);
  }

  return (
    <>
      <h1>✨Theme Creator✨</h1>
      <ThemeForm
        handleChangeTheme={handleChangeTheme}
        themes={themes}
        handleDeleteTheme={handleDeleteTheme}
        currentTheme={currentTheme}
        onEditName={handleEditName}
        handleEditName={handleEditName}
        handleAddNewTheme={handleAddNewTheme}
      />
      <ColorForm
        callback={handleAddColor}
        role={role}
        valueHex={valueHex}
        valueContrast={valueContrast}
        onContrastInput={handleContrastInput}
        onHexInput={handleHexInput}
        onRoleInput={handleRoleInput}
        buttonChild={"ADD COLOR"}
      />

      {currentColors.length ? null : (
        <p>🌈No colors, start by adding some!🌈</p>
      )}

      {currentColors.map((color) => {
        return (
          <Color
            key={color?.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onSubmitEdit={handleSubmitEdit}
          />
        );
      })}
    </>
  );
}

export default App;

function ThemeForm({
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

function ThemeOption({ themeName }) {
  return <option value={themeName}>{themeName}</option>;
}
