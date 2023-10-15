import { Data, Response } from "..";

export class BackendUtils {
  static readonly url: string = import.meta.env.VITE_BACKEND_URL + "/";

  static async get(path: string, body?: any): Promise<Response | Data<any>> {
    try {
      let res;
      if (body) {
        res = await fetch(BackendUtils.url + path, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else res = await fetch(BackendUtils.url + path);
      const rep = await res.json();
      return rep;
    } catch (error) {
      console.error(error);
      return { error: "Backend did not enjoy that" } as Response;
    }
  }

  static async post(path: string, body: any): Promise<Response | Data<any>> {
    try {
      const res = await fetch(BackendUtils.url + path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const rep = await res.json();
      return rep;
    } catch (error) {
      console.error(error);
      return { error: "Backend did not enjoy that" } as Response;
    }
  }
}
