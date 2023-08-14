
/** image onto base64 */
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export const resizeAndConvertToBase64 = (imageFile, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.onload = () => {
            let width = img.width;
            let height = img.height;
    
            if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
            }
            
            if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
            }
    
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert resized image to base64
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.3); // Adjust quality as needed
            resolve(resizedBase64);
        };
        
        img.src = URL.createObjectURL(imageFile);
    });
};