import { useState } from 'react'
import DigitButton from './components/digitButton'
import OperatorButton from './components/operatorButton'
import './App.css'

function App() {
  const [newCalc, setNewCalc] = useState(true);
  const [result, setResult] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState('');
  const operators=['+', '-', '/', '*'];
  const digits=[1,2,3,4,5,6,7,8,9,0];

  const onDigitPress = (digit) => {
    if(newCalc){
      setResult((prev) => prev * 10 + digit);
    }
    else {
      setNextNumber((prev) => prev * 10 + digit)
    }
  }

  const onOperatorPress = (operator) => {
    setNewCalc(false);
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
        default: 
          return prev;
      }
    });
    setOperator('');
    setNextNumber(null);
  }

  const handleClearPress = () => {
    setResult(null);
    setNewCalc(true);
    setNextNumber(null);
    setOperator('');
  }

  return (
    <>
      <h2>{nextNumber != null ? nextNumber : result}</h2>
      <div className="buttons-container">
        <div className="digits-container">
          {
            digits.map((digit) => {
              return(
                <DigitButton digit={digit} onClick={onDigitPress} />
              )
            })
          }
        </div>
        <div className="operators-container">
          {
            operators.map((operator) => {
              return(
                <OperatorButton operator={operator} onClick={onOperatorPress}/>
              )
            })
          }
          <button onClick={onEqualsPress}>=</button>
        </div>
      </div>
      <button onClick={handleClearPress}>Clear</button>
    </>
  )
}

export default App
