declare async function modal(
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,
  confirm: () => void,
  cancel?: () => void,
  callbackFirst?: boolean
): Promise<unknown>;

declare class spinnerOverlay {
  constructor(text: string);
  remove(): void;
}

declare function noticeModal(
  title: string,
  text: string,
  noticedText?: string,
  noticed?: () => void,
  buttonClass?: string
): void;

interface InputModalObject {
  title: string;
  label: string;
  placeholder: string;
  confirmText?: string;
  cancelText?: string;
  type?: string;
  value?: string;
}

declare function inputModal({
  title,
  label,
  placeholder,
  confirmText,
  cancelText,
  type,
  value
}: InputModalObject): Promise<unknown>;

interface SelectModalObject {
  title: string;
  elements: { value: string; disabled: boolean; text: string }[];
  confirmText?: string;
  cancelText?: string;
}

declare function selectModal({
  title,
  elements,
  confirmText,
  cancelText
}: SelectModalObject): Promise<unknown>;

interface SystemMessageObject {
  title: string;
  message: string;
  type: string;
  timeout?: number;
}

declare function systemMessage(message: SystemMessageObject): void;

declare function reload(): void;

declare function toggleDarkmode(darkmode: boolean | null = null): void;

declare function callApi(
  url: string,
  data: object,
  callbackSuccess?: () => void,
  defaultError?: boolean,
  callbackError?: () => void
): void;

declare function pad(n: number): string;

declare function msToTime(s: number): string;

declare function authForum(
  username: string,
  hashedPassword: string,
  forumUserID: number,
  target: string
): void;

declare function loadingAnimation(
  element: HTMLElement,
  object?: boolean
): void | { oldContent: string };

declare function playSound(
  sound: string,
  volume?: number,
  ignoreEnableSounds?: boolean
): void;

declare function reloadTooltips(): void;

declare function unixCountdownString(unixString: string): string;

declare function escapeHtml(text: string): string;

declare function docReady(fn: () => any): void;

declare function logout(): void;

declare const sounds: {
  newCall: HTMLAudioElement;
  finishMission: HTMLAudioElement;
  radioFMS: HTMLAudioElement;
  fms5: HTMLAudioElement;
  error: HTMLAudioElement;
  chatMessage: HTMLAudioElement;
};
