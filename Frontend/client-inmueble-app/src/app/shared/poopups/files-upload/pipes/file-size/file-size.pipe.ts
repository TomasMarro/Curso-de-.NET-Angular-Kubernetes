import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_lONG = ['Bytes', 'KiloBytes', 'MegaBytes', 'GigaBytes', 'TeraBytes','PetaBytes', 'ExaBytes', 'ZettaBytes', 'YottaBytes'];

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(sizeInBytes: number, longForm?: boolean): string {

    const units = longForm ? FILE_SIZE_UNITS_lONG : FILE_SIZE_UNITS;
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals

    return size ? `${formattedSize} ${units[power]}` : '0';

  }

}
