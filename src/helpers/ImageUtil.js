import axios from "axios";
import { server_api } from "../env.config";

class ImageUtil {
  static async updatePhoto(file) {
    /* Get upload url from s3 bucket */
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("bbbbbbbbbbbbbbbbbb");
    console.log(`${server_api}s3url`);
    console.log(file);

    const uploadUrl = (await axios.get(`${server_api}s3url`)).data.uploadUrl;

    /* Upload image to s3 */
    const {
      config: { url },
      // Is the "server_api" required to go to server, or it is a pure s3 bucket url?
    } = await axios.put(`${uploadUrl}`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    /* Save stored url to file user */
    const fileUrl = url.split("?")[0];
    const data = { url: fileUrl };
    axios.put(`${server_api}user/photo`, data);
    return fileUrl;
  }
}

export default ImageUtil;
