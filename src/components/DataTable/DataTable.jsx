// import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import React,{ useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./../../firebase/config";


const DataTable = ({ setCoord }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    //onSnapshot to listen in realtime 
    const unsub = onSnapshot(
      collection(db, "coordenadas"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          // console.log(doc.data().time);
          const time = new Date(doc.data().time.seconds * 1000 + doc.data().time.nanoseconds / 1000000).toLocaleString('es-BO', {
            timeZone: 'America/La_Paz',
            dateStyle: 'short',
            timeStyle: 'short',
          });
          const coordenadas = {
            id: doc.id,
            location: doc.data().location._lat + ',' + doc.data().location._long,
            time: time,
            precision: doc.data().precision,
            cod_tracker: doc.data().cod_tracker
          }
          // list.push({ id: doc.id, ...doc.data() });
          list.push(coordenadas);
        });
        setData(list);
        // console.log(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      let mayor;
      let i = false;
      data.map(e => {
        if (!i) {
          mayor = e
        } else if (e.time > mayor.time) {
          mayor = e
        }
        i = true;
      })
      console.log("mayor")
      console.log(mayor);
      const coord = mayor.location.split(',');
      console.log("coord")
      console.log(coord);
      setCoord({ lat: coord[0], long: coord[1], msg: 'última posición' });
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "coordenadas", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      headerClassName: 'super-app-theme--header',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div className="viewButton">Ver</div> */}
            <div
              className="deleteButton text-red-700 text-xs"
              onClick={() => handleDelete(params.row.id)}

            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];
  return (


    <DataGrid
      autoHeight
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(13, 205, 99, 0.55)',
          color: '#FFFFFF',
        },
      }}
      className="datagrid bg-white"
      rows={data}
      columns={userColumns.concat(actionColumn)}
      pageSize={5}
      rowsPerPageOptions={[2]}
      // checkboxSelection
      initialState={{
        sorting: {
          sortModel: [{ field: 'time', sort: 'desc' }],
        },
      }}
    />

  );
}



export default DataTable;