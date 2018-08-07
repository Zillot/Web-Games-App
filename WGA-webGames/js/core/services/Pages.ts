module WGAAppModule {
    'use strict';

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

        public Update(timeDelta) {
            this.currentPage.Update(timeDelta);
            this.pageTransition.Update(timeDelta);
        }

        public Draw() {
            this.currentPage.Draw();
            this.pageTransition.Draw();
        }

        public CreatePage(pageName: string, page: Page) {
            this.pages[pageName] = page;
        }

        public NavigateTo(pageName: string) {
            var selectedPage = this.pages[pageName];
            if (selectedPage == null) {
                console.error("page with that name not found");
            }
            else {
                this.navigateToPage(selectedPage, true);
            }
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
                    this.pageTransition.NavigateFromStart(() => { });
                });

                if (history) {
                    this.history.push(page);
                }
            }
        }
    }
}