export const uploadPhoto = async (file: File) => {
  if (!file) return { success: false, message: 'No file provided' };

  try {
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-image?file=${filename}`);
    const data = await res.json();

    const formData = new FormData();
    Object.entries({ ...data.fields, file: file }).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof File) {
        formData.append(key, value);
      } else {
        console.error(`Invalid type for formData.append: ${typeof value} for key ${key}`);
        throw new Error('Invalid type for formData value');
      }
    });

    const uploadResponse = await fetch(data.url, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image.');
    }

    return { success: true };
  } catch (error) {
    throw new Error('Failed to upload image.');
  }
};
