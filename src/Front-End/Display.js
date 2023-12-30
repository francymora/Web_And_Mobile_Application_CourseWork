import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import '../style/TableStyle.css' // Assicurati che il percorso del file CSS sia corretto

function TeamsDisplay() {
  const [teams, setTeams] = useState([]);
  const url = "http://localhost:3000/allteams/";

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setTeams(res.data);
      })
      .catch(err => {
        console.log("An error occurred while fetching teams:", err);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Team Name",
        accessor: "Team",
      },
      {
        Header: "Games Played",
        accessor: "Games Played",
      },
      {
        Header: "Wins",
        accessor: "Win",
      },
      {
        Header: "Draws",
        accessor: "Draw",
      },
      {
        Header: "Loss",
        accessor: "Loss",
      },
      {
        Header: "Goals For",
        accessor: "Goals For",
      },
      {
        Header: "Goals Against",
        accessor: "Goals Against",
      },
      {
        Header: "Points",
        accessor: "Points",
      },
      {
        Header: "Year",
        accessor: "Year",
      },
      {
        Header: "Edit",
        Cell: ({ row }) => (
          <a href={"/updateData/" + row.original._id}>Edit</a>
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <a href={"/deleteData/" + row.original._id}>Delete</a>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: teams });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="mt-3">
      <table {...getTableProps()} className="table table-stripped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TeamsDisplay;
