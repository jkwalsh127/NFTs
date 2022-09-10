import { useState } from "react";
import MetaMask from "./components/Methods/MetaMask";
import RadioButtons from "./components/RadioButtons";


function App() {
  const [connectionMethod, setConnectionMethod] = useState("");
  const handleConnectionMethodChange = (selection) => setConnectionMethod(selection);

  return (
    <div className="app">
      <div className="content-container">
        <RadioButtons handleConnectionMethodChange={handleConnectionMethodChange}/>
        <MetaMask />
      </div>
    </div>
  );
}

export default App;
