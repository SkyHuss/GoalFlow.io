export const generateColorFromName = (name: string): string => {
    let hash = 0;
  
    // Convertir chaque caractère du nom en un hash
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Convertir le hash en couleur hexadécimale
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff; // Extraire chaque octet
      color += value.toString(16).padStart(2, '0'); // Convertir en hexadécimal
    }
  
    return color;
  };