import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MdClose } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from './sendSMSModal.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

function TransitionsModal({ open, onClose, title }) {
    const [message, setMessage] = useState('');
    const [receiverMsisdn, setReceiverMsisdn] = useState('');
    const [senderName, setSenderName] = useState('');
    const [callbackUrl, setCallbackUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!message || !receiverMsisdn || !senderName) {
            alert("Please fill in all required fields.");
            return;
        }

        const payload = {
            message,
            receiverMsisdn: [receiverMsisdn], // assuming one number input for simplicity
            senderName,
            callbackUrl,
        };

        try {
            const response = await fetch('http://{{base_url}}:8082/api/v1/sms/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer {{auth-token}}',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                onClose(); // Close the modal after successful submission
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("An error occurred while sending the message.");
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={onClose}
                    >
                        <MdClose />
                    </IconButton>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Message"
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Receiver Msisdn"
                            variant="outlined"
                            value={receiverMsisdn}
                            onChange={(e) => setReceiverMsisdn(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Sender Name"
                            variant="outlined"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Callback URL (optional)"
                            variant="outlined"
                            value={callbackUrl}
                            onChange={(e) => setCallbackUrl(e.target.value)}
                        />
                        <button type="submit"
                                onClick={() => handleSubmit()}
                                className={styles.submit}>Send
                        </button>

                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default TransitionsModal;
