import { useState } from 'react'
import DigitButton from './components/digitButton'
import OperatorButton from './components/operatorButton'
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState('');
  const [newCalc, setNewCalc] = useState(true);
  const [sign, setSign] = useState(1);
  const [prevResult, setPrevResult] = useState(null);
  const [updatePrev, setUpdate] = useState(false);

  const operators=['+', '-', '/', '*', '%'];
  const digits=[1,2,3,4,5,6,7,8,9,0];

  const onDigitPress = (digit) => {
    if (setUpdate) {
      setPrevResult(result);
      setUpdate(false);
    }
    if(newCalc){
      setResult((prev) => prev * 10 + sign * digit);
    }
    else {
      setNextNumber((prev) => prev * 10 + sign * digit);
    }
  }

  const onOperatorPress = (operator) => {
    setNewCalc(false);
    setSign(1);
    setOperator(operator);
  }

  const onEqualsPress = () => {
    setResult((prev) => {
      switch(operator){
        case '+': 
          return prev + nextNumber;
        case '-': 
          return prev - nextNumber;
        case '/': 
          return prev / nextNumber;
        case '*': 
          return prev * nextNumber;
        case '%':
          return prev % nextNumber;
        default: 
          return prev;
      }
    });
    setUpdate(true);
    setOperator('');
    setNextNumber(null);

  }

  const handleClearPress = () => {
    setResult(null);
    setNewCalc(true);
    setNextNumber(null);
    setOperator('');
    setSign(1);
  }

  const handleSignChange = () => {
    setSign(-sign);
    if (newCalc) {
      setResult(-result);
    }
  }

  return (
    <>
      <h3>Previous Result: {prevResult ?? 0}</h3>
      <h3>Current sign: {sign}</h3>
      <h2>{nextNumber != null ? nextNumber : result ?? 0}</h2>
      <div className="buttons-container">
        <div className="digits-container">
          {
            digits.map((digit) => {
              return(
                <DigitButton key={digit} digit={digit} onClick={onDigitPress} />
              )
            })
          }
        </div>
        <div className="operators-container">
          {
            operators.map((operator) => {
              return(
                <OperatorButton key={operator} operator={operator} onClick={onOperatorPress}/>
              )
            })
          }
          <button className="equals-button" onClick={onEqualsPress}>=</button>
          <button className="clear-button" onClick={handleClearPress}>Clear</button>
          <button onClick={handleSignChange}>+/-</button>
        </div>
        
      </div>
    </>
  )
}

export default App
