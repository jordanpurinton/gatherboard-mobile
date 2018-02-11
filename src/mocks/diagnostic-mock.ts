export class DiagnosticMock {
  isLocationAvailable() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
