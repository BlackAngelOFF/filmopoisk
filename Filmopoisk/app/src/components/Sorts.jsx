import '../index.css';

function Sorts({props}) {
  return (
    <div className="film-sort">

        <h2 className="sort-title">Сортировка</h2>

        {props.arr.map(e => e)}
    </div>
  );
}

export default Sorts;