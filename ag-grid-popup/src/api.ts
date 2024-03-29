import data from "./data.json";

export interface Athlete {
  id: number;
  transactionNo: number;
  transactionType: string;
  fundingRule: string;
  ISIN: string;
  SafeKeepingAcc: string;
}

function* getId(reset: boolean = false) {
  let id = 0;
  while (true) {
    if (reset) id = 0;
    yield ++id;
  }
  return -1;
}
const idGenerator = getId();

function attachId(data: Omit<Athlete, "id">[]): Athlete[] {
  return data.map((a) => ({ ...a, id: idGenerator.next().value }));
}

export function fetchData(): Promise<Athlete[]> {
  return Promise.resolve(data).then((data) => attachId(data));
}

export function fetchLargeData() {
  const dataUrl =
    "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json";
  return fetch(dataUrl)
    .then((r) => r.json())
    .then((data) => attachId(data));
}
