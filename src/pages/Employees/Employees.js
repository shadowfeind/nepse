import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import useTable from "../../components/useTable";

import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import { nepseData } from "../../data/nov18";
import { CsvExport } from "../../components/CsvExport";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "stockSymbol", label: "Stock Symbol" },
  { id: "buyerMemberId", label: "Buyer" },
  { id: "sellerMemberId", label: "Seller" },
  { id: "contractQuantity", label: "Quantity" },
  { id: "contractRate", label: "Rate" },
  { id: "businessDate", label: "date" },
  { id: "contractAmount", label: "Amount" },
];

export default function Employees() {
  const classes = useStyles();
  const [records, setRecords] = useState(nepseData.floorsheets.content);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.stockSymbol.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const fileName = "nepse";

  return (
    <>
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Stock"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <CsvExport csvData={records} fileName={fileName} />
        </Toolbar>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.stockSymbol}</TableCell>
                <TableCell>{item.buyerMemberId}</TableCell>
                <TableCell>{item.sellerMemberId}</TableCell>
                <TableCell>{item.contractQuantity}</TableCell>
                <TableCell>{item.contractRate}</TableCell>
                <TableCell>{item.businessDate}</TableCell>
                <TableCell>{item.contractAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
