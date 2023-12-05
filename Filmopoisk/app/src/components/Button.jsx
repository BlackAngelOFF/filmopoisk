import '../index.css';

function Button({props}) {
  return (
    <button type={props.type} className={"button " + props.classOut} onClick={props.onClick}>
        <p className={"inner-button " + props.classIn}>{props.innerHtml}</p>
    </button>
  );
}

export default Button;