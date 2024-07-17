import { RequestMethod, State } from "@data/enums";
import { eraseCookie, getCookie } from "@api_functions/internal/cookie";
import { showOkPopup } from "@components/notifications/Popup";
import { showSnackBar } from "@components/notifications/Snackbar";
import { ApiExecutionStatus, ApiResult, Base64 } from "@data/types";
import devLog from "@helper_functions/devLog";
import { openInNewTab } from "@helper_functions/newTab";
import { AUTH_API_URL, CUSTOMER_API_URL } from "@data/api";

export async function fetchAPIProtected<T>({
  url,
  method,
  body,
  snackbar = false,
  baseUrl,
  handleErrors = true,
}: {
  url: string;
  method: RequestMethod;
  body?: any;
  snackbar?: boolean;
  baseUrl?: string;
  handleErrors?: boolean;
}): Promise<ApiExecutionStatus<T>> {
  try {
    const token = getCookie("user-token");
    if (token != null) {
      const res = await fetch(
        `${baseUrl ? baseUrl : CUSTOMER_API_URL}/${url}`,
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
      return handleErrors
        ? await handleApiError<T>(res, data, snackbar)
        : {
            data: data.data ? data.data : null,
            status: true,
          };
    } else {
      if (handleErrors) {
        showSnackBar({
          state: State.ERROR,
          message: "Please sign in again, your session has expired.",
        });
        //get the current relative url
        const redirectUrl = window.location.pathname + window.location.search;
        console.log("redirectUrl", redirectUrl);
        window.location.href = "/user/sign-in" + "?redirectUrl=" + redirectUrl;
        return {
          data: null,
          status: false,
        };
      } else {
        return {
          data: null,
          status: false,
        };
      }
    }
  } catch (error) {
    devLog("error", error);
    // router.push("/user/sign-in");
    if (handleErrors) {
      await showOkPopup({
        title: "Error",
        message: "Something went wrong. Please try logging in again.",
      });
      window.location.href = "/user/sign-in";
    }
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
  handleErrors = true,
}: {
  url: string;
  method: RequestMethod;
  body?: any;
  snackbar?: boolean;
  baseUrl?: string;
  handleErrors?: boolean;
}): Promise<ApiExecutionStatus<T>> {
  try {
    if (checkInternetConnection() === false) {
      showSnackBar({
        state: State.ERROR,
        message: "Please check your internet connection.",
      });
      return {
        data: null,
        status: false,
      };
    }
    const res = await fetch(`${baseUrl ? baseUrl : AUTH_API_URL}/${url}`, {
      method: RequestMethod[method],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: ApiResult<T> = await res.json();
    return handleErrors
      ? await handleApiError<T>(res, data, snackbar)
      : {
          data: data.data ? data.data : null,
          status: true,
        };
  } catch (error) {
    console.log("error", error);
    if (handleErrors) {
      await showOkPopup({
        title: "Error",
        message: "Something went wrong. Please try logging in again.",
      });
      window.location.href = "/user/sign-in";
    }
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

export function checkInternetConnection(): boolean {
  try {
    return navigator.onLine;
  } catch (error) {
    return false;
  }
}

async function handleApiError<T>(
  res: Response,
  data: ApiResult<T>,
  snackbar: boolean
): Promise<ApiExecutionStatus<T>> {
  if (res.status === 200) {
    devLog("data", data.status.message);
    if (data.errorMessage) {
      showOkPopup({
        title: "Maintenance",
        message: "Our servers are down. Please try again later.",
      }).then(() => {
        // router.push("/");
        window.location.href = "/";
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
      title: "Error",
      message: data.status.message,
    });
    if (data.status.redirectUrl) {
      // router.push(data.status.redirectUrl);
      window.location.href = data.status.redirectUrl;
    } else {
      // router.push("/user/sign-in" + "?redirectUrl=" + router.asPath);
      window.location.href =
        "/user/sign-in" + "?redirectUrl=" + window.location.href;
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
    eraseCookie("user-token");
    // router.push("/user/sign-in");
    window.location.href = "/user/sign-in";
    return {
      data: null,
      status: false,
    };
  } else if (res.status === 400) {
    showSnackBar({
      message: data.status.message,
      state: State.ERROR,
    });
    if (data.status.redirectUrl) {
      window.location.href = data.status.redirectUrl;
    }
    return {
      data: null,
      status: false,
    };
  } else if (res.status === 500) {
    console.log("error", data.errorMessage);
    throw new Error("Something went wrong");
  } else if (res.status === 403) {
    if (data.status.redirectUrl) {
      // window.open(data.status.redirectUrl, "_blank");
      openInNewTab(data.status.redirectUrl);
    }
    return {
      data: null,
      status: false,
    };
  } else {
    // devLog("error", data);
    throw new Error("Something went wrong");
  }
}
