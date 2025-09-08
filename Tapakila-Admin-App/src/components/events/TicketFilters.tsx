import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useState } from 'react';
import { TicketType } from './TicketDialogs';

interface TicketFiltersProps {
    onTypeChange: (type: string) => void;
    onStatusChange: (status: string) => void;
}

export const TicketFilters = ({ onTypeChange, onStatusChange }: TicketFiltersProps) => {
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    return (
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Type de ticket</InputLabel>
                <Select
                    value={typeFilter}
                    label="Type de ticket"
                    onChange={(e) => {
                        setTypeFilter(e.target.value);
                        onTypeChange(e.target.value);
                    }}
                >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                    <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                    <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Statut</InputLabel>
                <Select
                    value={statusFilter}
                    label="Statut"
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        onStatusChange(e.target.value);
                    }}
                >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="AVAILABLE">Disponible</MenuItem>
                    <MenuItem value="SOLD">Vendu</MenuItem>
                    <MenuItem value="RESERVED">Réservé</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
