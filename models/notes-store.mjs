var _NotesStore;
export async function useModel(model) {
    try {
        console.log("Storage Model: " + `./notes-${model}.mjs`);
        let NotesStoreModule = await import(`./notes-${model}.mjs`);
        let NotesStoreClass = NotesStoreModule.default;
        _NotesStore = new NotesStoreClass();
        return _NotesStore;
    } catch (err) {
        throw new Error(`No recognizable NotesStore in ${model} because ${err}`);
    }
}

export { _NotesStore as NotesStore };
