import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginationIntl {
    getCustomPaginationIntl(): MatPaginatorIntl {
        const customPaginatorIntl = new MatPaginatorIntl();
        customPaginatorIntl.itemsPerPageLabel = 'Resultados por página';
        customPaginatorIntl.firstPageLabel = 'Primeira página';
        customPaginatorIntl.lastPageLabel = 'Última página';
        customPaginatorIntl.nextPageLabel = 'Próxima página';
        customPaginatorIntl.previousPageLabel = 'Página anterior';
        customPaginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return customPaginatorIntl;
    }

    private getRangeLabel = (
        page: number,
        pageSize: number,
        length: number
    ): string => {
        if (length == 0 || pageSize == 0) {
            return `0 de ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;

        return `${
            startIndex + 1
        } - ${endIndex} de ${length}`;
    };
}
