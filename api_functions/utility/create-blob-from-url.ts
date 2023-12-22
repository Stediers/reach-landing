import devLog from "@helper_functions/devLog";

export async function createBlobfromUrl({
  url,
  name,
}: {
  url: string;
  name: string;
}): Promise<File> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob: Blob = xhr.response;
        devLog("blob", blob);
        const file = new File([blob], name, { type: blob.type });
        resolve(file);
      } else {
        reject(new Error("Something went wrong"));
      }
    };
    xhr.send();
  });
}
