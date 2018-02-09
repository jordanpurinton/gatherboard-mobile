export class OpenNativeSettingsMock {
  open(str) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
