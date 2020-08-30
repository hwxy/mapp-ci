let isLogEnabled = true;

export function setIsLogEnabled(val: boolean) {
  isLogEnabled = val;
}

export default function createDebug(ns: string) {
  return function log(msg: string, obj?: any, ...args: any[]) {
    if (!isLogEnabled) {
      return;
    }
    const str = JSON.stringify(obj, null, 2);
    console.log(ns, msg, str, ...args);
    return;
  };
}
