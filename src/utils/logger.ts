import config from "../config/config";

class Logger {
  public debug(msg: string, ...args: any[]): void {
    if (config.env === "development") {
      console.log(`[DEBUG] ${msg}`, ...args);
    }
  }

  public info(msg: string, ...args: any[]): void {
    console.log(`[INFO] ${msg}`, ...args);
  }

  public warn(msg: string, ...args: any[]): void {
    console.warn(`[WARN] ${msg}`, ...args);
  }
  public error(msg: string, ...args: any): void {
    console.error(`[ERROR] ${msg}`, ...args);
  }
}

export default new Logger();
