interface SearchBarProps {
  config: {
    placeholder: string;
    textButton: string;
  }
}

const SearchBar = ({ config:{
    placeholder, textButton
}}: SearchBarProps) => {
  return (
    <div>
      <input type="text" placeholder={placeholder} />
      <button>{textButton}</button>
    </div>
  );
};

export default SearchBar;
