import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { TextField, Button, Alert } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\+?[1-9]\d{1,11}$/, 'Invalid phone number format (e.g., +923001234567)'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data) => {
    const emailParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      to_email: 'enemyop123456789@gmail.com',
      project_source: 'Portfolio Contact Form Message',
    };

    emailjs
      .send('service_5s9rybe', 'template_skdaqm7', emailParams, 'mJNe4k8LuOfkw5FHc')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => setShowSuccess(false), 10000);
        reset();
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text || error);
        setShowError(true);
        setShowSuccess(false);
        setTimeout(() => setShowError(false), 5000);
      });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  label="Your Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: 'bg-gray-800',
                    style: { color: 'white' }, // Ensure input text is white
                  }}
                  InputLabelProps={{
                    style: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: errors.name ? '#ef5350' : '#455a64' },
                      '&:hover fieldset': { borderColor: '#b0bec5' },
                      '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                    },
                    '& .MuiFormHelperText-root': { color: '#ef5350' },
                  }}
                />
                <TextField
                  label="Your Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: 'bg-gray-800',
                    style: { color: 'white' }, // Ensure input text is white
                  }}
                  InputLabelProps={{
                    style: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: errors.email ? '#ef5350' : '#455a64' },
                      '&:hover fieldset': { borderColor: '#b0bec5' },
                      '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                    },
                    '& .MuiFormHelperText-root': { color: '#ef5350' },
                  }}
                />
                <TextField
                  label="Your Phone (e.g., +923001234567)"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: 'bg-gray-800',
                    style: { color: 'white' }, // Ensure input text is white
                  }}
                  InputLabelProps={{
                    style: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: errors.phone ? '#ef5350' : '#455a64' },
                      '&:hover fieldset': { borderColor: '#b0bec5' },
                      '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                    },
                    '& .MuiFormHelperText-root': { color: '#ef5350' },
                  }}
                />
              </div>
              <TextField
                label="Your Message"
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  className: 'bg-gray-800',
                  style: { color: 'white' }, // Ensure input text is white
                }}
                InputLabelProps={{
                  style: { color: '#b0bec5' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: errors.message ? '#ef5350' : '#455a64' },
                    '&:hover fieldset': { borderColor: '#b0bec5' },
                    '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                  },
                  '& .MuiFormHelperText-root': { color: '#ef5350' },
                }}
              />
              {showSuccess && (
                <Alert
                  severity="success"
                  variant="filled"
                  onClose={handleCloseSuccess}
                  sx={{ backgroundColor: '#4caf50', color: 'white', mb: 2 }}
                >
                  Your message has been sent successfully!
                </Alert>
              )}
              {showError && (
                <Alert
                  severity="error"
                  variant="filled"
                  onClose={handleCloseError}
                  sx={{ backgroundColor: '#ef5350', color: 'white', mb: 2 }}
                >
                  Failed to send message. Please try again later.
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#00bcd4',
                  color: 'oklch(100% 0 0)',
                  fontWeight: 'bold',
                  padding: '10px',
                  borderRadius: '8px',
                  mt: 3,
                  '&:hover': { backgroundColor: '#00acc1' },
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;