import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/registration";
import { useState } from "react";
function App() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [c, setC] = useState(["Apple", "Banana", "Cherry"]);
  const [s, setS] = useState(100);
  return (
    <>
      <button onClick={() => setItems(["Mango", ...items])}>
        Add Mango at Top
      </button>

      {items.map((item, index) => (
        <InputItem key={index} label="1" />
      ))}
      <Fn2 val1="10" val2="this" var3={c} var4={s}></Fn2>
      <hr />
      <Fn3 val1={10} val2={"thisisstr"}></Fn3>
      <hr />
      <Fn4 val1={c} val2={s}></Fn4>
      <hr />
    </>
  );
}
type Fn3Props = {
  val1: number;
  val2: string;
};

function Fn3({ val1, val2 }: Fn3Props) {
  return (
    <div>
      <p>Number: {val1}</p>
      <p>String: {val2}</p>
    </div>
  );
}
type Fn4Props = {
  val1: string[];
  val2: number;
};

function Fn4(props: Fn4Props) {
  return (
    <div>
      <p>Total: {props.val2}</p>

      <ul>
        {props.val1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
type Fn2Props = {
  val1: string;
  val2: string;
  var3: string[];
  var4: number;
};

function Fn2({ val1, val2, var3, var4 }: Fn2Props) {
  return (
    <div>
      <p>val1: {val1}</p>
      <p>val2: {val2}</p>
      <p>var4: {var4}</p>

      <ul>
        {var3.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function InputItem({ label }: { label: string }) {
  const [text, setText] = useState("");

  return (
    <div>
      {label}:
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

const App1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" />} />
      <Route path="/registration" element={<Register />} />
    </Routes>
  );
};

export default App;
