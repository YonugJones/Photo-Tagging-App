// Dropdown menu for selecting characters (waldo, wanda, wizard)
import '../styles/dropDownMenu.css';

const DropDownMenu = ({ onSelect }) => {
  const characters = ['waldo', 'wanda', 'wizard'];

  return (
    <select
      className='dropdown-menu'
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=''
    >
      <option value='' disabled>
        Select a character
      </option>
      {characters.map((character) => (
        <option key={character} value={character}>
          {character}
        </option>
      ))}
    </select>
  )
}

export default DropDownMenu;