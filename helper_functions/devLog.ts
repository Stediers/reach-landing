export default function devLog(message: any, ...optionalParams: any[]) {
  if (process.env.NEXT_PUBLIC_DEV_MODE) {
    console.log(message, ...optionalParams);
  }
}
