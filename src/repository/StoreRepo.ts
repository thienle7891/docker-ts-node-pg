import { Store } from "../model/Store";

interface StoreRepoType {
  save: (store: Store) => Promise<void>;
  update: (store: Store) => Promise<void>;
  delete: (storeId: number) => Promise<void>;
  retrieveById(storeId: number): Promise<Store>;
  retrieveAll(): Promise<Store[]>;
}

export class StoreRepo implements StoreRepoType {
  async save(store: Store): Promise<void> {
    try {
      const { store_name: storeName } = store;
      const newStore = new Store();
      newStore.store_name = storeName;
      newStore.user_ids = [];
      await newStore.save();
    } catch (error) {
      throw new Error("Error saving user");
    }
  }

  async update(store: Store): Promise<void> {
    try {
      const newStore = await Store.findOne({
        where: {
          store_id: store.store_id,
        },
      });
      if (!newStore) {
        throw new Error("Note not found!");
      }
      newStore.store_name = store.store_name;

      await newStore.save();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async delete(storeId: number): Promise<void> {
    try {
      const delStore = await Store.findOne({
        where: {
          store_id: storeId,
        },
      });
      if (!delStore) {
        throw new Error("Note not found!");
      }

      await delStore.remove();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async retrieveById(storeId: number): Promise<Store> {
    try {
      const store = await Store.findOne({
        where: {
          store_id: storeId,
        },
      });
      if (!store) {
        throw new Error("Note not found!");
      }
      return store;
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async retrieveAll(): Promise<Store[]> {
    try {
      return await Store.find();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
}
