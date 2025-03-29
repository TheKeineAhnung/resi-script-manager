import { VehicleFms } from '../../types/socket/VehicleFms';

const deleteNewestFmsAfterTime = async function (): Promise<any> {
  const updateField = function (
    vehicleFsmObject: VehicleFms,
    isRadioMessage: boolean
  ): void {
    const time: number = parseInt(
      localStorage.getItem('deleteNewestFmsAfterTime') ?? '2000'
    );

    const deleteRadioMessages =
      localStorage.deleteRadioMessages.toLowerCase() === 'true';

    if (isRadioMessage) {
      if (!deleteRadioMessages) {
        return;
      }

      const message: HTMLDivElement | null = document.querySelector(
        `div#radio-container-others div.radio-message-fms[uservehicleid="${vehicleFsmObject.userVehicleID}"]`
      );

      setTimeout((): void => {
        message?.remove();
      }, time);

      return;
    }

    const message: HTMLDivElement | null = document.querySelector(
      `div#radio-container-others div.radio-vehicle.frame-opener[uservehicleid="${vehicleFsmObject.userVehicleID}"]`
    );

    setTimeout((): void => {
      message?.remove();
    }, time);
  };

  if (typeof socket !== 'undefined') {
    socket.on('vehicleFMS', (vehicleFmsObject: VehicleFms): void => {
      if (
        vehicleFmsObject.fms5Type === null ||
        vehicleFmsObject.fms5Type === 'radio'
      ) {
        updateField(vehicleFmsObject, vehicleFmsObject.fms5Type === 'radio');
      }
    });

    socket.on('vehicleFMSGrouped', (vehicleFMSObjectArray: VehicleFms[]) => {
      vehicleFMSObjectArray.forEach(vehicleFMSObject => {
        if (
          vehicleFMSObject.fms5Type === null ||
          vehicleFMSObject.fms5Type === 'radio'
        ) {
          updateField(vehicleFMSObject, vehicleFMSObject.fms5Type === 'radio');
        }
      });
    });
  }
};

export { deleteNewestFmsAfterTime };
