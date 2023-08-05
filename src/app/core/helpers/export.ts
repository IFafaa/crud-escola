export class Export {
  public static exportToCsv(data: any[], nomeArquivo: string): void {
    const csvData = this.convertToCsv(data);
    const blob = new Blob([csvData], { type: 'text/csv' });

    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', nomeArquivo);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  public static convertToCsv(data: any[]): string {
    const csvArray: string[] = [];
    const headers: string[] = Object.keys(data[0]);
    csvArray.push(headers.join(','));

    for (const item of data) {
      const values = headers.map((header) => this.escapeCsvValue(item[header]));
      csvArray.push(values.join(','));
    }

    return csvArray.join('\n');
  }

  public static escapeCsvValue(value: any): string {
    if (typeof value === 'string' && value.includes(',')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
