export const userColumns = [
    { field: "cod_tracker", headerName: "ID", width: 180,headerClassName: 'super-app-theme--header',
    headerAlign: 'center',},
    // {
    //   field: "user",
    //   headerName: "User",
    //   width: 230,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellWithImg">
    //         <img className="cellImg" src={params.row.img} alt="avatar" />
    //         {params.row.username}
    //       </div>
    //     );
    //   },
    // },
    {
        field: "location",
        headerName: "Ubicación",
        width: 300,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },

    {
        field: "time",
        headerName: "Hora Registro",
        width: 200,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: "precision",
        headerName: "Precisión",
        width: 100,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    // {
    //   field: "status",
    //   headerName: "Estado",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
];
