import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'responseTime' })
export class ResponseTimePipe implements PipeTransform {
    transform(value: number | undefined): string | undefined {
        if (!value) return undefined;
        
        const minutes = Math.floor(value / 60000);
        const seconds = Math.floor((value % 60000) / 1000);
        const milliseconds = value % 1000;

        let result = '';
        if (minutes > 0) {
            result += `${minutes}m `;
        }
        if (seconds > 0) {
            result += `${seconds}s `;
        }
        result += `${milliseconds}ms`;

        return result.trim();
    }
}
