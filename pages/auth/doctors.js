import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function doctors() {

  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const countPerPage = 10;
 
  const getData = () => {
      axios().get(`doctors`).then(response => {
      setData(response.data)
    }).catch(err => {
      setData([]);
    });
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
      name: 'Speciality',
      selector: row => row.speciality.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Actions crud='doctors' id={row.id} />
      )
    },
  ];

  return (
      <>
        {data.doctors && <Table columns={columns} crud='doctors' data={data.doctors}/>}
        <Modal data={data.doctors}>
            <FormGrid type='text' name='name' label='Name *'/>
            <FormGrid type='select' name='speciality_id' label='Speciality *' options={data.specialities}/>
            <FormGrid type='text' name='degree' label='Degree *'/>
            <FormGrid type='text' name='chamber' label='Chamber *'/>
            <FormGrid type='file' name='avatar' label='Avatar'/>
        </Modal>
      </>
    )
}

// export async function getServerSideProps({req, res}) {
//   return tableData(req, 'doctors')
// }



