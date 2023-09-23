// to reduce dropdown option size and remove unnessery function from handle.dropdown before sending it to Dropdown Component
export const DropdownOptionsReduced = (allOptions, handle) => {
    const reduced = allOptions.map((option, i) => {
      if (!option.optionCondition.show) {
        handle.dropdown.onSelect.splice(i, 1) // Remove the function from onSelect array which is not needed in dropdown
        return null
      };

      if (typeof option.optionName === 'object') {
        // return option.optionName[option.optionCondition.what_to_show]
        return option // returning whole option, for choosing options further if needed
      }

      return option.optionName
    }).filter((element) => element !== null);

    return reduced;
}