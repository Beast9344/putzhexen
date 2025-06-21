'use server';

import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  attachment: z
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(file => !file || ACCEPTED_FILE_TYPES.includes(file.type), 'Only .pdf and .doc/docx formats are accepted.'),
});

export async function handleContactFormSubmit(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      attachment: formData.get('attachment'),
    };
    
    // The attachment will be a File object if present
    const parsed = contactFormSchema.safeParse(data);
    
    if (!parsed.success) {
      console.error('Validation Error:', parsed.error.flatten().fieldErrors);
      return { success: false, error: 'validation_error' };
    }
    
    // Here you would typically handle the form data, e.g.,
    // - Send an email
    // - Save to a database
    // - If there's an attachment, upload it to a storage service like Firebase Storage or AWS S3
    
    console.log('Contact form submitted successfully:');
    console.log('Name:', parsed.data.name);
    console.log('Email:', parsed.data.email);
    console.log('Message:', parsed.data.message);
    if (parsed.data.attachment) {
      console.log('Attachment received:', parsed.data.attachment.name, `(${(parsed.data.attachment.size / 1024).toFixed(2)} KB)`);
    }

    // Simulate a successful submission
    return { success: true };

  } catch (error) {
    console.error('Error handling contact form:', error);
    return { success: false, error: 'server_error' };
  }
}
