import ReactDOM from "react-dom";

function Modal({ children, actionBar, onClick }) {
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClick}
        className="fixed inset-0 bg-gray-500 opacity-80"
      ></div>
      <div className="fixed inset-y-1/3 mx-[40px] my-[30px] px-[20px] py-[40px] outline outline-1 outline-[#bc292f] rounded-[20px] bg-[#f6f6d9] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col">{children}</div>
        <div className="flex justify-end items-end">{actionBar}</div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
