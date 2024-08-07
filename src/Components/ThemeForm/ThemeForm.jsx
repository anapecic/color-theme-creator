import ThemeOption from "../ThemeOption/ThemeOption";

export default function ThemeForm({ onAddTheme, onChangeCurrentThemes }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAddTheme(event.target.elements.select.value);
      }}
    >
      <select
        name="select"
        onChange={(event) => onChangeCurrentThemes(event.target.value)}
      >
        <option value="default">Default Theme</option>
        <ThemeOption themeName="My Theme 1" />
      </select>
      <button type="submit">ADD</button>
      <button disabled={true}>EDIT</button>
      <button disabled={true}>DELETE</button>
    </form>
  );
}
