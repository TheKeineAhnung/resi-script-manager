interface LibGrowlNotification {
  notify: (options: {
    title: string;
    description: string;
    type: string;
    position?: string;
    showProgress?: boolean;
    closeTimeout?: number;
  }) => {
    body: object;
    notification: object;
    options: object;
    position: object;
    template: string;
  };
}

declare const GrowlNotification: LibGrowlNotification;
