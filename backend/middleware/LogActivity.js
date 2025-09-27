export function LogActivity(req, _res, next) {
  try {
    console.log(
      `[WATCH] ${req.method}  IP="${req.ip.toString()}" URL="${
        req.url
      }" ${new Date().toString()}`
    );
    next();
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    next();
  }
}
