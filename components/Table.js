import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

export default function Index({columns, data, crud, total, onChangePage}) {
    const {setCrud} = useContext(AuthContext)

      const [page, setPage] = useState(1);

    const handleCrud = async (type) => {
        setCrud({
            id: 0,
            crud,
            type,
        })
    }
    return (
        <>
            <div>
                <Button onClick={() => handleCrud('create')} startIcon={<Add/>}>
                    {crud}
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationServer
                paginationTotalRows={total}
                paginationPerPage={10}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={onChangePage}
            />
        </>
    )
}
