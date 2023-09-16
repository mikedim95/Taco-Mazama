function OptionLabel({
  content,
  selectedItems,
  addExtraCost,
  subExtraCost,
  setSelectedItems,
  updateHasChosen,
  plusCost,
  setPlusCost,
  setExtraCosts,
  extraCosts,
  phase,
  renderedFoods, // Receive rendered foods as a prop
  handleClick,
}) {
  return <div>{renderedFoods}</div>;
}

export default OptionLabel;
