import { RequestMethod, State } from "@data/enums";
import router from "next/router";
import { getCookie } from "@api_functions/internal/cookie";
import { showOkPopup } from "@components/notifications/Popup";
import { showSnackBar } from "@components/notifications/Snackbar";
import { ApiExecutionStatus, ApiResult, Base64 } from "@data/types";
import devLog from "@helper_functions/devLog";

export async function fetchAPIProtected<T>({
  url,
  method,
  body,
  snackbar = false,
  baseUrl,
}: {
  url: string;
  method: RequestMethod;
  body?: any;
  snackbar?: boolean;
  baseUrl?: string;
}): Promise<ApiExecutionStatus<T>> {
  try {
    const token = getCookie("gig-token");
    if (token != null) {
      const res = await fetch(
        `${baseUrl ? baseUrl : process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`,
        {
          method: RequestMethod[method],
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(body),
        }
      );
      const data: ApiResult<T> = await res.json();
      if (res.status === 200) {
        // devLog("data", data.status.message);
        if (data.errorMessage) {
          showOkPopup({
            title: "Maintenance",
            message: "Our servers are down. Please try again later.",
          }).then(() => {
            router.push("/");
          });
          return {
            data: null,
            status: false,
          };
        }
        if (snackbar) {
          showSnackBar({
            message: data.status.message,
            state: State.SUCCESS,
          });
        }
        return {
          data: data.data ? data.data : null,
          status: true,
        };
      } else if (res.status === 402) {
        await showOkPopup({
          title: "Whoops!",
          message: data.status.message,
        });
        if (data.status.redirectUrl) {
          router.push(data.status.redirectUrl);
        } else {
          router.push("/user/sign-in" + "?redirectUrl=" + router.asPath);
        }
        return {
          data: null,
          status: false,
        };
      } else if (res.status === 401) {
        showSnackBar({
          state: State.ERROR,
          message: "Please sign in again, your session has expired.",
        });
        router.push("/user/sign-in");
        return {
          data: null,
          status: false,
        };
      } else if (res.status === 400) {
        showSnackBar({
          message: data.status.message,
          state: State.ERROR,
        });
        return {
          data: null,
          status: false,
        };
      } else if (res.status === 500) {
        devLog("error 500", data.errorMessage);
        throw new Error("Something went wrong");
      } else {
        // devLog("error", data);
        throw new Error("Something went wrong");
      }
    } else {
      showSnackBar({
        state: State.ERROR,
        message: "Please sign in again, your session has expired.",
      });
      router.push("/user/sign-in");
      return {
        data: null,
        status: false,
      };
    }
  } catch (error) {
    // devLog("error", error);
    await showOkPopup({
      title: "Sorry",
      message: "Our servers are down. Please try again later.",
    });
    router.push("/user/sign-in");
  }
  return {
    data: null,
    status: false,
  };
}

export async function fetchAPIPublic<T>({
  url,
  method,
  body,
  snackbar = false,
  baseUrl,
}: {
  url: string;
  method: RequestMethod;
  body?: any;
  snackbar?: boolean;
  baseUrl?: string;
}): Promise<ApiExecutionStatus<T>> {
  try {
    const res = await fetch(
      `${baseUrl ? baseUrl : process.env.NEXT_PUBLIC_AUTH_API_URL}/${url}`,
      {
        method: RequestMethod[method],
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data: ApiResult<T> = await res.json();
    if (res.status === 200) {
      if (data.errorMessage) {
        return {
          data: null,
          status: false,
        };
      }
      if (snackbar) {
        showSnackBar({
          message: data.status.message,
          state: State.SUCCESS,
        });
      }
      return {
        data: data.data ? data.data : null,
        status: true,
      };
    } else if (res.status === 402) {
      await showOkPopup({
        title: "Error",
        message: data.status.message,
      });
      if (data.status.redirectUrl) {
        router.push(data.status.redirectUrl);
      } else {
        if (router.asPath === "/user/sign-in") router.reload();
        router.push("/user/sign-in");
      }
      return {
        data: null,
        status: false,
      };
    } else if (res.status === 401) {
      await showOkPopup({
        title: "Unauthorized",
        message: data.status.message,
      });
      if (router.asPath === "/user/sign-in") router.reload();
      router.push("/user/sign-in");
      return {
        data: null,
        status: false,
      };
    } else if (res.status === 400) {
      showSnackBar({
        message: data.status.message,
        state: State.ERROR,
      });
      return {
        data: null,
        status: false,
      };
    } else {
      // devLog("error", data);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // devLog("error", error);
    await showOkPopup({
      title: "Error",
      message: "Our servers are down. Please try again later.",
    });
    if (router.asPath === "/user/sign-in") router.reload();
    router.push("/user/sign-in");
  }
  return {
    data: null,
    status: false,
  };
}

export async function convertFileToBase64(file: File): Promise<Base64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as Base64);
    reader.onerror = (error) => reject(error);
  });
}

export async function convertBase64ToFile(
  base64: Base64,
  fileName: string
): Promise<File> {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], fileName);
}

export async function convertUrlToFile(
  url: string,
  fileName: string
): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, {
    type:
      res.headers.get("Content-Type") !== null
        ? res.headers.get("Content-Type")!!
        : undefined,
  });
}
