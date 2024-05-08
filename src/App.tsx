import { useEffect, useRef, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { fetchData } from "./util/helper";
import { IPInfo } from "./types/types";
import { FaAngleRight, FaArrowUp } from "react-icons/fa6";

// @ts-ignore
type CustomMapContainerType = MapContainer | null;

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [form, setForm] = useState("");
  const mapRef = useRef<CustomMapContainerType>(null);

  const [data, setData] = useState<IPInfo>({
    ip: "",
    location: {
      country: "",
      region: "",
      city: "",
      lat: 0,
      lng: 0,
      postalCode: "",
      timezone: "",
      geonameId: 0,
    },
    domains: [],
    as: {
      asn: 0,
      name: "",
      route: "",
      domain: "",
      type: "",
    },
    isp: "",
    proxy: {
      proxy: false,
      vpn: false,
      tor: false,
    },
  });
  useEffect(() => {
    if (mapRef.current && location.lat !== null && location.lng !== null) {
      mapRef.current.flyTo([location.lat, location.lng], 13, {
        duration: 2,
        easeLinearity: 0.5,
      });
    }
  }, [location]);

  const [error, setError] = useState("");
  function handleSubmit() {
    fetchData(form)
      .then((data) => {
        setData(data);
        const { lat, lng } = data.location;
        setLocation({ lat, lng });
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  return (
    <>
      {error ? (
        <section className="relative h-screen flex flex-col">
          <div className="h-[33.33%] w-screen backgroundImageDiv">
            <article>
              <div className="max-w-screen-sm mx-auto">
                <h1 className="text-center text-lg font-semibold my-2 text-white">
                  IP Address Tracker
                </h1>
                <div className="w-full py-2 flex">
                  <input
                    type="text"
                    className="px-4 w-screen py-2 rounded-l-lg cursor-pointer inp"
                    placeholder="Search for any IP address or domain"
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                  />
                  <button
                    className="text-white bg-black px-2 text-sm rounded-r-lg cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </article>
          </div>

          <main className=" h-[66.67%]">
            <article className="absolute z-50 md:flex md:gap-x-8 items-center shadow-lg px-8 py-4 top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white max-w-[900px] mx-auto w-[80%] rounded-md">
              {error ? (
                <h2 className="text-lg text-center flex justify-center items-center gap-4">
                  {error} try again <FaArrowUp />
                </h2>
              ) : (
                <h2 className="text-lg text-center flex justify-center items-center gap-4">
                  Please search a public IP Address <FaArrowUp />
                </h2>
              )}
            </article>
            <MapContainer
              center={[location.lat || 51.505, location.lng || -0.09]}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full z-10"
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {location.lat && location.lng && (
                <Marker position={[location.lat, location.lng]} />
              )}
            </MapContainer>
          </main>
        </section>
      ) : (
        <section className="relative h-screen flex flex-col">
          <div className="h-[33.33%] w-screen backgroundImageDiv">
            <article>
              <div className="max-w-screen-sm w-[80%] mx-auto">
                <h1 className="text-center text-lg font-semibold my-2 text-white">
                  IP Address Tracker
                </h1>
                <div className="w-full py-2 flex">
                  <input
                    type="text"
                    className="px-4 w-screen py-2 rounded-l-lg cursor-pointer inp"
                    placeholder="Search for any IP address or domain"
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                  />
                  <button
                    className="text-white bg-black px-2 text-sm rounded-r-lg cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </article>
          </div>

          <main className=" h-[66.67%]">
            {data.location.city.length > 1 ? (
              <article className="absolute z-50 md:flex md:gap-x-8 justify-center md:justify-normal items-center shadow-lg px-8 py-4 top-[40%] sm:top-[40%] md:top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white max-w-[900px] mx-auto w-[80%] rounded-md">
                <div className="py-2 basis-[22%] border-r-0 md:border-r-2 h-[80%]">
                  <p className="font-bold mb-2 text-sm text-customGray">
                    IP ADDRESS
                  </p>
                  <h1 className="text-sm sm:text-lg text-darkGray font-bold">
                    {/* 192.212.174.101 */}
                    {data.ip}
                  </h1>
                </div>
                <div className="py-2 basis-[22%] border-r-0 md:border-r-2 h-[80%]">
                  <p className="font-bold mb-2 text-sm text-customGray">
                    LOCATION
                  </p>
                  <h1 className="text-sm sm:text-lg text-darkGray font-bold">
                    {data.location.city}, {data.location.country}{" "}
                    {data.location.postalCode}
                  </h1>
                </div>
                <div className="py-2 basis-[22%] border-r-0 md:border-r-2 h-[80%]">
                  <p className="font-bold mb-2 text-sm text-customGray">
                    TIMEZONE
                  </p>
                  <h1 className="text-sm sm:text-lg text-darkGray font-bold">
                    UTC {data.location.timezone}
                  </h1>
                </div>
                <div className="py-2 basis-[22%] h-[80%]">
                  <p className="font-bold mb-2 text-sm text-customGray">ISP</p>
                  <h1 className="text-sm sm:text-lg text-darkGray font-bold">
                    {data.isp}
                  </h1>
                </div>
              </article>
            ) : (
              <article className="absolute z-50 md:flex md:gap-x-8 items-center shadow-lg px-8 py-4 top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white max-w-[900px] mx-auto w-[80%] rounded-md">
                {error ? (
                  <h2 className="text-lg text-center flex justify-center items-center gap-4">
                    {error} try again <FaArrowUp />
                  </h2>
                ) : (
                  <h2 className="text-lg text-center flex justify-center items-center gap-4">
                    Please search a public IP Address <FaArrowUp />
                  </h2>
                )}
              </article>
            )}
            <MapContainer
              center={[location.lat || 51.505, location.lng || -0.09]}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full z-10"
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {location.lat && location.lng && (
                <Marker position={[location.lat, location.lng]} />
              )}
            </MapContainer>
          </main>
        </section>
      )}
    </>
  );
}

export default App;
