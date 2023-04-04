import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function schedules() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [data, setData] = useState([]);
 
  const getData = () => {
      axios().get(`schedules`).then(response => {
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
      name: 'Doctor',
      selector: row => row.doctor.name,
      sortable: true,
    },
    {
      name: 'Hospital',
      selector: row => row.hospital.name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.day,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Actions crud='schedules' id={row.id} />
      )
    },
  ];

  return (
      <>
        {data.schedules && <Table columns={columns} crud='schedules' data={data.schedules}/>}
        <Modal data={data.schedules}>
            <FormGrid type='autocomplete' options={data.doctors} name='doctor_id' label='Doctor *'/>
            <FormGrid type='autocomplete' options={data.hospitals} name='hospital_id' label='Hospital *'/>
            <FormGrid type='selectDay' options={days} name='day' label='Day *'/>
            <FormGrid type='time' name='start' label='Start'/>
            <FormGrid type='time' name='end' label='End'/>
            <FormGrid type='number' name='duration' label='Duration'/>
        </Modal>
      </>
    )
}




