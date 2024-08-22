import devLog from "@helper_functions/devLog";

export async function createBlobfromUrl({
  url,
}: {
  url: string;
}): Promise<File> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.open("GET", url + "?t=" + new Date().getTime(), true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const name = url.split("/").pop() || "image";
        const blob: Blob = xhr.response;
        const file = new File([blob], name, { type: blob.type });
        resolve(file);
      } else {
        reject(new Error("Something went wrong"));
      }
    };
    xhr.send();
  });
}
