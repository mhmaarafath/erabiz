import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function specialities() {
  const [data, setData] = useState([]);
 
  const getData = () => {
      axios().get(`specialities`).then(response => {
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
      name: 'Actions',
      cell: row => (
        <Actions crud='specialities' id={row.id} />
      )
    },
  ];

  return (
      <>
        {data.specialities && <Table columns={columns} crud='specialities' data={data.specialities}/>}
        <Modal data={data.specialities}>
            <FormGrid type='text' name='name' label='Name *'/>
        </Modal>
      </>
    )
}



