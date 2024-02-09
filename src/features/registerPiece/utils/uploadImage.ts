export const uploadPhoto = async (file: File | null) => {
  if (!file) return { success: false, message: 'No file provided' };
  try {
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-image?file=${filename}`);
    const data = await res.json();

    const formData = new FormData();
    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const uploadResponse = await fetch(data.url, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image');
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
