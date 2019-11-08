import React, { useState } from "react";
import ExpoenseForm from "./components/ExpoenseForm";
import Alert from "./components/Alert";

import ExponseList from "./components/ExponseList";
import "./App.css";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "creadit card bill", amount: 1200 }
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  console.log(expenses, "jkjk", setExpenses);
  return (
    <>
      <Alert />
      <ExpoenseForm />
      <h1> budget calculator</h1>
      <main className="App">
        <ExponseList expenses={expenses} />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
