import { useState } from "react";
// import "./styles/datedrop.css"

const DateDropdown = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("OCT 15 - 21");
  const [isOpen, setIsOpen] = useState(false);

  const dateRanges = [
    "OCT 1 - 7",
    "OCT 8 - 14",
    "OCT 15 - 21",
    "OCT 22 - 28",
    "OCT 29 - NOV 4",
  ];

  return (
    <div className="dropdown">
      {/* Button */}
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedDateRange}</span>
        <span className="arrow">&#9662;</span> {/* Downward triangle symbol */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          {dateRanges.map((range, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => {
                setSelectedDateRange(range);
                setIsOpen(false);
              }}
            >
              {range}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DateDropdown;
