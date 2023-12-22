import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";

export default function verifyPoint({
  point,
  array,
}: {
  point: string;
  array: string[];
}): boolean {
  if (array.includes(point)) {
    showSnackBar({
      message: "Point is already added",
      state: State.ERROR,
    });
    return false;
  }
  if (point.length == 0) {
    showSnackBar({
      message: "Please add a point",
      state: State.ERROR,
    });
    return false;
  }

  return true;
}
