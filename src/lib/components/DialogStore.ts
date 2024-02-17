interface IModalOptions {
  targetId: string;
}

export const useDialogOpen = (el: HTMLElement, options: IModalOptions) => {
  const elDiag = document.getElementById(options.targetId) as HTMLDialogElement;
  const openHandler = () => {
    elDiag.showModal();
  };
  el.addEventListener('click', openHandler);
  return {
    destroy() {
      el.removeEventListener('click', openHandler);
    }
  };
};

export const useDialogClose = (el: HTMLElement, options: IModalOptions) => {
  const elDiag = document.getElementById(options.targetId) as HTMLDialogElement;
  const closeHandler = () => {
    elDiag.close();
  };
  el.addEventListener('click', closeHandler);
  return {
    destroy() {
      el.removeEventListener('click', closeHandler);
    }
  };
};