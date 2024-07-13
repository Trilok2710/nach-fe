import React from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import tableData from "./tableData.js";


function Table() {
  const columns = useMemo(() => [
    // {
    //   accessorKey: "Sr No.",
    //   header: "Sr No.",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Application ID",
    //   header: "Application ID",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Borrower Name",
    //   header: "Borrower Name",
    //   size: 200,
    // },
    // {
    //   accessorKey: "Contact No.",
    //   header: "Contact No.",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Current Lender",
    //   header: "Current Lender",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Present By",
    //   header: "Present By",
    //   size: 150,
    // },
    // {
    //   accessorKey: "NACH-NON-NACH",
    //   header: "NACH-NON-NACHt",
    //   size: 150,
    // },
    // {
    //   accessorKey: "NACH Status",
    //   header: "NACH Status",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Repayment_date",
    //   header: "Repayment Date",
    //   size: 150,
    // },
    // {
    //   accessorKey: "Reason Description",
    //   header: "Reason Description",
    //   size: 150,
    // },
    // {
    //     accessorKey: "UMRN ",
    //     header: "UMRN",
    //     size: 150,
    // },
    // {
    //     accessorKey: "EMI DATE",
    //     header: "EMI DATE",
    //     size: 150,
    // },
    // {
    //     accessorKey: "INSTITUTE NAME",
    //     header: "INSTITUTE NAME",
    //     size: 150,
    // },
    // {
    //     accessorKey: "Course Name",
    //     header: "Course Name",
    //     size: 150,
    // },
    // {
    //     accessorKey: "Stage ",
    //     header: "Stage",
    //     size: 150,
    // },
    // {
    //     accessorKey: "EMI Amount",
    //     header: "EMI Amount",
    //     size: 150,
    // },
    {
        accessorKey: "Bank_FI_name",
        header: "Bank/FI_name",
        size: 150,
      },
      {
        accessorKey: "Type_of_loan",
        header: "Type of Loan",
        size: 150,
      },
      {
        accessorKey: "disbursement_date",
        header: "Disbursement Date",
        size: 200,
      },
      {
        accessorKey: "Outstanding_amount",
        header: "Outstanding Amount (as on DATE)",
        size: 150,
      },
      {
        accessorKey: "Priniciple_amount",
        header: "Principle Amount",
        size: 150,
      },
      {
        accessorKey: "Interest_amount",
        header: "Interest Amount",
        size: 150,
      },
      {
        accessorKey: "TDS_amount",
        header: "TDS Amount",
        size: 150,
      },
      {
        accessorKey: "Net_Payment",
        header: "Net Payment",
        size: 150,
      },
      {
        accessorKey: "Repayment_date",
        header: "Repayment Date",
        size: 150,
      },
      {
        accessorKey: "NACH_NEFT",
        header: "NACH/NEFT",
        size: 150,
      },

  ]);

  const table = useMaterialReactTable({
    columns,
    data: tableData,

    muiTableCellProps: {
      sx: {
        padding: "1vh",
        width: "13vw",
      },
    },

    muiTableHeadCellProps: {
      sx: {
        padding: "1vh",
        width: "13vw",
        borderLeft: "1px solid rgba(25,25,45,0.4)",
      },
    },

    muiTableContainerProps: {
      sx: {
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        overflowX: "scroll",
      },
    },
    muiTableProps: {
      sx: {
        tableLayout: "fixed",
      },
    },

    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "rgba(0,0,0,0.3)",
        },
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      },
    },
  });

  return (
    <MaterialReactTable
      enableStickyHeader
      enableDownload={true}
      enablePrint={true}
      enableDarkMode={true}
      enableRowsPerPage={true}
      enableRowsPerPageOption={true}
      enableColumnOrder={true}
      enableColumnVisibility={true}
      enableExport={true}
    //   table={table}
    className="full-width-table" // Add this class
    table={table}
    />
  );
};

export default Table;
