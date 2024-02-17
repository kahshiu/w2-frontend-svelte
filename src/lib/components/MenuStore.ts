import { writable } from "svelte/store";

// SECTION: store
type Menu<Name extends string[]> = {
  [K in Name[number]]: boolean;
};

export const MenuStore = (menuNames: string[]) => {
  const baseObj: Menu<typeof menuNames> = menuNames.reduce((accumulated, name) => {
    return { ...accumulated, [name]: false };
  }, {});

  const { subscribe, set, update } = writable(baseObj);
  return {
    subscribe,
    reset: function () {
      set(baseObj);
    },
    toggleName: function (name: string) {
      return update((currObj) => {
        const flag = currObj[name];
        return { ...baseObj, [name]: !flag };
      });
    }
  };
};

// SECTION: consumer
interface IMenuOptions {
  menuItemName: string;
  menuStore: ReturnType<typeof MenuStore>;
}

export const useMenu = (node: HTMLElement, options: IMenuOptions) => {
  const { menuItemName, menuStore } = options;
  const localToggler = () => {
    console.log('clicked');
    menuStore.toggleName(menuItemName);
  };
  node.addEventListener('click', localToggler);

  return {
    destroy() {
      node.removeEventListener('click', localToggler);
    }
  };
};