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

// const defaultThemeColors = [
//   "c1",
//   "c2",
//   "c3",
//   "c4",
//   "c5",
//   "c6",
//   "c7",
//   "c8",
//   "c9",
// ];

function App() {
  const [role, setRole] = useState("add role");
  const [valueHex, setValueHex] = useState("#ffffff");
  const [valueContrast, setValueContrast] = useState("#000000");
  const [colors, setColors] = useLocalStorageState("allColors", {
    //all colors!
    defaultValue: initialColors,
  });
  // const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
  //   defaultValue: [],
  // });
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
    setCurrentColors([{ ...newColor }, ...colors]);
    setColors([{ ...newColor }, ...colors]);

    setRole("");
    setValueHex("#ffffff");
    setValueContrast("#000000");

    //to do: themes muss gesynched werden. newColor.id mit themes abgleichen
    //idee: ich versuche aus currentColors ein Verzeichnis zu erstellen und so das current theme finden
    const currentTheme = currentColors.map((color) => {
      return color.id;
    });
    const findThemeObject = (verzeichnis) =>
      themes.find((theme) =>
        theme.colors.toString().includes(verzeichnis.toString())
      );
    const themeToAdd = findThemeObject(currentTheme); //returnt das objekt des aktuellen themes

    setThemes(
      themes.map((theme) => {
        return theme.id === themeToAdd.id
          ? { ...theme, colors: [uId, ...theme.colors] }
          : theme;
      })
    );
  }

  function handleDeleteColor(id) {
    //done!
    setCurrentColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
    //theme finden
    const currentTheme = currentColors.map((color) => {
      return color.id;
    });
    const findThemeObject = (verzeichnis) =>
      themes.find((theme) =>
        theme.colors.toString().includes(verzeichnis.toString())
      );
    const themeToDelete = findThemeObject(currentTheme); //returnt objekt des aktuellen themes

    const updatedTheme = themeToDelete.colors.filter((color) => color !== id);
    console.log(updatedTheme);

    setThemes(
      themes.map((theme) => {
        return theme === themeToDelete
          ? { ...theme, colors: [...updatedTheme] }
          : theme;
      })
    );
  }

  function handleSubmitEdit(newColor) {
    //done!
    setCurrentColors(
      colors.map((color) => {
        return color.id === newColor.id ? newColor : color;
      })
    );
    setColors(
      colors.map((color) => {
        return color.id === newColor.id ? newColor : color;
      })
    );
  }

  function handleChangeTheme(currentThemeOption) {
    const findColorObject = (id) =>
      colors.find((color) => {
        return color.id === id;
      });
    const currentColorsFromTheme = currentThemeOption.map((colorId) => {
      return findColorObject(colorId);
    });

    setCurrentColors(currentColorsFromTheme);
  }

  return (
    <>
      <h1>✨Theme Creator✨</h1>
      <ThemeForm handleChangeTheme={handleChangeTheme} themes={themes} />
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

function ThemeForm({ handleChangeTheme, themes }) {
  const allThemes = themes;

  function onChangeTheme(themeId) {
    const newTheme = allThemes.find((theme) => theme.id === themeId);
    const newColorIds = newTheme.colors; //ID Verzeichnis! Array ->in App als currentTheme

    handleChangeTheme(newColorIds);
  }

  return (
    <form>
      <select
        name="select"
        onChange={(event) => onChangeTheme(event.target.value)}
      >
        {/* hier muss über die themes gemappt werden */}
        <ThemeOption themeName="Default Theme" />
        <ThemeOption themeName="My Theme 1" />
        <ThemeOption themeName="My Theme 2" />
      </select>
      <button type="submit">ADD</button>
      <button>EDIT</button>
      <button>DELETE</button>
    </form>
  );
}

function ThemeOption({ themeName }) {
  return <option value={themeName}>{themeName}</option>;
}
