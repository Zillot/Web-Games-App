class MainMenu {
    //page

    constructor() {
        this.page = new MainPage();
    }

    update(timeDelta) {
        this.page.update(timeDelta);
    }

    draw(ctx) {
        this.page.draw(ctx);
    }
}