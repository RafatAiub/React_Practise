import { useState, useEffect } from "react";

export default function RandomColor() {
  const [colorType, setColorType] = useState('hex'); // State to manage the type of color
  const [color, setColor] = useState("#000000"); // State to manage the background color
  const [buttonStyle, setButtonStyle] = useState({}); // State to manage the button style

  console.log("color :>> ", color);

  // Function to generate a random hex color
  function handleCreateRandomHexColor() {
    const hexCharacters = [
      "0", "1", "2", "3", "4", "5", "6", "7", 
      "8", "9", "A", "B", "C", "D", "E", "F"
    ];
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexCharacters.length);
      hex += hexCharacters[randomIndex];
    }
    setColor(hex);
    updateButtonStyle();
  }

  // Function to generate a random RGB color
  function handleCreateRandomRgbColor() {
    const r = Math.floor(Math.random() * 256); // Corrected random generation
    const g = Math.floor(Math.random() * 256); // Corrected random generation
    const b = Math.floor(Math.random() * 256); // Corrected random generation
    setColor(`rgb(${r},${g},${b})`);
    updateButtonStyle();
  }

  // Function to generate a random button style
  function updateButtonStyle() {
    const randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    setButtonStyle({
      backgroundColor: randomColor(),
      color: randomColor(),
      borderColor: randomColor(),
      borderWidth: '2px',
      borderStyle: 'solid'
    });
  }

  // Update color display when color mode switches
  function handleSwitchColorType(type) {
    setColorType(type);
  }

  // Use effect to handle color generation after colorType changes
  useEffect(() => {
    if (colorType === "hex") {
      handleCreateRandomHexColor();
    } else {
      handleCreateRandomRgbColor();
    }
  }, [colorType]);

  // Function to get button style based on color type
  const getButtonStyle = (isActive) => ({
    ...buttonStyle,
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#000' : buttonStyle.backgroundColor,
    color: isActive ? '#FFF' : buttonStyle.color,
    borderColor: isActive ? '#FFF' : buttonStyle.borderColor,
    borderWidth: isActive ? '2px' : buttonStyle.borderWidth,
    borderStyle: isActive ? 'solid' : buttonStyle.borderStyle
  });

  return (
    <div
      style={{ width: "100vw", height: "100vh", background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      className="container"
    >
      <div style={{ marginBottom: '20px', fontSize: '24px', color: '#FFF' }}>
        Current Color: {color}
      </div>
      <button
        style={getButtonStyle(colorType === "hex")}
        onClick={() => handleSwitchColorType("hex")}
      >
        Create HEX color
      </button>
      <button
        style={getButtonStyle(colorType === "rgb")}
        onClick={() => handleSwitchColorType("rgb")}
      >
        Create RGB color
      </button>
      <button
        style={{
          ...buttonStyle,
          padding: '10px 20px',
          margin: '5px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={
          colorType === "hex"
            ? handleCreateRandomHexColor
            : handleCreateRandomRgbColor
        }
      >
        Generate Random Color
      </button>
    </div>
  );
}
