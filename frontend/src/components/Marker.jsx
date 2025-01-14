// Marker component for correct guesses
import '../styles/marker.css';

const Marker = ({ x, y, name }) => {
  return (
    <div className='marker' style={{ left: x, top: y }}>
      {name}
    </div>
  )
}

export default Marker;