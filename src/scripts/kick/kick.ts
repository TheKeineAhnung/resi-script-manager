const kick = async function (): Promise<any> {
  /*
   * Copyright (c) 2022 by Ron31
   * kick
   * Script for the browser-side of the rettungssimulator.online
   * Script Version: 0.1
   * Last Update: 2024-04-18
   */

  const doNotKick = ['KeineAhnung', 'TutePlays', 'DispoOhnePlan', 'Ron31'];

  const kickName = (name: string) => {
    callApi(
      'api/manageAssociationUser',
      {
        action: 'kick',
        managedUserName: name
      },
      () => {
        document.querySelector('tr[username="' + name + '"]')?.remove();
      }
    );
  };

  const kickAllInactive = () => {
    let counter = 0;
    const rows = document.querySelectorAll(
      '#tab_associationMembers .toplistTr .toplist-absent'
    );

    rows.forEach(row => {
      const tr = row.parentElement;
      const name = tr?.getAttribute('username') ?? '';
      if (name === '' || doNotKick.includes(name)) return;
      setTimeout(() => {
        kickName(name);
      }, counter * 1000);
      counter++;
    });
    noticeModal(
      'Inaktive werden gekickt!',
      counter + ' Inaktive werden gerade gekickt.'
    );
  };

  const ownRow = document.querySelector(
    '#tab_associationMembers .toplistTr[username="' + ReSi.userName + '"]'
  );
  const admin = ownRow?.querySelector('span.label')?.textContent === 'Admin';

  const kickAllInactiveButton = document.createElement('button');
  kickAllInactiveButton.innerHTML =
    '<i class="fa-solid fa-user-minus"></i> Inaktive kicken';
  kickAllInactiveButton.classList.add(
    'button',
    'button-success',
    'button-small',
    'button-round'
  );
  kickAllInactiveButton.addEventListener('click', kickAllInactive);

  if (admin) {
    const headline = document.querySelector(
      '#tab_associationMembers .card:nth-of-type(4) .card-headline'
    );
    if (headline === null) return;
    headline.setAttribute(
      'style',
      'display: flex; align-items: center; justify-content: space-between;'
    );
    headline.insertAdjacentElement('beforeend', kickAllInactiveButton);
  }
};

export { kick };
