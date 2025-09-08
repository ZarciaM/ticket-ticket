import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField as MuiTextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNotify } from 'react-admin';
import { eventsDataProvider } from '../../data/events-data-provider';

export enum TicketType {
    STANDARD = 'STANDARD',
    VIP = 'VIP',
    EARLY_BIRD = 'EARLY_BIRD'
}

interface CreateTicketDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: string;
    onSuccess: () => void;
}

interface DeleteTicketDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: string;
    onSuccess: () => void;
}

export const CreateTicketDialog = ({ open, onClose, eventId, onSuccess }: CreateTicketDialogProps) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketType, setTicketType] = useState<TicketType>(TicketType.STANDARD);
    const [ticketPrice, setTicketPrice] = useState('');
    const notify = useNotify();

    const handleSubmit = async () => {
        if (!ticketNumber || !ticketPrice) {
            notify('Veuillez remplir tous les champs', { type: 'warning' });
            return;
        }

        try {
            const params = {
                idEvent: eventId,
                ticketNumber: parseInt(ticketNumber, 10),
                ticket_type: ticketType,
                ticketPrice: parseFloat(ticketPrice)
            };

            await eventsDataProvider.createTickets(params);
            notify('Tickets créés avec succès', { type: 'success' });
            onSuccess();
        } catch (error) {
            console.error('Error creating tickets:', error);
            notify('Erreur lors de la création des tickets', { type: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Créer des tickets</DialogTitle>
            <DialogContent>
                <MuiTextField
                    label="Nombre de tickets"
                    type="number"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type de ticket</InputLabel>
                    <Select
                        value={ticketType}
                        label="Type de ticket"
                        onChange={(e) => setTicketType(e.target.value as TicketType)}
                    >
                        <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                        <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                        <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                    </Select>
                </FormControl>
                <MuiTextField
                    label="Prix unitaire (Ar)"
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Créer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const DeleteTicketDialog = ({ open, onClose, eventId, onSuccess }: DeleteTicketDialogProps) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketType, setTicketType] = useState<TicketType | ''>('');
    const notify = useNotify();

    const handleSubmit = async () => {
        if (!ticketNumber) {
            notify('Veuillez entrer un nombre de tickets', { type: 'warning' });
            return;
        }

        try {
            const params = {
                ticketNumber: parseInt(ticketNumber, 10),
                event_id: eventId,
                ...(ticketType && { ticket_type: ticketType })
            };

            await eventsDataProvider.deleteTickets(params);
            notify('Tickets supprimés avec succès', { type: 'success' });
            onSuccess();
        } catch (error) {
            console.error('Error deleting tickets:', error);
            notify('Erreur lors de la suppression des tickets', { type: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Supprimer des tickets</DialogTitle>
            <DialogContent>
                <MuiTextField
                    label="Nombre de tickets"
                    type="number"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type de ticket (optionnel)</InputLabel>
                    <Select
                        value={ticketType}
                        label="Type de ticket (optionnel)"
                        onChange={(e) => setTicketType(e.target.value as TicketType | '')}
                    >
                        <MenuItem value="">Tous les types</MenuItem>
                        <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                        <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                        <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit} variant="contained" color="error">
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    );
};
