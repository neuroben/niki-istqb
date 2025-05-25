//import type { MouseEvent } from "react";

interface Props {
  items: string[];
  selectedIndices: number[];
  setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, selectedIndices, setSelectedIndices }: Props) {
  //let items = ["New York", "Budapest", "San Fransisco", "Paris"];

  function toggleIndex(prev: number[], index: number) {
    if (prev.includes(index) == true) {
      return prev.filter((i) => i !== index);
    } else {
      return [...prev, index];
    }
  }

  return (
    <>
      {
        /* javaScriptben ha true && 'valami' akkor 'valamit' kapok vissza*/
        items.length === 0 && <p>No item found</p>
      }
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              (selectedIndices.includes(index)
                ? "list-group-item active"
                : "list-group-item") + " text-center"
            }
            key={item}
            onClick={() => {
              setSelectedIndices((prev) => toggleIndex(prev, index));
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
