import { VehicleFms } from '../../types/socket/VehicleFms';

const showOnlyLatestRadioMessage = async function (): Promise<any> {
  const updateField = function (vehicleFmsObject: VehicleFms): void {
    const elements: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFmsObject.userVehicleID}"]`
    );

    if (elements.length > 1) {
      for (let i = 0; i < elements.length; i++) {
        if (i > 0) {
          elements[i].remove();
        }
      }
    }
  };

  if (typeof socket !== 'undefined') {
    socket.on('vehicleFMS', (vehicleFmsObject: VehicleFms): void => {
      updateField(vehicleFmsObject);
    });
  }
};

export { showOnlyLatestRadioMessage };
