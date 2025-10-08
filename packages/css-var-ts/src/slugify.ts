import s from "slugify";

/**
 * Slugifies a string by converting it to a URL-friendly format.
 */
const slugify: (input: string) => string = (input) =>
  s(input, { remove: /[^a-z0-9]/gi, trim: true });

export { slugify };
