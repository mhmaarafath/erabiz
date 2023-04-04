import Actions from '@/components/Actions';
import Table from '@/components/Table';
import tableData from '@/utils/tableData';
import Modal from "@/components/Modal";
import FormGrid from '@/components/Form/FormGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function appointments() {

  const [data, setData] = useState([]);
 
  const getData = () => {
      axios().get(`appointments`).then(response => {
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
      selector: row => row.schedule.doctor.name,
      sortable: true,
    },
    {
      name: 'Hospital',
      selector: row => row.schedule.hospital.name,
      sortable: true,
    },
    {
      name: 'State',
      selector: row => row.schedule.hospital.state.name,
      sortable: true,
    },
  ];

  return (
      <>
        {data.data && <Table columns={columns} crud='appointments' data={data.data}/>}
        {/* <Modal data={data.schedules}>
            <FormGrid type='autocomplete' options={data.doctors} name='doctor_id' label='Doctor *'/>
            <FormGrid type='autocomplete' options={data.hospitals} name='hospital_id' label='Hospital *'/>
            <FormGrid type='selectDay' options={days} name='day' label='Day *'/>
            <FormGrid type='time' name='start' label='Start'/>
            <FormGrid type='time' name='end' label='End'/>
            <FormGrid type='number' name='duration' label='Duration'/>
        </Modal> */}
      </>
    )
}




