const filterAaoEditVehicles = async function (): Promise<any> {
  const removeVehicleOptions = function (): void {
    const removeVehicleTypes: string | null = localStorage.getItem(
      'removeVehicleOptions'
    );

    let options;

    if (removeVehicleTypes !== null) {
      options = JSON.parse(removeVehicleTypes);
    } else {
      localStorage.setItem('removeVehicleOptions', JSON.stringify([]));
      options = [];
    }

    const elements: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
      'select.aao-edit-selcet'
    );

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const optionsElem: NodeListOf<HTMLOptionElement> =
        element.querySelectorAll('option');

      for (let j = 0; j < optionsElem.length; j++) {
        const option = optionsElem[j];

        if (!option.selected && options.includes(option.value)) {
          option.remove();
        }
      }
    }
  };

  removeVehicleOptions();
};

export { filterAaoEditVehicles };
