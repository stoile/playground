interface IStartup {
    main(): number
}

class Startup implements IStartup {
    public main(): number {
        console.log("Hello World")
        return 0
    }
}

new Startup().main()