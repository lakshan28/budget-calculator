import React, { useState, useEffect } from "react";
import ExpoenseForm from "./components/ExpoenseForm";
import Alert from "./components/Alert";

import ExponseList from "./components/ExponseList";
import "./App.css";
import uuid from "uuid/v4";

// const initialExpenses = [
// { id: uuid(), charge: "rent", amount: 1600 },
// { id: uuid(), charge: "car payment", amount: 400 },
// { id: uuid(), charge: "creadit card bill", amount: 1200 }
//];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  /**
   * State value
   * all expenses, add expenses
   */
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  });
  /**
   * single expenses
   * functionality
   */

  const handleCharge = e => {
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (edit) {
      let tempExpenses = expenses.map(item => {
        return item.id === id ? { ...item, charge, amount } : item;
      });
      setExpenses(tempExpenses);
      setEdit(false);
      handleAlert({ type: "success", text: "item edited" });
    } else {
      const singleExpense = {
        id: uuid(),
        charge,
        amount
      };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: "success", text: "item added" });
    }

    if (charge !== "" && amount > 0) {
      setCharge("");
      setAmount("");
    } else {
      //handle alert called
      handleAlert({
        type: "danger",
        text: `charge cant't be empty value and amount value has be to bigger than zero`
      });
    }
  };
  //clear all item
  const clearItem = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  // handle Edit
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1> budget calculator</h1>
      <main className="App">
        <ExpoenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExponseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItem={clearItem}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
