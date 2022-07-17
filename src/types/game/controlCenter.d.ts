declare const FRAMES: {
  '1/1/4/5': {
    grid: '1 / 1 / 4 / 5';
    hide: ['chat', 'calls', 'missions', 'departments', 'radio', 'map', 'ad'];
  };
  '1/1/4/4': {
    grid: '1 / 1 / 4 / 4';
    hide: ['chat', 'calls', 'missions', 'map', 'ad', 'radio'];
  };
  '1/2/4/5': {
    grid: '1 / 2 / 4 / 5';
    hide: ['chat', 'calls', 'missions', 'departments', 'radio'];
  };
  '1/3/4/5': {
    grid: '1 / 3 / 4 / 5';
    hide: ['departments', 'missions', 'radio'];
  };
  '1/2/4/4': {
    grid: '1 / 2 / 4 / 4';
    hide: ['missions', 'radio', 'chat', 'calls'];
  };
};

declare let frameVisible: {
  map: boolean;
  ad: boolean;
  calls: boolean;
  missions: boolean;
  chat: boolean;
  radio: boolean;
  departments: boolean;
};

declare function hidePanels(): void;

declare function openFrame(url: string, element: string): void;
