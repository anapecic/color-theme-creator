import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm />

      {initialColors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}


function ColorForm(){
  function handleAddColor(){}
  
  return <form className="formWrapper" onSubmit={handleAddColor}>
    <label htmlFor="roleInput">Role</label>
    <input type="text" id="roleInput" placeholder="add role"></input>
    
    <label htmlFor="hexInput">Hex</label>
    <div>
    <input type="text" id="hexInput" placeholder="#ff4a11"></input>
    <input type="color"></input>
    </div>
    
    <label htmlFor="contrastInput">Contrast Text</label>
    <div>
    <input type="text" id="contrastInput" placeholder="#000000"></input>
    <input type="color"></input>
    </div>

    <button type="submit">ADD COLOR</button>
  </form>
}

export default App;
 