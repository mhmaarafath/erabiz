import {
    Avatar,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Grid, List, ListItem, ListItemText, Slide, Zoom, ListItemAvatar, Typography, TextField
} from "@mui/material";
import axios from "@/utils/axios";
import {getCookie, setCookie} from "cookies-next";
import {React, useContext, useEffect, useState, forwardRef} from "react";
import {AuthContext} from "@/context/AuthContext";
import {Form, Formik} from "formik";
import {MessageContext} from "@/context/MessageContext";
import {useRouter} from "next/router";


const transitionTimeout = 200

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom timeout={transitionTimeout} ref={ref} {...props} />;
});

export default function Modal({children, data}){
    const [modalOpen, setModalOpen] = useState(false)
    const {crud, setCrud, setLoading} = useContext(AuthContext)
    const {setMessage, setErrors} = useContext(MessageContext)
    const path = `/auth/${crud?.crud}/`
    const router = useRouter()
    const initialValues = crud && (crud.type == 'create' ? {} : data.find(item => item.id == crud.id))

    useEffect(() => {
        setModalOpen( crud && (crud.type != '') )
    }, [crud])


    const handleClose = () => {
        setTimeout(()=> {
            setErrors(null)
            setCrud(null)
        }, transitionTimeout)
        setModalOpen(false)
    };

    const handleSubmit = async (values) => {
        setLoading(true)
        const formData = new FormData();
        for ( let key in values ){
            if(values[key] != null){
                if(Array.isArray(values[key])){
                    values[key].map(item => {
                        formData.append((key + '[]'), item.id)
                    })
                } else {
                    formData.append(key, values[key])
                }
            }
        }
        console.log(values)
        if(crud.type == 'edit') formData.append('_method', 'put')

        await axios(getCookie('token'))
        ({
            url : crud.type == 'create' ? crud.crud : `${crud.crud}/${crud.id}`,
            data : crud.type == 'delete' ? null : formData,
            method: crud.type == 'delete' ? 'delete' : 'post'
        })
        .then((response) => {
            if(response.data.status == 200){
                setMessage({
                    type : 'success',
                    message : crud.type == 'edit' ? 'Updated Successful' : (crud.type == 'delete' ? 'Deleted Successful' : 'Added Successful')
                })
                if(crud.crud == 'users' && crud.id == JSON.parse(getCookie('user')).id){
                    setCookie('user', response.data.user)
                }
                handleClose()
                router.push(path)
            } else {
                console.log('erros', response.data.errors)
                setErrors(response.data.errors)
            }
        }).catch(e => console.log('error', e))
        setLoading(false)
    };

    return (
        crud && (
            <Dialog
                open={modalOpen ?? false}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Transition}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                {crud.type == 'delete' && (
                    <>
                        <DialogTitle>{crud.type.toUpperCase()} {crud.crud.toUpperCase()}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure, you want to delete this data ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </>
                )}

                {(crud.type == 'edit' || crud.type == 'create') && (
                    <>
                        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
                            {
                                formik => {
                                    // console.log('Props', formik)
                                    return (
                                        <Form>
                                            <DialogTitle>{crud.type.toUpperCase()} {crud.crud.toUpperCase()}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    <Grid container spacing={2}>
                                                        {children}
                                                    </Grid>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button disabled={formik.isSubmitting} type='submit'>Save</Button>
                                            </DialogActions>
                                        </Form>
                                    )
                                }
                            }

                        </Formik>
                    </>
                )}
            </Dialog>
        )
    )
}
