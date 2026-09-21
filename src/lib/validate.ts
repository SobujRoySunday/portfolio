export interface ProjectInput {
  name: string;
  description: string;
  image: string;
  url: string;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const MAX_NAME = 120;
const MAX_DESCRIPTION = 2000;
const MAX_URL = 2048;

/**
 * Only http(s) links are allowed. Project URLs are rendered straight into
 * `<Link href>` on public pages, so a `javascript:` or `data:` URL stored here
 * would be stored XSS.
 */
export const isSafeHttpUrl = (value: unknown): value is string => {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_URL) {
    return false;
  }
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const validateProjectInput = (
  input: unknown
): ValidationResult<ProjectInput> => {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "projectData is required" };
  }

  const raw = input as Record<string, unknown>;
  const name = asTrimmedString(raw.name);
  const description = asTrimmedString(raw.description);
  const image = asTrimmedString(raw.image);
  const url = asTrimmedString(raw.url);

  if (!name) return { ok: false, error: "name is required" };
  if (name.length > MAX_NAME)
    return { ok: false, error: `name must be at most ${MAX_NAME} characters` };
  if (!description) return { ok: false, error: "description is required" };
  if (description.length > MAX_DESCRIPTION)
    return {
      ok: false,
      error: `description must be at most ${MAX_DESCRIPTION} characters`,
    };
  if (!isSafeHttpUrl(image))
    return { ok: false, error: "image must be an http(s) URL" };
  if (!isSafeHttpUrl(url))
    return { ok: false, error: "url must be an http(s) URL" };

  return { ok: true, value: { name, description, image, url } };
};

/** Mongo ObjectId, validated before it reaches a query. */
export const isValidObjectId = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
