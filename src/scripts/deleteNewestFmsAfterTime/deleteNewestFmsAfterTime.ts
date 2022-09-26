import { VehicleFms } from '../../types/socket/VehicleFms';

const deleteNewestFmsAfterTime = async function (): Promise<any> {
  const updateField = function (vehicleFsmObject: VehicleFms): void {
    let time: string | null = localStorage.getItem('deleteNewestFmsAfterTime');

    if (time === null) {
      localStorage.setItem('deleteNewestFmsAfterTime', '');
      time = '';
    }

    const parsedTime = Number.parseInt(time, 10);

    setTimeout((): void => {
      const messages: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        `div.radio-vehicle.frame-opener[uservehicleid="${vehicleFsmObject.userVehicleID}"]`
      );

      console.log('timeout', messages);

      if (messages.length > 0) {
        for (let i = 0; i < messages.length; i++) {
          messages[i].remove();
        }
      }
    }, parsedTime);
  };

  socket.on('vehicleFMS', (vehicleFmsObject: VehicleFms): void => {
    if (vehicleFmsObject.fms5Type === null) {
      updateField(vehicleFmsObject);
    }
  });
};

export { deleteNewestFmsAfterTime };
