import logo from './logo.svg';
import './App.css';
import SummaryForm from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';

function App() {
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </>
  );
}

export default App;
