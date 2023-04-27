/* eslint-disable react/prop-types */
import '../App.css';

export default function DigitButton(props){
    return(
        <div className="digit">
            <button className="digit-button" onClick={() => props.onClick(props.digit)}>{props.digit}</button>
        </div>
    )
}