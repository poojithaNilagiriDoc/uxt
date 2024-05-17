import createSanitizer from 'dompurify';

const sanitizer =
  typeof window !== 'undefined'
    ? createSanitizer(window)
    : { sanitize: (str: string) => str };

export default function sanitize(str: string): string {
  return sanitizer.sanitize(str);
}
