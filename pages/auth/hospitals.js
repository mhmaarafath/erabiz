import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';



export default function hospitals() {
  const [data, setData] = useState([]);
 
  const getData = () => {
      axios().get(`hospitals`).then(response => {
      setData(response.data)
    })
  }
 
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'State',
      selector: row => row.state.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Actions crud='hospitals' id={row.id} />
      )
    },
  ];

  return (
      <>
        {data.hospitals && <Table columns={columns} crud='hospitals' data={data.hospitals}/>}
        <Modal data={data.hospitals}>
            <FormGrid type='text' name='name' label='Name *'/>
            <FormGrid type='autocompleteState' name='state_id'/>
        </Modal>
      </>
    )
}



