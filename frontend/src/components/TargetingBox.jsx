// Targeting box component for user clicks
import DropDownMenu from "./DropDownMenu";
import '../styles/targetingBox.css';

const TargetingBox = ({ x, y, onCharacterSelect }) => {
  return (
    <div className="targeting-box" style={{ left: x, top: y }}>
      <DropDownMenu onSelect={onCharacterSelect} />
    </div>
  )
}

export default TargetingBox;