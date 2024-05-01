export const uploadPhoto = async ({
  file,
  url,
  fields,
}: {
  file: File;
  url: string;
  fields: Record<string, string>;
}) => {
  if (!file) return { success: false, message: 'No file provided' };

  const formData = new FormData();
  Object.entries({ ...fields, file: file }).forEach(([key, value]) => {
    if (typeof value === 'string' || value instanceof File) {
      formData.append(key, value);
    } else {
      console.error(`Invalid type for formData.append: ${typeof value} for key ${key}`);
      throw new Error('Invalid type for formData value');
    }
  });

  formData.append('Content-Type', file.type);
  try {
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorBody = await uploadResponse.text();
      throw new Error(`Failed to upload image: ${uploadResponse.status} ${errorBody}`);
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Failed to upload image: ${error}`);
  }
};
