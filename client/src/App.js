import "./App.css";
import Speech from "./components/Speech";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tap to speak with GPT</p>
        <Speech />
      </header>
    </div>
  );
}

export default App;
