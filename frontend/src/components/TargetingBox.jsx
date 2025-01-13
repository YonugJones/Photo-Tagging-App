// Targeting box component for user clicks
import DropDownMenu from "./DropDownMenu";
import '../styles/targetingBox.css';

const TargetingBox = ({ x, y, onCharacterSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  }
  return (
    <div className="targeting-box" style={{ left: x, top: y }} onClick={handleClick}>
      <DropDownMenu onSelect={onCharacterSelect} />
    </div>
  )
}

export default TargetingBox;