import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'storageSize' })
export class StorageSizePipe implements PipeTransform {
    transform(value: number | undefined): string | undefined {
        if (!value) {
            return '0 Bytes';
        }

        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(value) / Math.log(1024));

        return parseFloat((value / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
