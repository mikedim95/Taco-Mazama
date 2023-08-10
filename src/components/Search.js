import { useState } from "react";
import search from "../assets/search.svg";
import { debounce } from "lodash";

function Search({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSearch = debounce((term) => {
    if (!isTyping) {
      onSubmit(term);
    }
  }, 300);

  const handleInputChange = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  return (
    <div className="flex space-x-[10px] mt-[5px]">
      <img className="w-[24px] h-[24px]" src={search} alt="" />
      <form>
        <input
          type="text"
          placeholder="Αναζήτηση..."
          className="bg-background-light text-[16px] font-pop font-normal text-textFont-light focus:outline-none"
          value={searchTerm}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default Search;
