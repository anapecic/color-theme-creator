import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useEffect, useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeForm from "./Components/ThemeForm/ThemeForm";

const initialThemes = [
  {
    id: "default",
    name: "Default Theme",
    colors: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
  },
  { id: "My Theme 1", name: "My Theme 1", colors: [] },
];

function App() {
  const [role, setRole] = useState("add role");
  const [valueHex, setValueHex] = useState("#ffffff");
  const [valueContrast, setValueContrast] = useState("#000000");
  const [colors, setColors] = useLocalStorageState("currentColors", {
    defaultValue: initialColors,
  });
  const [themes, setThemes] = useLocalStorageState("currentThemes", {
    defaultValue: initialThemes,
  });
  const [currentThemes, setCurrentThemes] = useState([]);
  const [themeNow, setThemeNow] = useState(null);

  useEffect(() => {
    // Initialize with the default theme
    const defaultTheme = themes.find((theme) => theme.id === "default");
    if (defaultTheme) {
      const defaultColors = initialColors.filter((color) =>
        defaultTheme.colors.includes(color.id)
      );
      setColors(initialColors); // Ensure initial colors are set
      setCurrentThemes(defaultColors);
      setThemeNow(defaultTheme);
    }
  }, [themes]);

  function handleAddColor() {
    const newColor = {
      id: uid(),
      role: role,
      hex: valueHex,
      contrastText: valueContrast,
    };

    // Update colors state
    const updatedColors = [...colors, newColor];
    setColors(updatedColors);

    if (themeNow) {
      // Update themes state with new color
      const updatedThemes = themes.map((theme) => {
        if (theme.id === themeNow.id) {
          return {
            ...theme,
            colors: [...theme.colors, newColor.id],
          };
        }
        return theme;
      });
      setThemes(updatedThemes);

      // Update current theme colors
      const updatedCurrentThemes = [...currentThemes, newColor];
      setCurrentThemes(updatedCurrentThemes);
    }

    // Reset form inputs
    setRole("");
    setValueHex("#ffffff");
    setValueContrast("#000000");
  }

  function handleHexInput(colorValue) {
    setValueHex(colorValue);
  }

  function handleContrastInput(colorValue) {
    setValueContrast(colorValue);
  }

  function handleRoleInput(textValue) {
    setRole(textValue);
  }

  function handleDeleteColor(id) {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);

    if (themeNow) {
      const updatedCurrentThemes = updatedColors.filter((color) =>
        themeNow.colors.includes(color.id)
      );
      setCurrentThemes(updatedCurrentThemes);
    }
  }

  function handleSubmitEdit(newColor) {
    const updatedColors = colors.map((color) =>
      color.id === newColor.id ? newColor : color
    );
    setColors(updatedColors);

    if (themeNow) {
      const updatedCurrentThemes = updatedColors.filter((color) =>
        themeNow.colors.includes(color.id)
      );
      setCurrentThemes(updatedCurrentThemes);
    }
  }

  function handleAddTheme(option) {
    console.log("added this theme:", option);
    // Implementation for adding a theme
  }

  function handleChangeCurrentThemes(option) {
    const theme = themes.find((theme) => theme.id === option);
    if (theme) {
      setThemeNow(theme);
      const filteredColors = colors.filter((color) =>
        theme.colors.includes(color.id)
      );
      setCurrentThemes(filteredColors);
    }
  }

  return (
    <>
      <h1>✨Theme Creator✨</h1>
      <ThemeForm
        onAddTheme={handleAddTheme}
        onChangeCurrentThemes={handleChangeCurrentThemes}
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

      {currentThemes.length === 0 ? (
        <p>🌈No colors, start by adding some!🌈</p>
      ) : null}

      {currentThemes.map((color) => (
        <Color
          key={color.id}
          color={color}
          onDeleteColor={handleDeleteColor}
          onSubmitEdit={handleSubmitEdit}
        />
      ))}
    </>
  );
}

export default App;
