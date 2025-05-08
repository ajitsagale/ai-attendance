
import React from 'react'
import List from '../components/CRUD/List';
import { Container } from '@mui/material';
import MainLayout from '../../../layout/MainLayout';

const EnterMilkCollection = () => {
    const columnsConfig = [
        { id: 'CollectionDate', label: 'Collection Date', value: '', type: 'date' ,
            renderCell: (rowData: any) => rowData.CollectionDate,
        },
        { id: 'FarmerName', label: 'Farmer Name', value: '', type: 'select',
            rows: [{ id: 'Ram Singh', value: 'Ram Singh', },{ id: 'Sita Devi', value: 'Sita Devi' }
                ,{ id: 'Mohan Lal', value: 'Mohan Lal' }], 
            renderCell: (rowData: any) => rowData.FarmerName,
         },
        { id: 'Quantity', label: 'Quantity (Liters)', value: '', type: 'text', 
            rows: [{ id: 'Election', value: 'Election' },
                { id: 'Appointment', value: 'Appointment' },
                { id: 'Registration', value: 'Registration' }],
            renderCell: (rowData: any) => rowData.Quantity, 
        },
        { id: 'Fat', label: 'Fat %', value: '', type: 'text', 
            renderCell: (rowData: any) => rowData.Fat,
        },
        { id: 'SNF', label: 'SNF %', value: '', type: 'text', 
            renderCell: (rowData: any) => rowData.SNF },
        { id: 'TotalAmount', label: 'Total Amount', value: '', type: 'text', 
            renderCell: (rowData: any) => rowData.TotalAmount,
        },
        { id: 'PaymentStatus', label: 'Payment Status', value: '', type: 'select', 
            rows: [{ id: 'Pending', value: 'Pending' },{ id: 'Paid', value: 'Paid' }], 
            renderCell: (rowData: any) => rowData.PaymentStatus },
      ];
      const initialData = [
        { id: '1',CollectionDate:'2025-04-21', FarmerName: 'Ram Singh', TotalAmount:'200', 
            Quantity: '2', Fat: '20', SNF: '10%', PaymentStatus:'Paid' },
        { id: '2',CollectionDate:'2025-05-01', FarmerName: 'Mohan Lal', TotalAmount:'150',
            Quantity: '4', Fat: '13', SNF: '20 %', PaymentStatus:'Pending' },
    ]
    return (
        
    <MainLayout>
        <Container maxWidth="md" sx={{ py: 4 }}>
            <List initialData={initialData} columnsConfig={columnsConfig} uniqueKey="id" />
        </Container>
    </MainLayout>
  )
}

export default EnterMilkCollection