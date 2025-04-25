export function useFileUpload() {
    return async (filename: string, file: File) => {
        const result = await fetch(`/api/fileUpload?file=${filename}`, {method: "POST"});
        const { url, fields } = await result.json();
        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
        });
        const upload = await fetch(url, {
            method: "POST",
            body: formData,
        });
        
        if (upload.ok) {
            const fileUrl = `https://storage.cloud.google.com/askii-vid/${filename}`;
            return { success: true, url: fileUrl };
        }
        
        return { success: false, url: null };
    };
}