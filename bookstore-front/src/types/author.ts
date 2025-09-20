export interface Author {
    id?: number;            // opcional al crear
    name: string;
    description: string;
    birthDate: string;      // o Date, según el backend
    image: string;
  }
  