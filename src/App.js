import { useEffect, useState } from "react";
import Home from "./components/Home";
import colorData from "./assets/color.json";
import { useSelector } from "react-redux";

function App() {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    setColors(colorData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorData]);
  const selectedColor = useSelector((state) => {
    return {
      color: state.app.color,
      backgroundColor: state.app.backgroundColor,
    };
  });
  const [fontFamily] = useState([
    "Palatino Linotype",
    "Times New Roman",
    "Verdana",
    "Tahoma",
    "Arial",
  ]);
  return (
    <div
      className="App"
      style={{
        color: selectedColor.color,
        backgroundColor: selectedColor.backgroundColor,
      }}
    >
      <Home colors={colors} fontFamily={fontFamily} />
    </div>
  );
}

export default App;
