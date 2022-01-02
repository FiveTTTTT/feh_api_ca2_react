import './App.css';
import { Route, Routes } from 'react-router-dom';
import FehAdd from "./components/FehAdd";
import FehEdit from "./components/FehEdit";
import FehSingle from "./components/FehSingle";
import FeHeroes from "./components/FeHeroes";
import FehDelete from './components/FehDelete';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<FeHeroes />} />
        <Route path="/FehAdd" element={<FehAdd />} />
        <Route path="/FehEdit/:id" element={<FehEdit />} />
        <Route path="/FehSingle/:id" element={<FehSingle />} />
        <Route path="/FeHeroes" element={<FeHeroes />} />
        <Route path="/FehDelete/:id" element={<FehDelete />} />
      </Routes>
    </div>
  );
}

export default App;
