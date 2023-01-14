import { apiGet, apiPost } from '../../ts/helper/api';
import { sleep } from '../../ts/helper/general';
import { UserBuildings } from '../../types/api/UserBuildings';

const hireMultiplePersonal = async function (): Promise<any> {
  const showHire = async function (): Promise<boolean> {
    const userBuildings = (await apiGet(
      'userBuildings',
      localStorage
    )) as unknown as UserBuildings[];
    const userBuildingID = parseInt(
      document
        .querySelector('div.detail-header div.detail-title')
        ?.getAttribute('userdepartmentid') ?? '0'
    );
    const userBuilding = userBuildings.find(
      e => e.userBuildingID === userBuildingID
    );
    return userBuilding?.personalCount !== 0;
  };

  if (await showHire()) {
    const buyButton = document
      .querySelectorAll('div.detail-panel tr')[1]
      .querySelectorAll('td div.flex div.building-hire .button-danger')[1];
    const buyButtonDuplicate = buyButton?.cloneNode(true);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    inputContainer.style.margin = '0 .5rem';
    inputContainer.id = 'personalBuyContainer';

    const inputContent = document.createElement('div');
    inputContent.classList.add('input-content');
    inputContent.style.margin = '0';

    const inputLabel = document.createElement('div');
    inputLabel.classList.add('input-label');
    inputLabel.textContent = 'Zu kaufendes Personal';

    const inputElem = document.createElement('input');
    inputElem.id = 'multiplePersonalBuyCount';
    inputElem.type = 'number';
    inputElem.value = '1';
    inputElem.classList.add('input-round');
    inputElem.min = '1';

    const inputIconContainer = document.createElement('div');
    inputIconContainer.classList.add('input-icon');
    const inputIcon = document.createElement('i');
    inputIcon.classList.add('fas', 'fa-users');
    inputIconContainer.insertAdjacentElement('afterbegin', inputIcon);

    inputContent.insertAdjacentElement('beforeend', inputElem);
    inputContent.insertAdjacentElement('beforeend', inputIconContainer);
    // inputContainer.insertAdjacentElement('beforeend', inputLabel);
    inputContainer.insertAdjacentElement('beforeend', inputContent);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    buyButton.parentElement!.style.height = 'fit-content';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    buyButton.parentElement!.parentElement!.querySelector(
      'span'
    )!.style.height = 'fit-content';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    buyButton.parentElement!.parentElement!.style.cssText =
      'align-items: center';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    buyButton.parentElement!.insertAdjacentElement('afterend', inputContainer);

    buyButtonDuplicate?.addEventListener('click', async () => {
      let confirm = true;
      await modal(
        'Personal kaufen?',
        'Bist du dir sicher, das du dir Personal für Marken kaufen möchtest? Das kaufen von mehrfachem Personal kann einige Zeit dauern. Bitte brich den Vorgang nicht ab!',
        'Kaufen',
        'Abbrechen',
        () => {
          confirm = true;
        },
        () => {
          confirm = false;
        }
      );
      if (!confirm) return;

      const inputElem: HTMLInputElement | null = document.querySelector(
        'input#multiplePersonalBuyCount'
      );
      let buyCount = parseInt(inputElem?.value ?? '0');
      const userBuildingID = parseInt(
        document
          .querySelector('div.detail-header div.detail-title')
          ?.getAttribute('userdepartmentid') ?? '0'
      );
      while (buyCount > 0) {
        (await apiPost('hire', {
          userDepartmentID: userBuildingID.toString(),
          hire: 'instant'
        })) as unknown as {
          status: string;
          data: {
            userPersonalID: number;
            name: string;
            lastname: string;
          };
        };

        await sleep(100);
        buyCount--;
      }

      noticeModal(
        'Personalkauf abgeschlossen',
        'Das gewünschte Personal ist auf der Wache eingetroffen',
        'Schließen',
        () => {
          window.location.reload();
        }
      );
    });
    buyButton?.replaceWith(buyButtonDuplicate ?? '');
    document
      .querySelectorAll('div.detail-panel tr')[1]
      .querySelectorAll('td div.flex div.building-hire .button-danger')[1]
      .setAttribute('hire', 'undefined');
    document
      .querySelector('#personalBuyContainer')
      ?.addEventListener('input', e => {
        // @ts-expect-error Value exists as property value
        const value = e.target?.value;
        document
          .querySelectorAll('div.detail-panel tr')[1]
          .querySelectorAll(
            'td div.flex div.building-hire .button-danger'
          )[1].innerHTML = `${value.toString()} <i class='fas fa-ticket-alt'></i> Kaufen`;
      });
  }
};

export { hireMultiplePersonal };
