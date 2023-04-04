import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useField, useFormikContext } from "formik";


export default function hospitals({data}) {
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
        <Table columns={columns} crud='hospitals' data={data.hospitals}/>
        <Modal data={data.hospitals}>
            <FormGrid type='text' name='name' label='Name *'/>
            <FormGrid type='autocompleteState' name='state_id'/>
        </Modal>
      </>
    )
}

export async function getServerSideProps({req, res}) {
  return tableData(req, 'hospitals')
}



