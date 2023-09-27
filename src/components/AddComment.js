function AddComment({ handleCommentChange, comment }) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    handleCommentChange(newValue);
  };

  return (
    <div className="pt-5 relative">
      <div className="w-auto h-auto flex flex-col rounded-[20px] bg-[#DFE3BA] shadow-[1px_4px_6px_rgba(0,0,0,0.4)]">
        <div className="pt-[20px] text-[18px] font-pop text-center font-bold text-textFont-dark">
          Your Comments
        </div>
        <div>
          <div className="pl-[10px] pr-[10px] min-h-[100px]">
            <textarea
              type="text"
              placeholder={comment ? comment : "Γράψε το σχόλιό"}
              onChange={handleChange}
              className="min-h-[90px] w-full h-full p-2 rounded-[10px] font-pop text-[13px] font-bold text-textFont-dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
