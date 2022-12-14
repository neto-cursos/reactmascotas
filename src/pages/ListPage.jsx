import DataTable from "../components/DataTable"
// import "./list.scss"


const ListPage = ({setCoord}) => {
  return (
    <div className="list w-4/5">
      <div className="flex flex-row text-center">
        <DataTable setCoord={setCoord}/>
      </div>
    </div>
  )
}

export default ListPage