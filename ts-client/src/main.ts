interface IStartup {
    main(): number
}

class Startup implements IStartup {
    public main(): number {
        // tslint:disable-next-line:no-console
        console.log("Hello World")
        return 0
    }
}

new Startup().main()
