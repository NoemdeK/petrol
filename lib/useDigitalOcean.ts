async function useUploadFileToDigitalOcean(
  file: File,
  token: any
): Promise<string | any> {
  // Create FormData object to append the file
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Make a POST request to upload the file
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/upload/files`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    // Parse the response to get the uploaded image URL
    const data = await response.json();
    const imageURL = data?.data?.url; // Adjust this according to your response structure
    return imageURL;
  } catch (error) {
    console.error("Error uploading file to DigitalOcean:", error);
    throw new Error("Failed to upload file to DigitalOcean");
  }
}

export default useUploadFileToDigitalOcean;
