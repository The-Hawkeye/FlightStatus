import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

const NotificationSettings = () => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('https://flightstatus.onrender.com/api/notifications', data);
      alert('Notification sent successfully');
      reset(); 


    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="flight_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Flight ID"
              variant="outlined"
              fullWidth
              className="mb-4"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              className="mb-4"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              className="mb-4"
            />
          )}
        />
        <Controller
          name="emailNotifications"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Receive Email Notifications"
            />
          )}
        />
        <Controller
          name="smsNotifications"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Receive SMS Notifications"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" className="mt-4">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default NotificationSettings;
