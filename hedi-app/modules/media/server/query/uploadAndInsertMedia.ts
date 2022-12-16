import { NextApiRequest } from "next";
import fs from "fs";
import { IAuthHeader } from "@/modules/auth/types";
import { IMediaMutationResult } from "../../types";
import { insertMedia } from "../query/insertMedia";
import {
  extractPostedData,
  ISavedFileInfo,
  getSafeFilename,
  saveBufferToDisk,
  getMediaType,
  getRelativePath,
} from "../query/multipart";

export const uploadAndInsertMedia = async (
  req: NextApiRequest,
  authHeader: IAuthHeader
): Promise<IMediaMutationResult[] | null> => {
  const {
    files,
    lang,
    label,
    description,
    uuid,
    ...rest
  } = await extractPostedData(req, true);
  const uploadedItems = [] as ISavedFileInfo[];
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid)
  )
    return [
      {
        success: false,
        errors: {
          general: "invalid uuid",
        },
      },
    ];
  if (!files || !files.length) {
    return [];
  }
  const userFoldername = getSafeFilename(uuid);
  const uploadsFolder = getRelativePath(`${process.env.CMS_UPLOAD_PATH}`);
  if (!fs.existsSync(uploadsFolder)) {
    return [
      {
        success: false,
        errors: {
          general: "no upload target",
        },
      },
    ];
  }
  for (let fileItem of files) {
    const { fieldname, originalname } = fileItem;
    const saveResult = saveBufferToDisk(
      fileItem.content,
      getRelativePath(`${process.env.CMS_UPLOAD_PATH}`, userFoldername),
      `${originalname}`
    );

    uploadedItems.push({
      fieldname,
      originalname,
      savedAsFilename: saveResult.savedAsFilename,
      error: saveResult.error,
    });
  }
  const succeededItems = uploadedItems.filter(item => !item.error);
  const mediaInput = succeededItems.map(item => ({
    filename: userFoldername + "/" + item.savedAsFilename,
    label,
    description,
    mediatype: getMediaType(item.savedAsFilename as string),
  }));
  const result = await insertMedia(authHeader, mediaInput, lang);
  return result;
};
