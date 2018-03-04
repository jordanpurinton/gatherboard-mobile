export class StatusBarMock {
    styleDefault() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    overlaysWebView(overlay) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

