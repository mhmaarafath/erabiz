import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';

export default function doctors({data}) {
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
        <Table columns={columns} crud='doctors' data={data.doctors}/>
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

export async function getServerSideProps({req, res}) {
  return tableData(req, 'doctors')
}



