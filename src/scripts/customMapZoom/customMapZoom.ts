import { variableIsNull } from '../../ts/errors/console';

const customMapZoom = async function (): Promise<any> {
  const focusMap = function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error
    if (typeof L === 'undefined' || typeof mymap === 'undefined') return;

    const northernCoordinate = localStorage.getItem('customMapZoomNorth');
    const easternCoordinate = localStorage.getItem('customMapZoomEast');
    const southernCoordinate = localStorage.getItem('customMapZoomSouth');
    const westernCoordinate = localStorage.getItem('customMapZoomWest');
    if (northernCoordinate === null) {
      variableIsNull(Object.keys({ northernCoordinate })[0], 'customMapZoom');
      return;
    }
    if (easternCoordinate === null) {
      variableIsNull(Object.keys({ easternCoordinate })[0], 'customMapZoom');
      return;
    }
    if (southernCoordinate === null) {
      variableIsNull(Object.keys({ southernCoordinate })[0], 'customMapZoom');
      return;
    }
    if (westernCoordinate === null) {
      variableIsNull(Object.keys({ westernCoordinate })[0], 'customMapZoom');
      return;
    }

    const parsedNorthernCoordinate = parseFloat(northernCoordinate);
    const parsedEasternCoordinate = parseFloat(easternCoordinate);
    const parsedSouthernCoordinate = parseFloat(southernCoordinate);
    const parsedWesternCoordinate = parseFloat(westernCoordinate);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error
    const northEast = L.latLng(
      parsedNorthernCoordinate,
      parsedEasternCoordinate
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error
    const southWest = L.latLng(
      parsedSouthernCoordinate,
      parsedWesternCoordinate
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error
    mymap.fitBounds(L.latLngBounds(southWest, northEast), {
      padding: [20, 20],
      maxZoom: 14
    });
  };
  focusMap();
  const zoomButton: HTMLAnchorElement | null =
    document.querySelector('a#mapCenter');

  if (zoomButton === null) {
    // ! Logging deliberately removed, because variable partly intentionally null
    return;
  }

  zoomButton.addEventListener('click', focusMap);
};

export { customMapZoom };
