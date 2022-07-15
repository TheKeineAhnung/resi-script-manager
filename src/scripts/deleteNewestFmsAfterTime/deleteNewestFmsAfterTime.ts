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

      if (messages.length > 0) {
        for (let i = 0; i < messages.length; i++) {
          messages[i].remove();
        }
      }
    }, parsedTime);
  };

  // @ts-expect-error socket is a variable from rettungssimulator.online
  // eslint-disable-next-line no-undef
  socket.on('vehicleFMS', (vehicleFmsObject: VehicleFms): void => {
    updateField(vehicleFmsObject);
  });
};

export { deleteNewestFmsAfterTime };
