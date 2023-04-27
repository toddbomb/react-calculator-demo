import '../App.css';

export default function OperatorButton(props){
    return(
        <div className="operator">
            <button onClick={() => props.onClick(props.operator)}>{props.operator}</button>
        </div>
    )
}