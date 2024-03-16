import { VehicleFms } from '../../types/socket/VehicleFms';

const deleteNewestFmsAfterTime = async function (): Promise<any> {
  const updateField = function (vehicleFsmObject: VehicleFms): void {
    const time: number = parseInt(
      localStorage.getItem('deleteNewestFmsAfterTime') ?? '2000'
    );

    const message: HTMLDivElement | null = document.querySelector(
      `div#radio-container-others div.radio-vehicle.frame-opener[uservehicleid="${vehicleFsmObject.userVehicleID}"]`
    );

    setTimeout((): void => {
      message?.remove();
    }, time);
  };

  if (typeof socket !== 'undefined') {
    socket.on('vehicleFMS', (vehicleFmsObject: VehicleFms): void => {
      if (vehicleFmsObject.fms5Type === null) {
        updateField(vehicleFmsObject);
      }
    });

    socket.on('vehicleFMSGrouped', (vehicleFMSObjectArray: VehicleFms[]) => {
      vehicleFMSObjectArray.forEach(vehicleFMSObject => {
        if (vehicleFMSObject.fms5Type === null) {
          updateField(vehicleFMSObject);
        }
      });
    });
  }
};

export { deleteNewestFmsAfterTime };
