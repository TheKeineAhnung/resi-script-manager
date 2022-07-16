const hideFreeText = async function (): Promise<any> {
  const container: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    'div.input-container'
  );

  // eslint-disable-next-line unicorn/prefer-at
  container[container.length - 1].style.display = 'none';
};

export { hideFreeText };
