import { FilesUploadDirective } from './files-upload.directive';

describe('FilesUploadDirective', () => {
  it('should create an instance', () => {
    const dialog = jasmine.createSpyObj('MatDialog', ['open']);
    const directive = new FilesUploadDirective(dialog);
    expect(directive).toBeTruthy();
  });
});
