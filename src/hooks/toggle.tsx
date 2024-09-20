interface ToggleProps {
  onText: string,
  offText: string,
  btnName: string,
  isOpen: boolean;
  toggleIsOpen: () => void;
};

const ToggleComponent: React.FC<ToggleProps> = ({ onText, offText, btnName, isOpen, toggleIsOpen }) => {

  return (
    <div>
      <p>{isOpen ? onText : offText}</p>
      <button onClick={toggleIsOpen}>{btnName}</button>
    </div>
  )
};

export default ToggleComponent;