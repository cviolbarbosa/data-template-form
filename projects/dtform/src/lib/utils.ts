

export function getObjectById(objArray: any[], id: string | number){
    const r  = objArray.filter(e => e.id == id);
    if (r.length) return r[0];
    return null;
}


export function getObjectByKey(objArray: any[], id: string | number){
    const r  = objArray.filter(e => e.key == id);
    if (r.length) return r[0];
    return null;
}

export function getIndexById(objArray: any[], id: string | number){
    const ids  = objArray.map(e => e.id) ;
    return ids.indexOf(id);
}


export function deleteObjectByIdAndMutateArray(objArray: any[], id: string | number) {
        const reverseIndex: Array<number> = [];
        const removedIndex: Array<number> = [];

        if (objArray.length > 0) {
            for (let i = objArray.length; i > 0; i--) { reverseIndex.push(i - 1); }

            for (const index of reverseIndex) {
                if (objArray[index].id === id) {
                    objArray.splice(index, 1);
                    removedIndex.push(index);
                }
            }
        }
        return removedIndex;
    }


    export function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '_')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '_')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }