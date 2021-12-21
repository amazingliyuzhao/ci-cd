import Axios, { AxiosResponse } from 'axios';

export class UploadReq {
  static baseDomain: string = 'http://0.0.0.0:7003';
  get baseDomain() {
    // return 'http://39.107.15.62:7001';
    return 'http://0.0.0.0:7003';
  }

  static UploadFont(fontFile: File) {
    return Axios.post<string>('/font-compression/upload', fontFile, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static CreateFont(fontName: string, text: string) {
    return Axios.get<File>(`${this.baseDomain}/font/create?fontName=${fontName}&text=${text}`);
  }

  static GetFontsList() {
    return Axios.get<string[]>(`${this.baseDomain}/font/list`);
  }

  static selectFonts(fontName: string, text: string) {
    return Axios.post<string>(`${this.baseDomain}/font/selectFont`, {
      fontName,
      text,
    }, {
      responseType: 'arraybuffer',
      headers: {
        // Accept: '*/*',
      },
    });
  }
}
