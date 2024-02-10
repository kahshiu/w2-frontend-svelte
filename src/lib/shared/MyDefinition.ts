import type { DefinitionStore } from "./dto/DefinitionDto";

export class MyDefinition {
    store: DefinitionStore;

    constructor(store: DefinitionStore) {
        this.store = store;
    }

    findEntry = (storeKey: keyof DefinitionStore, value: number) => {
        const dtoArr = this.store[storeKey] ?? [];
        const obj = dtoArr.find((i) => i.code === value);
        if (obj === undefined) return "unknown";
        return obj.label
    }

    mapEntry = (storeKey: keyof DefinitionStore) => {
        const dtoArr = this.store[storeKey] ?? [];
        return dtoArr; 
    }
}