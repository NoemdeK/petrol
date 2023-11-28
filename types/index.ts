export interface Dataset {
  label: string;
  value: string;
  data?: number[];
  borderColor: string;
  backgroundColor: string;
}
export interface DataProps {
  labels: string[];
  datasets: Dataset[];
}

export interface regionalOption {
  label: string;
  value: string;
}
