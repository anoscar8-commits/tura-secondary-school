/**
 * Validates uploaded image file safely.
 * Disallows executable files and non-image extensions.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const dangerousExtensions = [
    '.exe', '.sh', '.bat', '.cmd', '.msi', '.vbs', '.js', '.ts', '.html', 
    '.php', '.asp', '.py', '.rb', '.jar', '.com', '.scr', '.pif'
  ];

  const lowerName = file.name.toLowerCase();

  // Check dangerous extensions
  for (const ext of dangerousExtensions) {
    if (lowerName.endsWith(ext)) {
      return {
        valid: false,
        error: `Aina hii ya faili (${ext}) hairuhusiwi kwa sababu za kiusalama. Tafadhali chagua picha pekee (.jpg, .jpeg, .png, .webp).`
      };
    }
  }

  // Check MIME type
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Aina ya faili haikubaliki. Tafadhali pakia picha ya muundo wa JPG, JPEG, PNG au WEBP pekee.'
    };
  }

  // Size limit check (Max 15MB before compression)
  const maxBytes = 15 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: 'Picha ni kubwa mno (zaidi ya 15MB). Tafadhali chagua picha yenye ukubwa mdogo kidogo.'
    };
  }

  return { valid: true };
}

/**
 * Resizes and compresses an image client-side to ensure fast loading on phones and computers.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio scale
        if (width > maxWidth || height > maxHeight) {
          const widthRatio = maxWidth / width;
          const heightRatio = maxHeight / height;
          const bestRatio = Math.min(widthRatio, heightRatio);
          width = Math.round(width * bestRatio);
          height = Math.round(height * bestRatio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // Draw image with smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp or jpeg
        const mime = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mime, quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('Kushindwa kusoma data ya picha.'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Kushindwa kufungua faili.'));
    reader.readAsDataURL(file);
  });
}
