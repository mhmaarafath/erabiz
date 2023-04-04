import Link from 'next/link'
import React, {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { IconButton } from '@mui/material';
import {Delete, Edit, Message} from '@mui/icons-material';

export default function Actions({crud, id}) {
    const {setCrud} = useContext(AuthContext)

    const handleCrud = async (type) => {
        setCrud({
            id,
            crud,
            type,
        })
    }

    const path = `/auth/${crud}/${id}/edit`
    return (
        <>
            <IconButton onClick={() => handleCrud('edit')}><Edit/></IconButton>
            <IconButton onClick={() => handleCrud('delete')}><Delete/></IconButton>
        </>
    )
}
