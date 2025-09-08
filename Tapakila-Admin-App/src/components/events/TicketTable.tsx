import { Datagrid, TextField, ChipField, NumberField } from 'react-admin';
import { useRecordContext } from 'react-admin';

const getStatusColor = (status: string) => {
    switch(status) {
        case 'SOLD': return '#4caf50';
        case 'AVAILABLE': return '#2196f3';
        case 'RESERVED': return '#ff9800';
        default: return '#9e9e9e';
    }
};

export const TicketTable = () => {
    const record = useRecordContext();
    if (!record?.tickets) return null;

    return (
        <Datagrid 
            bulkActionButtons={false}
            data={record.tickets}
            rowClick={false}
        >
            <TextField source="ticket_id" label="ID" />
            <ChipField source="ticket_type" label="Type" />
            <NumberField
                source="ticket_price"
                label="Prix (Ar)"
                options={{ style: 'currency', currency: 'MGA' }}
            />
            <ChipField
                source="ticket_status"
                label="Statut"
                sx={{
                    '& .MuiChip-root': {
                        backgroundColor: ({ record }) => getStatusColor(record?.ticket_status),
                        color: '#fff'
                    }
                }}
            />
            <TextField source="user_id" label="Acheté par" />
        </Datagrid>
    );
};
