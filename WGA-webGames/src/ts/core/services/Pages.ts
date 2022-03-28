import { Injectable } from '@angular/core';
import { Page } from "../abstracts/Page";
import { PageTransitionController } from "../PageTransitionController";
import { Draw } from './Draw';

@Injectable()
export class Pages {
    public static I: Pages;
    public static _initialize = (() => {
        Pages.I = new Pages();
    })();

    private static pages: Page[];
    private static history: Page[];

    private static currentPage: Page;

    private static pageTransition: PageTransitionController;

    constructor() {
        this.Reset();
    }

    public Reset() {
        Pages.pages = [];
        Pages.history = [];

        Pages.pageTransition = new PageTransitionController();
    }

    public Update(timeDelta: number) {
        if (Pages.currentPage) {
            Pages.currentPage.Update(timeDelta);
        }
        Pages.pageTransition.Update(timeDelta);
    }

    public Draw(draw: Draw) {
        if (Pages.currentPage) {
            Pages.currentPage.Draw();
        }
        Pages.pageTransition.Draw(draw);
    }

    public CreatePage(pageName: string, page: Page) {
        Pages.pages[pageName] = page;
    }

    public InstantNavigateTo(pageName: string) {
        Pages.pageTransition.PrepareToInstantNavigating();
        this.navigateToPage(Pages.pages[pageName], true);
    }

    public NavigateTo(pageName: string) {
        this.navigateToPage(Pages.pages[pageName], true);
    }

    public GoBack() {
        if (Pages.history.length == 0) {
            console.error("history empty");
            return;
        }
            
        var lastPage = Pages.history.pop();
        this.navigateToPage(lastPage, false);
    }

    ////
    private navigateToPage(page: Page, history: boolean) {
        if (page == null) {
            console.error("page with that name not found");
        }
        else {
            Pages.pageTransition.NavigateToStart(() => {
                if (Pages.currentPage != null) {
                    Pages.currentPage.HideAllModals(true);
                    Pages.currentPage.Dispose();
                }

                Pages.currentPage = page;
                Pages.currentPage.Init();
                Pages.pageTransition.NavigateFromStart(() => { });
            });

            if (history) {
                Pages.history.push(page);
            }
        }
    }
}
