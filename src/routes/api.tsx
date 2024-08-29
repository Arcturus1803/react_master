const BASE_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

const BASE_PAPRIKA = `http://api.coinpaprika.com/v1`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

/*
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
*/

export async function fetchCoins() {
  /*
  return fetch(`http://api.coinpaprika.com/v1/coins`).then((response) => response.json());
  */
  const coins: ICoin[] = await fetch(`${BASE_PAPRIKA}/coins`).then((response) =>
    response.json()
  );
  return coins.slice(0, 20);
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_PAPRIKA}/coins`).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_PAPRIKA}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;

  return fetch(
    `${BASE_PAPRIKA}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
