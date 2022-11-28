import React from 'react'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { Button } from '@mui/material'

function SweetAlert2() {
    const fireAlert = () => {
        Swal.fire({
            title: '기부를 진행하시겠습니까?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {

            if (result.isConfirmed) {
                Swal.fire('기부가 완료되었습니다.', '감사합니다! 많은 기부 부탁해욥^^', 'success');
  
            } else
                Swal.fire('진행 중단', '기부 해주시지 ㅜ', 'error')
  
        })
    }
    return (
        <div >
            <center>
  
                <Button className="btn btn-primary" 
                    onClick={fireAlert}>
                    Sweet alert Test
                 </Button>
            </center>
        </div>
    )
}
  
export default function SweetTest() {
    return (
        <div className="SweetTest">
            <SweetAlert2 />
        </div>
    );
}