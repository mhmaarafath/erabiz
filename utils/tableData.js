import axios from "@/utils/axios"

const tableData = async (req, crud)=>{
  const data = await axios(req.cookies['token']).get(crud)
  return { 
    props: {
      data : data.data,
      // title : crud.toUpperCase()
    }
  }
}

export default tableData