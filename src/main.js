import r from "redis";
import ut from "util";

async function connect() {
  let conn = r.createClient();
  let on = ut.promisify(conn.on).bind(conn);
  let res = await Promise.any([
    on("error").then(() => "error"),
    on("connect").then(() => "connected"),
  ]);
  return res;
}

function main() {
  connect().then((res) => console.log("Response -", res));
}

main()