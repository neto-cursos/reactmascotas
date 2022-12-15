import React, { useContext } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { createRoot } from "react-dom/client";
import GoogleMapReact from 'google-map-react'
const render = (status) => {
  return <h1>{status}</h1>;
};

const Maps = ({coord}) => {
  const [ready, setReady] = React.useState(false);
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div className="h-96 w-96" style={{ display: "flex", height: "100%" }}>
      {/* <Wrapper apiKey={"AIzaSyDIUP7a3Q8zLBJuYpCYlrlzlW8mArr_RMc"} render={render}>
        <Map
          setReady={setReady}
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper> */}
      <UserMap coord={coord}></UserMap>
      {/* Basic form for controlling center and zoom of map. */}
      {/*form*/}
    </div>
  );
};


const Map = ({
  setReady,
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));

    }

    if (map != null) {
      console.log("null")
      console.log(map)
      setReady(true);
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback,
  dependencies
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

// window.addEventListener("DOMContentLoaded", () => {
//   // const root = createRoot(document.getElementById("root"));
//   // root.render(<Maps />);

// });



const UserMap = (props) => {
  console.log("coordenadas");
  console.log(props.coord);
  const [userInfo,setUserInfo]=React.useState(null)
  React.useEffect(() => {
    if(Number(props.coord.lat)!=0)
    {
      setUserInfo({center: {
        lat: Number(props.coord.lat),
        lng: Number(props.coord.long),
      },
      zoom: 15})
    }
  }, [props.coord])
  
  // let userInfo = {
  //   center: {
  //     lat: Number(props.coord.lat),
  //     lng: Number(props.coord.long),
  //   },
  //   zoom: 15
  // }

  const renderMarker = (map, maps) => {

    let marker = new maps.Marker({
      position: userInfo.center,
      map,
      title: "ubicación mascota"
    });
    return marker;
  }

  return (userInfo!=null&&
    <div className="h-96 w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: process.env.REACT_APP_googlekey
          key:import.meta.env.VITE_MAPS
        }}
        defaultCenter={userInfo.center}
        defaultZoom={userInfo.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          renderMarker(map, maps)
        }}

      ></GoogleMapReact>
    </div>
  )
}

export default Maps;