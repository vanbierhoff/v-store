
export class StoreInstanceBuilder {


    protected configuration: any

    protected isPrimitive: boolean = false;

    protected args: any[];


    public createPrimitiveStore() {
        this.isPrimitive = true;
        return this;
    }

    public createCombineStore() {
        this.isPrimitive = true;
        return this;
    }

    public setArgs(args?: any[]) {
        if (args) {
            this.args = args;
        }
    }

}

