export default class Storage {
    constructor(
        storageName = 'gameBoard',
         initialValue = { 
             computer: { wins: 0, losses: 0 },
              human: { wins: 0, losses: 0 } 
            }) {
        this.storageName = storageName;

        if (!localStorage.getItem(storageName)) {
            localStorage.setItem(storageName, JSON.stringify(initialValue));
        }
    }

    get() {
        return JSON.parse(localStorage.getItem(this.storageName));
    }

    update(data) {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    };
}
