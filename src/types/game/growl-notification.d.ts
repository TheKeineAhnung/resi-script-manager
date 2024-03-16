interface GrowlNotificationLib {
  notify: ({
    title,
    description,
    type,
    position,
    closeTimeout,
    showProgress
  }: {
    title: string;
    description: string;
    type: string;
    position: string;
    closeTimeout: number;
    showProgress: boolean;
  }) => void;
}

declare const GrowlNotification: GrowlNotificationLib;
