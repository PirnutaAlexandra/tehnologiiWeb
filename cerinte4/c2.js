class Software{
    constructor(name){
        this.name = name;
    }

    run(){
        console.log(`${this.name} is running`);
    }
}

const s0 =  new Software('softwear1');
s0.run();

class Plugin{
    constructor(name){
        this.name = name;
    }
}
const p0 = new Plugin('plugin1');

class Browser extends Software{
    constructor(name){
        super(name);
        this.plugins = [];
    }

    addPluggin(p){
        this.plugins.push(p);
    }

}
const b1 = new Browser('browser1');
b1.addPluggin(p0);
b1.run();