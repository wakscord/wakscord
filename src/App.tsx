import { useEffect, useState } from "react";
import "./css/App.css";

import Card from "./components/Card";
import { API_BASE_URL, ITEMS } from "./constants";

export default function App() {
  const [info, setInfo] = useState<any>({});
  const [watch, setWatch] = useState<any>({});
  const [wakzoo, setWakzoo] = useState<any>({});
  const [bangon, setBangon] = useState<any>({});

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const infoRes = await fetch(API_BASE_URL + "/info");
      const infoData = await infoRes.json();

      const watchRes = await fetch(API_BASE_URL + "/watch");
      const watchData = await watchRes.json();

      const wakzooRes = await fetch(API_BASE_URL + "/wakzoo");
      const wakzooData = await wakzooRes.json();

      const bangonRes = await fetch(API_BASE_URL + "/bangon");
      const bangonData = await bangonRes.json();

      setInfo(infoData);
      setWatch(watchData);
      setWakzoo(wakzooData);
      setBangon(bangonData);

      setLoaded(true);
    })();
  }, []);

  return (
    <div className="App">
      <div className="content">
        {loaded &&
          Object.entries(ITEMS).map((item, index) => (
            <Card
              key={index}
              name={item[0]}
              data={item[1]}
              info={info[item[0]]}
              watch={watch[item[0]]}
              wakzoo={new Date(wakzoo[item[0]] * 1000)}
              bangon={bangon.members[item[0]]}
            />
          ))}
      </div>
    </div>
  );
}
