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

console.log(initialThemes);

function App() {
  const [role, setRole] = useState("add role");
  const [valueHex, setValueHex] = useState("#ffffff");
  const [valueContrast, setValueContrast] = useState("#000000");
  const [colors, setColors] = useLocalStorageState("currentTheme", {
    defaultValue: initialColors,
  });
  const [currentTheme, setCurrentTheme] = useState([]);
  const [themes, setThemes] = useState(initialThemes);

  useEffect(() => {
    const defaultTheme = themes.find((theme) => theme.id === "default");

    if (defaultTheme) {
      const filteredColors = initialColors.filter((color) =>
        defaultTheme.colors.includes(color.id)
      );

      setCurrentTheme(filteredColors);
      setColors(filteredColors);
    }
  }, [themes]);

  function handleAddColor() {
    setColors([
      { id: uid(), role: role, hex: valueHex, contrastText: valueContrast },
      ...colors,
    ]);
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
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
  }

  function handleSubmitEdit(newColor) {
    setColors(
      colors.map((color) => {
        return color.id === newColor.id ? newColor : color;
      })
    );
  }

  function handleAddTheme(option) {
    console.log("added this theme:", option);
  }

  function handleChangeCurrentTheme(option) {
    const theme = themes.find((theme) => {
      return theme.id === option;
    });
    if (theme) {
      const filteredColors = colors.filter((color) =>
        theme.colors.includes(color.id)
      );
      setCurrentTheme(filteredColors);
    } else {
      console.error(`Theme with id ${option} not found`);
    }
  }

  console.log(currentTheme);
  console.log(colors);

  return (
    <>
      <h1>✨Theme Creator✨</h1>
      <ThemeForm
        onAddTheme={handleAddTheme}
        onChangeCurrentTheme={handleChangeCurrentTheme}
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

      {currentTheme.length === 0 ? (
        <p>🌈No colors, start by adding some!🌈</p>
      ) : null}

      {currentTheme.map((color) => {
        return (
          <Color
            key={color.id}
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
