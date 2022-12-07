import { uploadAPI } from "@/modules/media/server";

export default uploadAPI;

export const config = {
  api: {
    bodyParser: false,
  },
};
