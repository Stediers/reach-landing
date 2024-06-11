import { convertFileToBase64 } from "@api_functions/internal/base-functions";
import { showSnackBar } from "@components/notifications/Snackbar";
import { S3BucketName, State } from "@data/enums";
import { Base64 } from "@data/types";
import devLog from "@helper_functions/devLog";
import AWS from "aws-sdk";

// export default async function UploadImageToS3({
//   file,
//   name,
//   bucketName,
// }: {
//   file: Base64;
//   name: string;
//   bucketName: S3BucketName;
// }): Promise<string> {
//   devLog(
//     "uploadImageToS3",
//     process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
//   );

//   const base64Data = Buffer.from(
//     file.toString().replace(/^data:image\/\w+;base64,/, ""),
//     "base64"
//   );

//   const s3 = new AWS.S3({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//     region: "ap-south-1",
//   });

//   const res = (
//     await s3
//       .upload({
//         Bucket: bucketName,
//         Key: name,
//         Body: base64Data,
//         ACL: "public-read",
//         ContentType: "image/jpeg",
//       })
//       .promise()
//   ).Location;

//   devLog("res", res);

//   return res;

//   //   return new Promise((resolve, reject) => {
//   //     const params = {
//   //       ACL: "public-read",
//   //       Bucket: bucketName,
//   //       Key: name,
//   //       ContentType: file.type,
//   //       Body: file,
//   //     };
//   //     s3.upload(params, (err: any, data: any) => {
//   //       if (err) {
//   //         reject(err);
//   //       }
//   //       resolve(data);
//   //     });
//   //   });
// }

export default async function uploadFileS3({
  fileName,
  file,
  bucketName,
}: {
  fileName: string;
  file: File;
  bucketName: S3BucketName;
}): Promise<string | null> {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1",
  });

  devLog(file.type);

  const imageFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const videoFileTypes = ["video/mp4", "video/webm"];

  if (
    !imageFileTypes.includes(file.type) &&
    !videoFileTypes.includes(file.type)
  ) {
    showSnackBar({
      message: `Invalid file type: ${file.type}`,
      state: State.ERROR,
    });
    return null;
  }

  const finalFileName = `${fileName}.${file.type.split("/")[1]}`;
  devLog("finalFileName", finalFileName);

  //upload blob to s3
  const url = (
    await s3
      .upload({
        Bucket: bucketName,
        Key: finalFileName,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
      })
      .promise()
  ).Location;

  return url;
}

export const uploadFiletoS3WithProgress = ({
  file,
  fileName,
  bucketName,
  onProgress,
  onErr,
}: {
  file: File;
  fileName: string;
  bucketName: S3BucketName;
  onProgress: (progress: number) => void;
  onErr?: (err: any) => void;
}): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: "ap-south-1",
    });

    const imageFileTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    const videoFileTypes = ["video/mp4", "video/webm"];

    if (
      !imageFileTypes.includes(file.type) &&
      !videoFileTypes.includes(file.type)
    ) {
      showSnackBar({
        message: `Invalid file type: ${file.type}`,
        state: State.ERROR,
      });
      return;
    }

    const finalFileName = `${fileName}.${file.type.split("/")[1]}`;
    devLog("finalFileName", finalFileName);

    //upload blob to s3
    const upload = s3.upload({
      Bucket: bucketName,
      Key: finalFileName,
      Body: file,
      ACL: "public-read",
      ContentType: file.type,
    });

    upload.on("httpUploadProgress", (progress) => {
      const percentage = Math.round((progress.loaded / progress.total) * 100);
      if (percentage % 10 === 0 && percentage !== 0) {
        devLog("percentage", percentage);
        onProgress(percentage);
      }
    });

    upload.send((err, data) => {
      if (err) {
        onErr && onErr(err);
        resolve(null);
      }
      resolve(data.Location);
    });
  });
};
