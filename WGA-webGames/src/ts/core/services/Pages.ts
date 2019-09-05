import { Page } from "../abstracts/Page";
import { PageTransitionController } from "../PageTransitionController";

export class Pages {
    private pages: Page[];
    private history: Page[];

    private currentPage: Page;

    private pageTransition: PageTransitionController;

    constructor() {
        this.pages = [];
        this.history = [];

        this.pageTransition = new PageTransitionController();
    }

    public Update(timeDelta: number) {
        if (this.currentPage) {
            this.currentPage.Update(timeDelta);
        }
        this.pageTransition.Update(timeDelta);
    }

    public Draw() {
        if (this.currentPage) {
            this.currentPage.Draw();
        }
        this.pageTransition.Draw();
    }

    public CreatePage(pageName: string, page: Page) {
        this.pages[pageName] = page;
    }

    public InstantNavigateTo(pageName: string) {
        this.pageTransition.PrepareToInstantNavigating();
        this.navigateToPage(this.pages[pageName], true);
    }

    public NavigateTo(pageName: string) {
        this.navigateToPage(this.pages[pageName], true);
    }

    public GoBack() {
        if (this.history.length == 0) {
            console.error("history empty");
            return;
        }
            
        var lastPage = this.history.pop();
        this.navigateToPage(lastPage, false);
    }

    ////
    private navigateToPage(page: Page, history: boolean) {
        if (page == null) {
            console.error("page with that name not found");
        }
        else {
            this.pageTransition.NavigateToStart(() => {
                this.currentPage = page;
                this.currentPage.Init();
                this.pageTransition.NavigateFromStart(() => { });
            });

            if (history) {
                this.history.push(page);
            }
        }
    }
}